import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import LyricsScreen from '../screens/LyricsScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />
      <Stack.Screen name="LyricsScreen" component={LyricsScreen} />
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
    </Stack.Navigator>
  );
}
