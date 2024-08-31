import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Poppins_100Thin, Poppins_400Regular, Poppins_700Bold, OpenSans_400Regular } from '@expo-google-fonts/dev';

export default function CadastroUsuario({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tema, setTema] = useState('amarelo'); // Estado inicial para o tema

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_400Regular,
    OpenSans_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  const Cadastrar = () => {
    if (!name || !email || !senha || !tema) {
      console.log('Erro');
      return;
    }

    var userObj = { nome: name, email: email, senha: senha, tema: tema };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);

    fetch('https://nathless-tet.glitch.me/insertUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate('Login'); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FA7EBD', '#FAEC7D']} style={styles.gradientBackground}>
        <View style={styles.content}>
          <Image style={styles.logo} source={require('./assets/image.png')} />
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            placeholder="Nome"
            placeholderTextColor="#5991E1"
            value={name}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#5991E1"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            placeholder="Senha"
            placeholderTextColor="#5991E1"
            secureTextEntry
            value={senha}
            autoCapitalize="none"
          />

          <Picker
            selectedValue={tema}
            style={styles.input}
            onValueChange={(itemValue) => setTema(itemValue)}
          >
            <Picker.Item label="Tema Amarelo" value="yellow" />
            <Picker.Item label="Tema Azul" value="blue" />
            <Picker.Item label="Tema Rosa" value="pink" />
          </Picker>

          <TouchableOpacity style={styles.signupBtn} onPress={Cadastrar}>
            <LinearGradient
              colors={['#7DEBFA', '#40aebd', '#037180']}
              style={styles.gradientButton}
            >
              <Text style={styles.signupText}>Cadastrar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginText}>Já tem conta? Faça login aqui</Text>
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
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 5,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    fontFamily: 'Poppins_400Regular',
  },
  signupBtn: {
    width: '50%',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins_100Thin',
  },
  loginText: {
    marginTop: 5,
    color: '#785AE0',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  logo: {
    height: 138,
    width: 128,
    marginBottom: 20,
  },
});
