import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Poppins_100Thin, Poppins_400Regular, Poppins_700Bold, OpenSans_400Regular } from '@expo-google-fonts/dev';

export default function AtualizaUsuario({ navigation, route }) {
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { idUsuario } = route.params;

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_400Regular,
    OpenSans_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  useEffect(() => {
    async function fetchItem() {
      fetch('https://nathless-tet.glitch.me/showUser/' + idUsuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setNome(resJson[0].nomeCompleto);
        setEmail(resJson[0].email);
      })
      .catch((e) => console.log(e));
    }
    fetchItem();
  }, []);

  const Atualizar = () => {
    var userObj = { nome: name, email: email, senha: password };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);

    fetch('https://nathless-tet.glitch.me/editUser/' + idUsuario, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      navigation.goBack();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const Deletar = () => {
    fetch('https://nathless-tet.glitch.me/deleteUser/' + idUsuario, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      navigation.goBack();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const Listar = () => {
    navigation.navigate(List);
  };

  // Lista de ações
  const actions = [
    { key: 'update', text: 'Atualizar', action: Atualizar },
    { key: 'delete', text: 'Deletar', action: Deletar },
    { key: 'list', text: 'Listar', action: Listar },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FA7EBD', '#FAEC7D']} style={styles.gradientBackground}>
        <View style={styles.content}>
          <Image style={styles.logo} source={require('./assets/image.png')} />
          <Text style={styles.title}>Atualizar informações de usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#5991E1"
            value={name}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            onChangeText={(event) => setEmail(event)}
            placeholder="Email"
            placeholderTextColor="#5991E1"
            value={email}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={(event) => setPassword(event)}
            placeholder="Senha"
            placeholderTextColor="#5991E1"
            secureTextEntry
            value={password}
          />
          <FlatList
            data={actions}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button} onPress={item.action}>
                <LinearGradient
                  colors={['#7DEBFA', '#40aebd', '#037180']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>{item.text}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
            contentContainerStyle={styles.buttonContainer}
          />
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
    width: '100%', 
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    width: '100%', 
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  logo: {
    height: 138,
    width: 128,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
