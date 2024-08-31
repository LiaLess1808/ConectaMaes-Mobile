import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Login from './Login'; 
import CadastroUsuario from './CadastroUsuario';
import AtualizaUsuario from './AtualizaUsuario';
import List from './List'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="List" component={List} options={{ title: 'List' }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario} options={{ title: 'Atualizar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}