import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import ComposeStack from './ComposeStack';
import ChildrenStack from './ChildrenListStack';
import { PlaybackProvider } from '../contexts/PlaybackContext';

const Tab = createBottomTabNavigator();

export default function MainNavigator({navigation}: any) {
  return (
    <PlaybackProvider>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="ComposeSition" component={ComposeStack} />
        <Tab.Screen name="ChildrenStack" component={ChildrenStack} />
      </Tab.Navigator>
    </PlaybackProvider>
  );
}