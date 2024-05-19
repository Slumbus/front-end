import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildSelectScreen from "../screens/composition/ChildSelectScreen";
import HummingScreen from "../screens/composition/HummingScreen";
import MelodySaveScreen from "../screens/composition/MelodySaveScreen";
import MoodSelectScreen from "../screens/composition/MoodSelectScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChildSelectScreen" 
        component={ChildSelectScreen} 
        options={{title: "자장가 작곡"}}
      />
      <Stack.Screen 
        name="HummingScreen" 
        component={HummingScreen}
        options={{title: "자장가 작곡"}}
      />
      <Stack.Screen 
        name="MelodySaveScreen" 
        component={MelodySaveScreen}
        options={{title: "자장가 작곡"}}
      />
      <Stack.Screen 
        name="MoodSelectScreen" 
        component={MoodSelectScreen}
        options={{title: "자장가 작곡"}}
      />
    </Stack.Navigator>
  );
}