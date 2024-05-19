import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import LyricSong from '../components/LyricSong';

export default function SelectLyricWritingList() {
  const SelectLyricWritingdata = [
    {
      id: 1,
      picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
      title: "완전 취침",
      child: "사랑이",
    },
    {
      id: 2,
      picture: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
      title: "꿀잠",
      child: "사랑이",
    },
    {
      id: 3,
      picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
      title: "Good night",
      child: "사랑이",
    },
    {
      id :4,
      picture: "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_1280.jpg",
      title: "좋은 꿈",
      child: "사랑이",
    },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>곡 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>어떤 자장가를 작사하고 싶나요?</Text>
        </View>
      </View>
      {SelectLyricWritingdata.map((song) => (
        <View key={song.id}>
          <LyricSong
            imageSource={{ uri: song.picture }}
            title={song.title}
            child={song.child}
            // onPress={}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoTextContainer: {
    marginTop: 5,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderTopColor: '#D9D9D9',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'regular',
  },
});
