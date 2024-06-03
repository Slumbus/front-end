import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChildrenListScreen from '../screens/children/ChildrenListScreen';
import ChildrenRegisterScreen from '../screens/children/ChildrenRegisterScreen';
import ChildrenInfoPlaylistScreen from '../screens/children/ChildrenInfoPlaylistScreen';
import ChildrenInfoReactionRegisterScreen from '../screens/children/ChildrenInfoReactionRegisterScreen';
import ChildrenInfoReactionScreen from '../screens/children/ChildrenInfoReactionScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChildrenList"
        component={ChildrenListScreen}
        options={{
          title: '아이 목록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenRegister"
        component={ChildrenRegisterScreen}
        options={{
          title: '아이 등록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenInfoPlaylist"
        component={ChildrenInfoPlaylistScreen}
        options={{
          title: '아이 상세',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenInfoReaction"
        component={ChildrenInfoReactionScreen}
        options={{
          title: '자장가 반응 목록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenInfoReactionRegister"
        component={ChildrenInfoReactionRegisterScreen}
        options={{
          title: '자장가 반응 작성',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
