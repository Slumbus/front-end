import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AuthStack from './src/navigation/AuthStack';
import MainNavigator from './src/navigation/MainNavigator';
import { setupPlayer } from './src/screens/play/PlayController';

const Stack = createNativeStackNavigator();

export default function App() {
  setupPlayer(); //트랙 플레이어 생성

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
