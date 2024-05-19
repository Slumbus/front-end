import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import LyricsScreen from '../screens/LyricsScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

export type RootStackParamList = {  // 더미데이터 값 직접 전달, api 연결 시 수정
  HomeScreen: undefined;
  PlayScreen: {
    picture: string;
    name: string;
    title: string;
  };
};

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
