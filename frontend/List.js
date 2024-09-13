import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Sobre o item ...',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Sobre o item ...',
  },
  {
    id: '3',
    title: 'Item 3',
    description: 'Sobre o item ...',
  },
];

const Item = ({ title, description, id }) => (
  <View style={styles.item}>
    <Text style={styles.id}>{id}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <TouchableOpacity>
      <Text>Selecionar</Text>
    </TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} description={item.description} id={item.id} />
);

const List = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default List;