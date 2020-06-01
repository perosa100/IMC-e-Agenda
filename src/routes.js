import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Calculadora from './pages/Calculadora';
import Main from './pages/Main';
import Book from './pages/Book';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Calculadora"
          component={Calculadora}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Book"
          component={Book}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
