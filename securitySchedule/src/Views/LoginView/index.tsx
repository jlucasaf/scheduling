import React, { useState } from 'react'
import { Pressable, Text, TextInput, View, VirtualizedList } from 'react-native'
import { styles } from './styles'
import { theme } from '@/constants/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginView() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="server-security" size={100} color={theme.colors.primaryText} />
      <View style={styles.loginContainer}>
        <View style={styles.tituloSubtituloContainer}>
          <Text style={styles.titulo}>
            Bem vindo ao Security Schedule!
          </Text>
          <Text style={styles.subtitulo}>
            Realize seu login para ter acesso a nossa segurança.
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
          <Pressable style={styles.loginButtom} onPress={() => { router.navigate('Tarefas') }}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>
        </View>

        <View style={{flexDirection: "row", gap: 16, alignItems: "center", justifyContent: "center"}}>
          <Text style={styles.registroText}>Ainda nao registrado?</Text>
          <Text style={styles.registroText} onPress={()=>{router.navigate('Cadastro')}}>Registre-se aqui.</Text>
        </View>

      </View>
    </View>
  )
}
