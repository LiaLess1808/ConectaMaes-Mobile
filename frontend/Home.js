import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Poppins_100Thin, Poppins_400Regular, Poppins_700Bold, OpenSans_400Regular } from '@expo-google-fonts/dev';

export default function Home({ navigation }) {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_400Regular,
    OpenSans_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  const DATA = [
    { id: '1', title: 'Login', route: 'Login' },
    { id: '2', title: 'Cadastro', route: 'CadastroUsuario' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(item.route)}>
      <LinearGradient colors={['#7DEBFA', '#40aebd', '#037180']} style={styles.gradientButton}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FA7EBD', '#FAEC7D']} style={styles.gradientBackground} start={[0, 0]} end={[1, 1]}>
        <View style={styles.content}>
          <Image style={styles.imagemLogo} source={require('./assets/image.png')} />
          <Text style={styles.title}>Bem-vindo ao ConectaMães!</Text>

          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  button: {
    borderRadius: 50,
    marginBottom: 20,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    fontFamily: 'Poppins_100Thin',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  imagemLogo: {
    height: 170,
    width: 170,
    marginBottom: 20,
  },
});