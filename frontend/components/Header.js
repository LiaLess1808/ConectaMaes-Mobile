import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({navigation}) => {
  const handleIconPress = (iconName) => {
    console.log(`${iconName} icon pressed`);

    if (iconName === 'cog')
        navigation.navigate('Settings'); // Navega para a tela de Configurações
    if (iconName === 'magnify') 
        navigation.navigate('Explore'); // Navega para a tela de Exploração
};


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_typography.png')} style={styles.logo} />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleIconPress('magnify')}>
          <Icon name="magnify" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('cog')}>
          <Icon name="cog" size={24} color="#808080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 2,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 129,
    height: 43,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    minWidth: 60,
    justifyContent: 'flex-end',
  },
});

export default Header;