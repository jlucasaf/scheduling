import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
// import Modal from 'react-native-modal';
import { styles } from './styles';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tarefa = {
    id: string,
    titulo: string,
    descricao: string,
    data: string
}


export default function TarefasView() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');


    useEffect(() => {

    }, [tarefas]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const loggedInUser = await AsyncStorage.getItem('loggedInUser');
                if (loggedInUser) {
                    const { user } = JSON.parse(loggedInUser);
                    const userData = await AsyncStorage.getItem(user);
                    if (userData) {
                        const userObj = JSON.parse(userData);
                        setTarefas(userObj.tasks || []);
                    }
                }
            } catch (error) {
                console.error('Error loading tasks', error);
                Alert.alert('Ocorreu um erro ao carregar as tarefas.');
            }
        };
        loadTasks();
    }, []);
    

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const adicionarTask = async () => {
        try {
            const loggedInUser = await AsyncStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const { user } = JSON.parse(loggedInUser);
                const userData = await AsyncStorage.getItem(user);
                if (userData) {
                    const userObj = JSON.parse(userData);
                    const tarefa: Tarefa = {
                        id: uuid.v4() as string,
                        titulo: title,
                        descricao: description,
                        data: date
                    };
                    const updatedTasks = [...userObj.tasks, tarefa];
                    userObj.tasks = updatedTasks;
                    await AsyncStorage.setItem(user, JSON.stringify(userObj)); // Salva as tarefas atualizadas
                    setTarefas(updatedTasks);
                    setTitle('');
                    setDate('');
                    setDescription('');
                    toggleModal();
                }
            }
        } catch (error) {
            console.error('Error adding task', error);
            Alert.alert('An error occurred while adding the task');
        }
    };
    
    const logoutUser = () => {
        router.dismissAll()
    }

    const deleteTaskHandle = async (id: string) => {
        try {
            const loggedInUser = await AsyncStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const { user } = JSON.parse(loggedInUser);
                const userData = await AsyncStorage.getItem(user);
                if (userData) {
                    const userObj = JSON.parse(userData);
                    const novasTarefas = userObj.tasks.filter((tarefa: Tarefa) => tarefa.id !== id);
                    userObj.tasks = novasTarefas;
                    await AsyncStorage.setItem(user, JSON.stringify(userObj));
                    setTarefas(novasTarefas);
                }
            }
        } catch (error) {
            console.error('Error deleting task', error);
            Alert.alert('An error occurred while deleting the task');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>
                    As suas tarefas perfeitamente seguras estão aqui!
                </Text>
            </View>
            <ScrollView>
                <View style={styles.cardsContainers}>
                    {tarefas.map((tarefa: Tarefa, index) => {
                        return (
                            <View style={styles.containerCard} key={index}>
                                <Pressable onPress={() =>
                                    router.navigate({
                                        pathname: `detalhesTarefa/${tarefa.id}`,
                                        params: {
                                            id: tarefa.id,
                                            titulo: tarefa.titulo,
                                            desc: tarefa.descricao,
                                            data: tarefa.data
                                        }
                                    })}>
                                    <View style={styles.cabecalhoCard}>
                                        <Text style={styles.tituloCard}>{tarefa.titulo}</Text>
                                        <Text style={styles.dataCard}>{tarefa.data}</Text>
                                    </View>
                                    <Text numberOfLines={3} style={styles.descricaoCard}>{tarefa.descricao}</Text>
                                </Pressable>

                                <MaterialCommunityIcons onPress={() => deleteTaskHandle(tarefa.id)} style={{ position: "absolute", bottom: 5, left: 5 }} name="trash-can-outline" size={24} color={"#db3737"} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>

            <Pressable style={styles.botaoLogout} onPress={logoutUser}>
                <MaterialIcons name="logout" size={40} color={theme.colors.secondText} />
            </Pressable>
            <Pressable style={styles.botaoAdicionar} onPress={toggleModal}>
                <Entypo name="plus" size={55} color={theme.colors.secondText} />
            </Pressable>

            <Modal visible={isModalVisible} style={styles.modal} transparent>
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.titulo}>Adicionar nova tarefa</Text>
                        <MaterialIcons onPress={toggleModal} style={styles.closeButton} name="close" size={30} color={theme.colors.firstPlan} />
                    </View>
                    <TextInput
                        placeholderTextColor={theme.colors.secondText}
                        placeholder='Título'
                        style={styles.input}
                        onChangeText={(value) => setTitle(value)}
                    />
                    <TextInput
                        placeholderTextColor={theme.colors.secondText}
                        placeholder='Descrição'
                        style={styles.input}
                        onChangeText={(value) => setDescription(value)}
                    />
                    <TextInput
                        placeholderTextColor={theme.colors.secondText}
                        placeholder='Data'
                        style={styles.input}
                        onChangeText={(value) => setDate(value)}
                    />

                    <Pressable style={styles.cadastrarTaskButton} onPress={adicionarTask}>
                        <Text style={styles.buttonText}>ADICIONAR</Text>
                    </Pressable>
                </View>
            </Modal>

        </View>
    )
}
