// GradientInput.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  placeholderColor,
}) => {
  const gradientOpacity = value ? 1 : 0.6; // ajusta a opacidade com base no valor da entrada

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          `rgba(189, 209, 80, ${gradientOpacity})`, // #BDB150 com opacidade
          `rgba(64, 174, 189, ${gradientOpacity})`, // #40AEBD com opacidade
          `rgba(207, 74, 142, ${gradientOpacity})`, // #CF4A8E com opacidade
        ]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 45,
    borderRadius: 150,
    marginBottom: 15,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 150,
  },
  input: {
    height: 41,
    width: 296,
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingHorizontal: 10,
    paddingLeft: 30,
    borderRadius: 150,
    zIndex: 1,
    outline: 'none',
  },
});

export default GradientInput;
