import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChildrenListScreen from '../screens/children/ChildrenListScreen';
import ChildrenRegisterScreen from '../screens/children/ChildrenRegisterScreen';
import ChildrenInfoPlaylistScreen from '../screens/ChildrenInfoPlaylistScreen';
import ChildrenInfoReactionRegisterScreen from '../screens/ChildrenInfoReactionRegisterScreen';
import ChildrenInfoReactionScreen from '../screens/ChildrenInfoReactionScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChildrenList" component={ChildrenListScreen} />
      <Stack.Screen
        name="ChildrenRegister"
        component={ChildrenRegisterScreen}
      />
      <Stack.Screen
        name="ChildrenInfoPlaylist"
        component={ChildrenInfoPlaylistScreen}
      />
      <Stack.Screen
        name="ChildrenInfoReaction"
        component={ChildrenInfoReactionScreen}
      />
      <Stack.Screen
        name="ChildrenInfoReactionRegister"
        component={ChildrenInfoReactionRegisterScreen}
      />
    </Stack.Navigator>
  );
}
