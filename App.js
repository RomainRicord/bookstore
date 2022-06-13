import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ModifScreen from './src/screens/ModifScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import Modif2Screen from './src/screens/Modif2Screen';

const Stack = createStackNavigator();

const App = () => {

  return(<NavigationContainer>
  <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ModifScreen" component={ModifScreen} />
    <Stack.Screen name="Modif2Screen" component={Modif2Screen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator></NavigationContainer>)

}

export default App