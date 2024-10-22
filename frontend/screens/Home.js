import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header style={styles.header} navigation={navigation} />
      <View style={styles.content}>
        <Text></Text>
      </View>
      <NavigationBar style={styles.navBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1, // O conteúdo ocupará o espaço restante entre o Header e a NavigationBar
    backgroundColor: 'fff',
  },
  navBar: {
    position: 'absolute', // Fixa a NavigationBar na parte inferior
    bottom: 0,
    width: '100%',
  },
  header: {
    width: '100%', // Garante que o Header ocupe a largura total
    top: 0, // Garante que o Header esteja no topo do container
    position: 'relative', // Fixar o Header no topo

  },
});

export default Home;
