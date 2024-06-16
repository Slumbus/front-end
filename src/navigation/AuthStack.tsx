import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import FindPWChangeScreen from '../screens/auth/FindPWChangeScreen';
import FindPWEmailScreen from '../screens/auth/FindPWEmailScreen';
import AgreeScreen from '../screens/auth/AgreeScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPWEmail"
        component={FindPWEmailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPWChange"
        component={FindPWChangeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Agree"
        component={AgreeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
