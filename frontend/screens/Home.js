import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import { getUserTheme, fetchUserId } from '../functions/UserFunctions';

const Home = ({ navigation }) => {
  const themeColors = useMemo(() => ({
    YellowTheme: '#BDB150',
    BlueTheme: '#40AEBD',
    PinkTheme: '#CF4A8E',
  }), []);

  const [themeColor, setThemeColor] = useState(themeColors.YellowTheme); // Define um valor padrão

  useEffect(() => {
  const loadTheme = async () => {
    try {
      const idUsuario = await fetchUserId();
      const theme = await getUserTheme(idUsuario);

      console.log('User  ID:', idUsuario); // Log para verificar o ID do usuário
      console.log('Theme:', theme); // Log para verificar o tema retornado

      // Define a cor do tema com base no tema retornado
      switch (theme) {
        case 'YellowTheme':
          setThemeColor(themeColors.YellowTheme);
          break;
        case 'PinkTheme':
          setThemeColor(themeColors.PinkTheme);
          break;
        case 'BlueTheme':
          setThemeColor(themeColors.BlueTheme);
          break;
        default:
          setThemeColor(themeColors.YellowTheme); // Valor padrão
      }
    } catch (error) {
      console.error('Error loading theme:', error); // Log de erro
    }
  };

  loadTheme();
}, [themeColors]);

  return (
    <View style={styles.container}>
      <Header style={styles.header} navigation={navigation} />
      <View style={styles.content}>
        <Text></Text>
      </View>
      <NavigationBar style={styles.navBar} themeColor={themeColor} />
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
    backgroundColor: '#fff',
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