import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainNavigator from './src/navigation/MainNavigator';
import { PlaybackProvider } from './src/contexts/PlaybackContext';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
