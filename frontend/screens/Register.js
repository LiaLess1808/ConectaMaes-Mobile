import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { RadioButton } from 'react-native-paper';
import GradientInput from '../components/GradientInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pickImage, uploadImage } from '../functions/uploadImage';

const Register = ({ navigation }) => {
  // Estados
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState('YellowTheme');
  const [currentScreen, setCurrentScreen] = useState('first');
  const [profilePicture, setProfilePicture] = useState(null); // State para a foto de perfil
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cores dos temas
  const themeColors = {
    YellowTheme: '#BDB150',
    BlueTheme: '#40AEBD',
    PinkTheme: '#CF4A8E',
  };

  const darkThemeColors = {
    YellowTheme: '#807523',
    BlueTheme: '#037180',
    PinkTheme: '#A3155F',
  };

  const placeholderColors = {
    YellowTheme: '#BDB150',
    BlueTheme: '#40AEBD',
    PinkTheme: '#CF4A8E',
  };

  // Funções de manipulação
  const handleNext = () => {
    switch (currentScreen) {
      case 'first':
        if (!user || !email || !password || !confirmPassword) {
          Alert.alert('Erro', 'Por favor, preencha todos os campos antes de avançar.');
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert('Erro', 'As senhas não coincidem.');
          return;
        }
        setCurrentScreen('second');
        break;
      case 'second':
        if (!fullName || !phone || !birthDate || !location) {
          Alert.alert('Erro', 'Por favor, preencha todos os campos antes de avançar.');
          return;
        }
        setCurrentScreen('third');
        break;
      case 'third':
        console.log('Registrar com:', { fullName, phone, birthDate, location });
        navigation.navigate('Landing');
        break;
      default:
        setCurrentScreen('first');
    }
  };
  

  const handleBack = () => {
    switch (currentScreen) {
      case 'second':
        setCurrentScreen('first');
        break;
      case 'third':
        setCurrentScreen('second');
        break;
      default:
        setCurrentScreen('first');
    }
  };

  const handleChooseImage = () => {
    // Função para escolher imagem
    pickImage(setImage, setFile);
  };

  // Funções de Localização
  const handleLocationInputClick = async () => {
    // Solicitar permissão de acesso à localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Permita o acesso à localização para continuar.');
      return;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const { latitude, longitude } = currentLocation.coords;
      console.log('Coordenadas atuais:', latitude, longitude);

      // Chamar a função para requerir o CEP a partir da API do Google Maps
      getPostalCodeFromGoogleMaps(latitude, longitude);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Houve um problema ao obter a localização.');
    }
  };

  const getPostalCodeFromGoogleMaps = async (latitude, longitude) => {
    //Chave da conta (Do Renan) da API do Google Maps (Google Cloud Console)
    const API_KEY = 'AIzaSyCUlWSOahtUwaKvquI1vpj6AajoBVMBr8c';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status !== 'OK') {
        Alert.alert('Erro', 'Não foi possível obter o CEP, tente novamente mais tarde.');
        return;
      }
  
      const CEP = data.results[0]?.address_components.find(component =>
        component.types.includes('postal_code'))?.long_name;

        console.log('CEP Atual:', CEP);

      if (CEP) {
        setLocation(CEP);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o CEP usando Google Maps.');
      }
    } catch (error) {
      console.error('Erro ao obter o CEP:', error);
      Alert.alert('Erro', 'Houve um problema ao obter o CEP usando Google Maps.');
    }
  };
  
  // Renderização da tela
  const renderScreen = () => {
    switch (currentScreen) {
      case 'first':
        return (
          <>
            <GradientInput
              placeholder="Nome de Usuário"
              value={user}
              onChangeText={(event) => setUser(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="E-mail"
              value={email}
              onChangeText={(event) => setEmail(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Senha"
              value={password}
              onChangeText={(event) => setPassword(event)}
              secureTextEntry={true}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={(event) => setConfirmPassword(event)}
              secureTextEntry={true}
              placeholderColor={placeholderColors[theme]}
            />
            <View style={styles.themeContainer}>
              <Text style={styles.label}>Tema:</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  value="YellowTheme"
                  status={theme === 'YellowTheme' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('YellowTheme')}
                  color={themeColors.YellowTheme}
                />
                <Text
                  style={[
                    styles.radioLabel,
                    {
                      color:
                        theme === 'YellowTheme'
                          ? themeColors.YellowTheme
                          : '#000',
                    },
                  ]}>
                  Amarelo
                </Text>

                <RadioButton
                  value="BlueTheme"
                  status={theme === 'BlueTheme' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('BlueTheme')}
                  color={themeColors.BlueTheme}
                />
                <Text
                  style={[
                    styles.radioLabel,
                    {
                      color:
                        theme === 'BlueTheme' ? themeColors.BlueTheme : '#000',
                    },
                  ]}>
                  Azul
                </Text>

                <RadioButton
                  value="PinkTheme"
                  status={theme === 'PinkTheme ' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('PinkTheme')}
                  color={themeColors.PinkTheme}
                />
                <Text
                  style={[
                    styles.radioLabel,
                    {
                      color:
                        theme === 'PinkTheme' ? themeColors.PinkTheme : '#000',
                    },
                  ]}>
                  Rosa
                </Text>
              </View>
            </View>
          </>
        );
      case 'second':
        return (
          <>
            <GradientInput
              placeholder="Nome Completo"
              value={fullName}
              onChangeText={(event) => setFullName(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Telefone"
              value={phone}
              onChangeText={(event) => setPhone(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Data de Nascimento"
              value={birthDate}
              onChangeText={(event) => setBirthDate(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <TouchableOpacity onPress={handleLocationInputClick}>
              <GradientInput
                placeholder="Localização"
                value={location}
                onChangeText={(event) => setLocation(event)}
                secureTextEntry={false}
                placeholderColor={placeholderColors[theme]}
              />
            </TouchableOpacity>
          </>
        );
      case 'third':
        return (
          <>
            <TouchableOpacity
              style={[
                styles.userImageContainer,
                { backgroundColor: image ? 'transparent' : '#CFCFCF', borderColor: '#808080' },
              ]}
              onPress={handleChooseImage}>
              <Image
                source={image ? { uri: image } : require('../assets/default_user.png')}
                style={styles.userImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cameraContainer,
                { borderColor: themeColors[theme] },
              ]}
              onPress={handleChooseImage}>
              {loading ? (
                <ActivityIndicator size="small" color={themeColors[theme]} />
              ) : (
                <Icon
                  name="camera"
                  size={30}
                  style={[styles.camera, { color: themeColors[theme] }]}
                />
              )}
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
  
    if (!file) {
      alert('Por favor, selecione uma imagem antes de confirmar.');
      return;
    }
  
    setLoading(true);
    console.log('Iniciando registro...');
  
    try {
      // Get the image URL from the uploadImage function
      const imageUrl = await uploadImage(file, setLoading);
  
      if (imageUrl) {
        console.log('Link da imagem carregada:', imageUrl);
  
        const userObj = {
          nomeCompleto: fullName,
          nomeDeUsuario: user,
          email: email,
          senha: password,
          telefone: phone,
          estado: location,
          dataNascimentoUsuario: birthDate,
          tema: theme,
          isAdmin: false,
          linkFotoPerfil: imageUrl, // Use the returned image URL
        };
  
        console.log('Dados enviados à API:', userObj);
  
        const response = await fetch('https://conectamaes-api.glitch.me/insertUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userObj),
        });
  
        const json = await response.json();
        console.log('Resposta da API:', json);
  
        if (json.error) {
          alert('Erro ao registrar usuário: ' + json.error);
        } else {
          alert('Registro realizado com sucesso!');
          navigation.navigate('Login');
        }
      } else {
        alert("Erro ao carregar a imagem.");
      }
    } catch (error) {
      console.error('Erro ao processar o registro:', error);
      alert('Erro ao processar o registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };  

  // Retorno do componente
  return (
    <View style={styles.container}>
      {currentScreen !== 'first' ? (
        <TouchableOpacity style={styles.cancel} onPress={handleBack}>
          <Icon
            name="arrow-left-circle-outline"
            size={30}
            color={themeColors[theme]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <Image source={require('../assets/logo_icon.png')} style={styles.logo} />
      <Text
        style={[
          styles.title,
          currentScreen === 'third'
            ? { marginBottom: 50 }
            : { marginBottom: 20 },
        ]}>
        Venha fazer parte desta comunidade!
      </Text>

      {renderScreen()}

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: themeColors[theme],
            shadowColor: themeColors[theme],
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 15,
            elevation: 10,
          },
        ]}
        onPress={currentScreen === 'third' ? handleRegister : handleNext}>
        <Text style={styles.buttonText}>
          {currentScreen === 'third' ? 'Confirmar' : 'Próximo'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Já possui uma conta?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginLink, { color: themeColors[theme] }]}>
            Entre
          </Text>
        </TouchableOpacity>
      </Text>
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
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  themeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#BDB150',
    padding: 15,
    borderRadius: 100,
    marginBottom: 80,
    width: 225,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  loginText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#BDB150',
    textDecorationLine: 'underline',
  },
  userImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover', 
  },
  defaultUserImage: {
    width: 175,
    height: 175,
  },
  cameraContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    right: -75,
    top: -80,
  },
});

export default Register;
