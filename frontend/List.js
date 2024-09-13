import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

export function List({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchList() {
      fetch('https://nathless-tet.glitch.me/showUsers', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          setData(resJson);
        })
        .catch((e) => console.log(e));
    }
    fetchList();
  }, []);

  const Excluir = (idUsuario) => {
    return Alert.alert('Confirmar', 'Deseja Excluir?', [
      {
        text: 'Sim',
        onPress: () => {
          var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
          };

          fetch('https://nathless-tet.glitch.me/deleteUser/' + idUsuario, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
              setData((prevData) => prevData.filter(item => item.idUsuario !== idUsuario)); // Remove da lista
            })
            .catch((error) => console.log('error', error));
        },
      },
      {
        text: 'Não',
      },
    ]);
  };

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>{item.idUsuario}</Text>
        <Text>{item.nomeCompleto}</Text>
      </View>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => navigation.navigate('TelaEditar', { id: item.idUsuario })}
      >
        <Text style={{ color: 'green' }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => Excluir(item.idUsuario)}
      >
        <Text style={{ color: 'red' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={(item) => item.idUsuario.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItemView: { alignItems: 'center', flex: 1 },
  listItemTitle: { fontWeight: 'bold' },
  listItemButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 5,
    marginRight: 5,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});

export default List;
