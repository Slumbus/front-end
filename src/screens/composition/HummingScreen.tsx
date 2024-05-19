import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function HummingScreen({navigation}: any) {

  return(
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('MoodSelectScreen')}>
        <Text>다음 페이지</Text>
      </TouchableOpacity>
    </View>
  );
};
