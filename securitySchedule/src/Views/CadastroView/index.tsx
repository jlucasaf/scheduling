import { theme } from '@/constants/theme'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { router } from 'expo-router'

export default function CadastroView() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={{ position: "absolute", left: 15 }}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.primaryText} onPress={() => router.back()} />
                </View>
                <MaterialCommunityIcons name="server-security" size={100} color={theme.colors.primaryText} />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.tituloSubtituloContainer}>
                    <Text style={styles.titulo}>
                        Area de cadastro
                    </Text>
                    <Text style={styles.subtitulo}>
                        Preencha os campos e cadastre-se na agenda mais segura.
                    </Text>
                </View>
                <View style={styles.entradaUsuario}>
                    <TextInput
                        placeholderTextColor={theme.colors.secondText}
                        placeholder='Usuário'
                        style={styles.input}
                        onChangeText={(value) => setUser(value)}
                    />

                    <TextInput
                        placeholderTextColor={theme.colors.secondText}
                        placeholder='Senha'
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Pressable style={styles.loginButtom} onPress={() => { }}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
