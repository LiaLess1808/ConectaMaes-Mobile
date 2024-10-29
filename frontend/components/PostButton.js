import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostButton = ({ themeColor }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: themeColor }]}>
      <Icon name="pencil" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25, // Metade da largura e altura
    padding: 10,
    width: 50, // Largura e altura iguais para manter a circularidade
    height: 50,
    justifyContent: 'center', // Centraliza o ícone verticalmente
    alignItems: 'center', // Centraliza o ícone horizontalmente
  },
});

export default PostButton;