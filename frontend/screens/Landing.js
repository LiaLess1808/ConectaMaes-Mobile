import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import logo from '../assets/logo_icon.png';

function Landing({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={[styles.title, styles.centerText]}>
        Mães ajudando mães a cuidar da vida materna.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>
      <Text style={[styles.terms, styles.centerText]}>
        Ao se cadastrar, você concorda com os{' '}
        <Text
          style={styles.link}
          onPress={() => {
            // Implement your login action here
          }}>
          Termos de Uso
        </Text>{' '}
        e as{' '}
        <Text
          style={styles.link}
          onPress={() => {
            // Implement your login action here
          }}>
          Políticas de Privacidade
        </Text>
        .
      </Text>
      <Text style={[styles.login, styles.centerText, { marginTop: 20 }]}>
        Já possui uma conta?{' '}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Entre
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que o ScrollView tenha um tamanho flexível
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, // Adiciona espaçamento lateral
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#BDB150',
    padding: 15,
    borderRadius: 100,
    marginBottom: 40,
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
  terms: {
    fontSize: 14,
    marginBottom: 40,
  },
  login: {
    fontSize: 14,
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 1,
    marginBottom: 80,
  },
  link: {
    color: '#BDB150',
    textDecorationLine: 'underline',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default Landing;
