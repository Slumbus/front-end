import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, Logo } from '../components/HomeScreenHeader';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/play/PlayScreen';
import LyricsScreen from '../screens/LyricsScreen';
import PlaylistScreen from '../screens/play/PlaylistScreen';
import MyScreen from '../screens/MyScreen';

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
      <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen} 
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => <Logo />,
          headerRight: () => <IconButton onPress={() => navigation.navigate('MyScreen')} />,
        })}
        />
      <Stack.Screen 
        name="PlayScreen" 
        component={PlayScreen} 
        options={{title: ''}}
      />
      <Stack.Screen 
        name="LyricsScreen" 
        component={LyricsScreen} 
        options={{
          title: "가사",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="PlaylistScreen"
        component={PlaylistScreen} 
        options={{
          title: "재생목록",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'
        }}  
      />
      <Stack.Screen
        name="MyScreen"
        component={MyScreen} 
        options={{
          title: "마이 페이지",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'
        }}  
      />
    </Stack.Navigator>
  );
}
