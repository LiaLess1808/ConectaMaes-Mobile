import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeId = async (value) => {
  try {
    await AsyncStorage.setItem('idUsuario', value);
  } catch (e) {
    console.log('Erro ao guardar o id do Usuário!')  }
};

export const getId = async () => {
  try {
    const value = await AsyncStorage.getItem('idUsuario');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Erro ao pegar o id do Usuário!')
  }
};