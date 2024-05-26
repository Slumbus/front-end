import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';

import HomeStack from './HomeStack';
import ComposeStack from './ComposeStack';
import ChildrenStack from './ChildrenListStack';
import { PlaybackProvider } from '../contexts/PlaybackContext';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.customButtonView}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function MainNavigator({navigation}) {
  return (
    <PlaybackProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon2 name="home" size={25} color={focused ? '#283882' : '#92949E'} />
                <Text style={{color: focused ? '#283882' : '#92949E', fontSize: 12, fontFamily: 'SCDream4'}}>홈</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="ComposeStack"
          component={ComposeStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon3 name="music" size={27} color="#fff" style={{right: 1}} />
                <Text style={styles.composeButtonText}>작곡</Text>
              </View>
              ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            )
          }}
        />
        <Tab.Screen
          name="ChildrenStack"
          component={ChildrenStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon name="baby-face-outline" size={30} color={focused ? '#283882' : '#92949E'} />
                <Text style={{color: focused ? '#283882' : '#92949E', fontSize: 12, fontFamily: 'SCDream4'}}>아이 목록</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </PlaybackProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 50,
    shadowColor: '#000',
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customButtonView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#283882',
    justifyContent: 'center',
    alignItems: 'center',
  },
  composeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'SCDream4',
    top: 3,
    marginTop: 1,
  },
});
