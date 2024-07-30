import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Poppins_100Thin, Poppins_400Regular, Poppins_700Bold, OpenSans_400Regular } from '@expo-google-fonts/dev';


export default function Home({ navigation }) {
  const handleLoginPress = () => {
    navigation.navigate('Login');
    
  };

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_400Regular,
    OpenSans_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  const handleSignUpPress = () => {
    navigation.navigate('CadastroUsuario');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FA7EBD', '#FAEC7D']} style={styles.gradientBackground}
      start={[0, 0]}
      end={[1, 1]}>
        <View style={styles.content}>
          <Image
            style={styles.imagemLogo}
            source={require('./assets/image.png')}
          />
          <Text style={styles.title}>Bem-vindo ao ConectaMães!</Text>

          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <LinearGradient
              colors={['#7DEBFA', '#40aebd', '#037180']}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <LinearGradient
              colors={['#7DEBFA', '#40aebd', '#037180']}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Cadastro</Text>
            </LinearGradient>
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
