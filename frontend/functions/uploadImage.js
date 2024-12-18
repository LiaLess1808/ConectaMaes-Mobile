import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async (setImage, setFile) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFile(result.assets[0].base64);
    } else {
      Alert.alert("Seleção Cancelada", "Nenhuma imagem foi selecionada.");
    }
  } catch (error) {
    console.error('Erro ao selecionar imagem:', error);
    Alert.alert("Erro", "Ocorreu um problema ao acessar a galeria.");
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadImage = async (file, setLoading) => {
  if (!file) {
    alert("Nenhuma imagem selecionada!");
    return;
  }

  setLoading(true);

  const clientId = "2d484b717c2ad88";
  const auth = `Client-ID ${clientId}`;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("type", "base64");

  const tryUpload = async (retries = 3) => {
    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        alert("Upload bem-sucedido!");
        return data.data.link;
      } else if (response.status === 429) {
        if (retries > 0) {
          console.log(`Limite de requisições atingido. Tentando novamente... (${retries} tentativas restantes)`);
          await sleep(5000); 
          return tryUpload(retries - 1); 
        }
        alert("Limite de requisições atingido. Tente novamente mais tarde.");
      } else {
        alert(`Erro no upload: ${data.data.error}`);
        return null;
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Erro ao fazer upload. Tente novamente.");
      return null;
    }
  };

  return await tryUpload();
};

