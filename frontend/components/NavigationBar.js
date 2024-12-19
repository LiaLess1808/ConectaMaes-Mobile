import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUserProfilePicture } from '../functions/UserFunctions'; // Importe a função que pega a foto de perfil

const NavigationBar = ({ themeColor }) => {
  const [profilePicture, setProfilePicture] = useState('');

  // Função para buscar a foto de perfil
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const picture = await getUserProfilePicture();
        setProfilePicture(picture);
      } catch (error) {
        console.error('Erro ao carregar a foto de perfil', error);
      }
    };

    fetchProfilePicture();
  }, []); // O array vazio faz o efeito rodar apenas uma vez, ao montar o componente

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity style={[styles.button, { backgroundColor: themeColor }]}>
        <Icon name="pencil" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home" size={25} color={themeColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="hand-heart" size={25} color="#A8A8A8" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, { top: 5 }]}>
        <Icon name="hand-back-right" size={25} color="#A8A8A8" />
        <Icon name="heart" size={10} color="#FFFFFF" style={styles.heartedHand} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="bell" size={25} color="#A8A8A8" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={[styles.profileImage, { borderColor: themeColor }]} // Aplica a cor do tema à borda
          />
        ) : (
          <Icon name="account" size={25} color={themeColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    padding: 8,
  },
  heartedHand: {
    top: -11,
    left: 9,
  },
  button: {
    position: 'absolute',
    right: 10,
    top: '-80%',
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilo para a foto de perfil
  profileImage: {
    width: 40, // Tamanho da foto de perfil (ajuste conforme necessário)
    height: 40,
    borderRadius: 20, // Torna a imagem redonda (metade da largura e altura)
    borderWidth: 2, // Largura da borda
    borderColor: '#000', // Cor padrão da borda (isso será substituído dinamicamente)
  },
});


export default NavigationBar;
