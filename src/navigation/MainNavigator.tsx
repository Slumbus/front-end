import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CompositionScreen from '../screens/CompositionScreen';
import ChildrenListScreen from '../screens/ChildrenListScreen';
import LyricWriting from '../screens/LyricWriting';

const Tab = createBottomTabNavigator();

export default function MainNavigator({navigation}: any) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={LyricWriting} />
      <Tab.Screen name="Composition" component={CompositionScreen} />
      <Tab.Screen name="ChildrenList" component={ChildrenListScreen} />
    </Tab.Navigator>
  );
}