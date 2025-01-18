import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas
import Opening from './screens/Opening';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Administration from './screens/Administration';

const Stack = createStackNavigator();

function App() {
  console.warn("renderizar App");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening">
        {/*<Stack.Screen
          name="Opening"
          component={Opening}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />*/}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Administration"
          component={Administration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
