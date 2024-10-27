import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsHeader from '../components/SettingsHeader';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SettingsHeader navigation={navigation} />
      {/* Search Bar and Logo Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#000" />
          <TextInput style={styles.searchInput} placeholder={'Pesquisar'} />
        </TouchableOpacity>
        <Image source={require('../assets/logo_typography.png')} style={styles.logoSettings} />
      </View>
      <View>
        <Text style={styles.yourAccount}>Sua conta</Text>
      </View>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Informações do Usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Informações dos Filhos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Segurança</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Interações com outros usuários</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Notificações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  logoSettings: {
    width: 129 / 1.5,
    height: 43 / 1.5,
    resizeMode: 'contain',
  },
  section: {
    padding: 16,
  },
});

export default Settings;