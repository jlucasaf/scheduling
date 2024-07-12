import React, { useState } from 'react'
import { Alert, Pressable, Text, TextInput, View, VirtualizedList } from 'react-native'
import { styles } from './styles'
import { theme } from '@/constants/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { loginHandle } from '@/utils/loginHandle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginView() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(user);
      if (userData) {
        const userObj = JSON.parse(userData);
        if (userObj.password === password) {
          await AsyncStorage.setItem('loggedInUser', JSON.stringify({ user }));
          router.push('/Tarefas');
        } else {
          Alert.alert('Invalid username or password');
        }
      } else {
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in', error);
      Alert.alert('An error occurred while logging in');
    }
  };

  const loginHandler = async () => {
    const result = await loginHandle(user, password).then(
      (resultado) =>{
        if(resultado)
          router.navigate('Tarefas');
        else
          Alert.alert('Usuário não cadastrado.')          
      }
    )
  }

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
          <Pressable style={styles.loginButtom} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", gap: 16, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.registroText}>Ainda nao registrado?</Text>
          <Text style={styles.registroText} onPress={() => { router.navigate('Cadastro') }}>Registre-se aqui.</Text>
        </View>

      </View>
    </View>
  )
}
