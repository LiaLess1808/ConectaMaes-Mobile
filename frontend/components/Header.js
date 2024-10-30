import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { verifyAdmin } from '../functions/UserFunctions';

const Header = ({ navigation }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await verifyAdmin();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Erro ao verificar status de administrador:', error);
      }
    };

    checkAdminStatus();
  }, []);

  const handleIconPress = (iconName) => {
    console.log(`${iconName} icon pressed`);

    switch (iconName) {
      case 'cog':
        navigation.navigate('Settings');
        break;
      case 'magnify':
        navigation.navigate('Explore');
        break;
      case 'admin':
        navigation.navigate('Administration');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo_typography.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.iconsContainer}>
        {isAdmin == '1' && (
          <TouchableOpacity
            onPress={() => handleIconPress('admin')}
            accessibilityLabel="Admin">
            <Icon name="shield-account" size={24} color="#808080" />{' '}
            {/* Ícone de administração */}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleIconPress('magnify')}
          accessibilityLabel="Explorar">
          <Icon name="magnify" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress('cog')}
          accessibilityLabel="Configurações">
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
    minWidth: 60,
    justifyContent: 'flex-end',
    gap: 20,
  },
});

export default Header;
