import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
// import Modal from 'react-native-modal';
import { styles } from './styles';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';

type Tarefa = {
    id: string,
    titulo: string,
    descricao: string,
    data: string
}


export default function TarefasView() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([{ id: "1", titulo: "Teste 1", descricao: "desc", data: "26 de abril" }, { id: "2", titulo: "Teste 1", descricao: "desc", data: "26 de abril" }]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');


    useEffect(() => {

    }, [tarefas]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const adicionarTask = () => {
        const tarefa: Tarefa = {
            id: "3",
            titulo: title,
            descricao: description,
            data: date
        }

        let tarefasAdicionadas: Tarefa[] = tarefas

        tarefasAdicionadas.push(tarefa)
        setTarefas(tarefasAdicionadas);
        toggleModal()
    }

    const logoutUser = () => {
        router.dismissAll()
    }
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
                                <Pressable onPress={() => router.navigate({pathname: `detalhesTarefa/${tarefa.id}`, params:{id: tarefa.id}})}>
                                    <View style={styles.cabecalhoCard}>
                                        <Text style={styles.tituloCard}>{tarefa.titulo}</Text>
                                        <Text style={styles.dataCard}>{tarefa.data}</Text>
                                    </View>
                                    <Text numberOfLines={3} style={styles.descricaoCard}>{tarefa.descricao}</Text>
                                </Pressable>
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
