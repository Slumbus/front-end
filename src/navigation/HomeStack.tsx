import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, Logo } from '../components/HomeScreenHeader';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/play/PlayScreen';
import LyricsScreen from '../screens/play/LyricsScreen';
import PlaylistScreen from '../screens/play/PlaylistScreen';
import MyScreen from '../screens/MyScreen';

interface Music {
  title: string;
  picture: string;
  lyrics: string;
}

interface Album {
  picture: string;
  name: string;
  albumname: string;
  Music: Music[];
}

export type RootStackParamList = {  // 더미데이터 값 직접 전달, api 연결 시 수정
  HomeScreen: undefined;
  PlayScreen: {
    album: Album;
    song: Music;
  };
  LyricsScreen: {
    picture: string;
    name: string;
    title: string;
    lyrics: string;
  };
  PlaylistScreen: {
    album: Album;
    song: Music;
  };
};

const Stack = createNativeStackNavigator();

export default function HomeStack({navigation, route}: any) {
  React.useLayoutEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === "HomeScreen" ||  routeName === undefined) {
        navigation.setOptions({ tabBarStyle : {display: 'flex' }});
      } else {
        navigation.setOptions({ tabBarStyle : {display: 'none' }});
      }
  }, [navigation, route]);

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
