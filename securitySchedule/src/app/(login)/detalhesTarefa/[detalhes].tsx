import React, { useEffect, useState } from 'react'
import { Alert, Pressable, Text, TextInput, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Detalhes() {
    const { id, titulo, desc, data  } = useLocalSearchParams();
    const [title, setTitle] = useState(titulo || '');
    const [description, setDescription] = useState(desc || '');
    const [date, setDate] = useState(data || '');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>
                Edite a sua tarefa com segurança
            </Text>
            <View style={styles.entradaUsuario}>
                <TextInput
                    placeholderTextColor={theme.colors.secondText}
                    placeholder='Título'
                    style={styles.input}
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                />
                <TextInput
                    placeholderTextColor={theme.colors.secondText}
                    placeholder='Descrição'
                    style={styles.input}
                    value={description}
                    multiline
                    onChangeText={(value) => setDescription(value)}
                />
                <TextInput
                    placeholderTextColor={theme.colors.secondText}
                    placeholder='Data'
                    style={styles.input}
                    value={date}
                    onChangeText={(value) => setDate(value)}
                />
            </View>

            <View style={{ marginTop: 40, flexDirection: "row", width: "100%", gap: 16, alignItems:"center", justifyContent: "center" }}>

                <Pressable style={styles.cadastrarTaskButton} onPress={() => { }}>
                    <Text style={styles.buttonText}>EDITAR</Text>
                </Pressable>

                <Pressable style={styles.cadastrarTaskButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>CANCELAR</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    titulo: {
        fontSize: theme.fontSize.titulo,
        color: theme.colors.primaryText,
        fontWeight: "bold",
        lineHeight: 24,
        alignSelf: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.firstPlan,
        color: theme.colors.primaryText,
        minHeight: 30,
        width: "90%",
        borderRadius: 16,
        padding: 16,
    },
    entradaUsuario: {
        marginTop: 40,
        gap: 16,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: theme.colors.primaryText,
        fontWeight: "bold"
    },
    cadastrarTaskButton: {
        backgroundColor: theme.colors.firstPlan,
        width: "40%",
        minHeight: 40,
        borderRadius: 16,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
});