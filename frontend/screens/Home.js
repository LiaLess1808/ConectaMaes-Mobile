import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import PostButton from '../components/PostButton';
import Post from '../components/Post';
import { getUserTheme, fetchUserId } from '../functions/UserFunctions';

const Home = ({ navigation }) => {
  const themeColors = useMemo(
    () => ({
      YellowTheme: '#BDB150',
      BlueTheme: '#40AEBD',
      PinkTheme: '#CF4A8E',
    }),
    []
  );

  const [themeColor, setThemeColor] = useState(themeColors.YellowTheme);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const idUsuario = await fetchUserId();
        const theme = await getUserTheme();

        console.log('User  ID:', idUsuario);
        console.log('Theme:', theme);

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
            setThemeColor(themeColors.BlueTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, [themeColors]);

  useEffect(() => {
    const simulatedPosts = Array.from({ length: 7 }, (_, index) => ({
      id: index.toString(),
      title: `Post ${index + 1}`,
      content: `Este é o conteúdo do post ${index + 1}.`,
    }));
    setPosts(simulatedPosts);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Post title={item.title} content={item.content} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header style={styles.header} navigation={navigation} />
      <View style={styles.content}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
        <PostButton style={styles.postButton} themeColor={themeColor} />
      </View>
      <NavigationBar style={styles.navBar} themeColor={themeColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
    width: '100%',
  },
  flatListContent: {
    paddingBottom: 0,
  },
  navBar: {
    position: 'sticky',
    bottom: 0,
    width: '100%',
  },
  header: {
    width: '100%',
    top: 0,
    position: 'relative',
  },
  postButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});

export default Home;
