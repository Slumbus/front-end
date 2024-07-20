import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildSelectScreen from "../screens/composition/ChildSelectScreen";
import HummingScreen from "../screens/composition/HummingScreen";
import MelodySaveScreen from "../screens/composition/MelodySaveScreen";
import MoodSelectScreen from "../screens/composition/MoodSelectScreen";
import LyricWriting from '../screens/lyrics/LyricsWritingScreen';
import SelectLyricWritingList from '../screens/lyrics/SelectLyricWritingListScreen';
import LyricsRecordingScreen from '../screens/lyrics/LyricsRecordingScreen';
import SongCompletion from '../screens/SongCompletionScreen';

export type RootStackParamList = {
  HummingScreen: {
    kidId: number;
  };
  MoodSelectScreen: {
    kidId: number;
    file: string | null;
  };
  MelodySaveScreen: {
    kidId: number;
    url: string | null;
  };
};

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChildSelectScreen" 
        component={ChildSelectScreen} 
        options={{
          title: "자장가 작곡",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen 
        name="HummingScreen" 
        component={HummingScreen}
        options={{
          title: "자장가 작곡",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="MelodySaveScreen" 
        component={MelodySaveScreen}
        options={{
          title: "자장가 작곡",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="MoodSelectScreen" 
        component={MoodSelectScreen}
        options={{
          title: "자장가 작곡",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="SelectLyricWritingList" 
        component={SelectLyricWritingList}
        options={{
          title: "내가 작곡한 자장가",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="LyricWriting" 
        component={LyricWriting}
        options={{
          title: "작사",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="LyricsRecordingScreen" 
        component={LyricsRecordingScreen}
        options={{
          title: "녹음",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="CompositionScreen" 
        component={SongCompletion}
        options={{
          title: "완성",
          headerTitleStyle: {
            fontFamily: 'SCDream5'
          },
          headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}