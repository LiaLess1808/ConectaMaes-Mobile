import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdministrationHeader from '../components/AdministrationHeader';
import {
  fetchUserId,
  fetchUserToken,
  getUserTheme,
} from '../functions/UserFunctions';

const Administration = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); // Novo estado para o modal de edição
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Novo estado para o modal de exclusão
  const [randomCode, setRandomCode] = useState('');
  const [inputCode, setInputCode] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Novo estado para o usuário selecionado

  const themeColors = useMemo(
    () => ({
      YellowTheme: '#BDB150',
      BlueTheme: '#40AEBD',
      PinkTheme: '#CF4A8E',
    }),
    []
  );
  const [themeColor, setThemeColor] = useState(themeColors.YellowTheme);
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

  const fetchUsers = async () => {
    try {
      const token = await fetchUserToken();
      const response = await fetch(
        'https://conectamaes-api.glitch.me/showUsers',
        {
          method: 'GET',
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch users. Please try again later.');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Armazena o usuário selecionado
    setEditModalVisible(true); // Abre o modal de edição
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setRandomCode(generateRandomCode()); // Gera um novo código aleatório
    setDeleteModalVisible(true); // Abre o modal de exclusão
  };

  const generateRandomCode = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const confirmDeleteUser = async () => {
    if (inputCode === randomCode) {
      try {
        const token = await fetchUserToken();
        const response = await fetch(
          `https://conectamaes-api.glitch.me/deleteUser/${selectedUser.idUsuario}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error deleting user');
        }

        console.log(`User with ID ${selectedUser.idUsuario} deleted`);
        Alert.alert('Success', 'User deleted successfully!');
        setDeleteModalVisible(false);
        fetchUsers(); // Atualiza a lista de usuários
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to delete user. Please try again.');
      }
    } else {
      Alert.alert('Error', 'The code entered is incorrect. Please try again.');
    }
  };

  const openUserModal = () => {
    fetchUsers();
    setModalVisible(true);
  };

  const handleSaveUser = async () => {
    try {
      const token = await fetchUserToken();
      console.log('User Token:', token); // Verifica o token

      // Formata a data para YYYY-MM-DD
      const formattedDate = new Date(selectedUser.dataNascimentoUsuario)
        .toISOString()
        .split('T')[0];

      const updatedUser = {
        ...selectedUser,
        dataNascimentoUsuario: formattedDate, // Atualiza a data formatada
      };

      const response = await fetch(
        `https://conectamaes-api.glitch.me/editUser/${selectedUser.idUsuario}`,
        {
          method: 'PUT',
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser), // Envia o usuário atualizado
        }
      );

      if (!response.ok) {
        const errorResponse = await response.text(); // Captura a resposta do erro
        console.error('Response error:', errorResponse);
        throw new Error('Failed to update user');
      }

      Alert.alert('Success', 'User updated successfully!');
      setEditModalVisible(false);
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save user. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <AdministrationHeader navigation={navigation} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#000" />
          <TextInput style={styles.searchInput} placeholder={'Pesquisar'} />
        </TouchableOpacity>
        <Image
          source={require('../assets/logo_typography.png')}
          style={styles.logoSettings}
        />
      </View>
      <View>
        <Text style={styles.yourAccount}>Sua conta</Text>
      </View>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Relatório</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section} onPress={openUserModal}>
        <Text style={styles.headerTitle}>Usuários</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Publicações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.headerTitle}>Notificações</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userHeader}>{item.nomeCompleto}</Text>
                <Text>User: @{item.nomeDeUsuario}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Desde: {item.dataCriacaoUsuario}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: themeColor }]}
                    onPress={() => handleEditUser(item)}>
                    {' '}
                    {/* Passa o usuário selecionado */}
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#C84A60' }]}
                    onPress={() => handleDeleteUser(item)}>
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#C84A60' }]}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para edição de usuário */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContainer}>
          {selectedUser && ( // Renderiza o formulário se um usuário estiver selecionado
            <>
              <Text style={styles.userHeader}>Editar Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={selectedUser.nomeCompleto}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, nomeCompleto: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                value={selectedUser.nomeDeUsuario}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, nomeDeUsuario: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="numeric"
                value={
                  selectedUser.telefone ? selectedUser.telefone.toString() : ''
                }
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, telefone: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Biografia"
                value={selectedUser.biografia}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, biografia: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={selectedUser.estado}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, estado: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Data de Nascimento"
                value={selectedUser.dataNascimentoUsuario} // Aqui você pode querer formatar a data
                onChangeText={(text) =>
                  setSelectedUser({
                    ...selectedUser,
                    dataNascimentoUsuario: text,
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Tema"
                value={selectedUser.tema}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, tema: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Chave Pix"
                value={selectedUser.chavePix}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, chavePix: text })
                }
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: '#C84A60' }]}
                  onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: themeColor }]}
                  onPress={handleSaveUser}>
                  <Text style={styles.closeButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>

      {/* Modal para deletar usuário */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.userHeader}>Confirmar Exclusão</Text>
          <Text>
            Por favor, insira o código abaixo para confirmar a exclusão:
          </Text>
          <Text style={styles.randomCode}>{randomCode}</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de confirmação"
            value={inputCode}
            onChangeText={setInputCode}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: themeColor }]}
              onPress={confirmDeleteUser}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: '#C84A60' }]}
              onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    marginLeft: 5,
    flex: 1,
  },
  logoSettings: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  yourAccount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  userHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    borderRadius: 25,
    alignSelf: 'flex-end',
    width: 90,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  randomCode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default Administration;
