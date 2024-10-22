import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../assets/logo_icon.png';

function Opening({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2500, // Duração da animação (2,5s)
      useNativeDriver: true, // Usa driver nativo para melhorar performance
    }).start(() => {
      navigation.navigate('Landing');
    });
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['rgba(249, 236, 124, 0.35)', 'rgba(125, 235, 250, 0.35)', 'rgba(250, 126, 189, 0.35)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
      />
      <Image 
        source={logo} 
        style={styles.logo}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Faz o gradiente ocupar toda a tela
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 1,
  },
});

export default Opening;
