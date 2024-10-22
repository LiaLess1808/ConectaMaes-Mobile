import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import SettingsHeader from '../components/SettingsHeader';
import {getValueData} from '../components/Storage';


const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SettingsHeader navigation = {navigation}/>
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#000" />
        <TextInput style={styles.searchInput} placeholder = {'Pesquisar'}/>
      </TouchableOpacity>
      <View>
        <Text style = {styles.yourAccount}>Sua conta</Text>
        <Image source={require('../assets/logo_typography.png')} style = {styles.logoSettings}/>
      </View>
      <TouchableOpacity style ={styles.section}>
        <Text style ={styles.headerTitle}>Informações do Usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.section}>
        <Text style ={styles.headerTitle}>Informações dos Filhos</Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.section}>
        <Text style ={styles.headerTitle}>Segurança</Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.section}>
        <Text style ={styles.headerTitle}>Interações com outros usuários</Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.section}>
        <Text style ={styles.headerTitle}>Notificações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 16,
  },
  section: {
    padding: 16,
  },
});
export default Settings;