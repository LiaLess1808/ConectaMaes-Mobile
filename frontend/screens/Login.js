import {storeId} from '../components/Storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import GradientInput from '../components/GradientInput';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setMensagem('');
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    console.log("Verificando Login...");

    var userObj = { email: email, senha: password };
    var jsonBody = JSON.stringify(userObj);
  
    const response = await fetch('https://conectamaes-api.glitch.me/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: jsonBody,
    });

    const json = await response.json();
    console.log(json);
    setMensagem(json.mensagem);
    storeId(json.id);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancel} onPress={() => navigation.navigate('Landing')}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>

      <Image source={require('../assets/logo_icon.png')} style={styles.logo} />
      <Text style={styles.title}>Seja bem-vindo novamente!</Text>

      <View style={styles.inputContainer}>
        <GradientInput
          placeholder="E-mail"
          value={email}
          onChangeText={(event) => setEmail(event)}
          secureTextEntry={false}
          placeholderColor = {'#BDB150'}
        />

        <GradientInput
          placeholder="Senha"
          value={password}
          onChangeText={(event) => setPassword(event)}
          secureTextEntry={true}
          placeholderColor = {'#BDB150'}
        />

        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {mensagem ? <Text style = {styles.message}>{mensagem}</Text> : null}

      <Text style={styles.registerText}>Não possui uma conta?{' '} 
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Registre-se</Text>
      </TouchableOpacity></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  inputContainer: {
    width: 300,
    alignItems: 'flex-start', // Alinha os itens à esquerda
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#BDB150',
    padding: 15,
    borderRadius: 100,
    marginBottom: 80,
    width: 225,
    shadowColor: '#BDB150',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end', // Alinha à direita
    marginTop: -10, // Espaçamento entre o input de senha e o texto
    marginRight: 15,
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 16,
    textDecoration: "underline",
  },
  registerText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  registerLink: {
    color: '#BDB150',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 16,
    fontWeight: 'regular',
    marginBottom: 40,
  },
  cancel: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginTop: 30,
  },
  cancelText: {
    color: '#C84A60',
    fontSize: 16,
  },
  message: {
    alignSelf: 'center',
    marginBottom:20,
    color: '#C84A60',
  }
});

export default Login;