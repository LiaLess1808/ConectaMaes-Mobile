import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Poppins_100Thin, Poppins_400Regular, Poppins_700Bold, OpenSans_400Regular } from '@expo-google-fonts/dev';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_400Regular,
    OpenSans_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  const verificarLogin = () => {
    console.log('teste');
    var userObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);

    fetch('https://tet--liviabraga.glitch.me/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.mensagem === 'Usuario valido!') {
          navigation.navigate('AtualizaUsuario',{
            idUsuario:json.id
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToSignUp = () => {
    navigation.navigate('CadastroUsuario');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FA7EBD', '#FAEC7D']} style={styles.gradientBackground}>
        <View style={styles.content}>
          <Image style={styles.logo} source={require('./assets/image.png')} />
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            onChangeText={(event) => setEmail(event)}
            placeholder="Email"
            placeholderTextColor="#5991E1"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={(event) => setSenha(event)}
            placeholder="Senha"
            placeholderTextColor="#5991E1"
            secureTextEntry={true}
            value={senha}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.loginBtn} onPress={verificarLogin}>
            <LinearGradient
              colors={['#7DEBFA', '#40aebd', '#037180']}
              style={styles.gradientButton}
            >
              <Text style={styles.loginText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signupText}>Ainda não tem conta? Cadastre-se aqui</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00000',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    fontFamily: 'Poppins_400Regular',
  },
  loginBtn: {
    width: '50%',
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 5,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  signupText: {
    color: '#5991E1',
    marginTop: 20,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 5,
  },
});