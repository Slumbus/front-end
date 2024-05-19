import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LyricsRecordingScreen() {
  const SongCompletionData = [
    {
      id: 1,
      picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
      title: "완전 취침",
      child: "사랑이",
      song: "https://freemusicarchive.org/music/Dee_Yan-Key/lullaby/lullaby/",
      lyrics: "잘 자라 우리 사랑이\n가사가사가사가사가사가사가사\n가사 가사 가사 가사\n가사 가사 가사 가사 가사\n가사가사가사가사\n가사 가사 가사 가사 가사 가사 가사\n잘자라 우리 사랑이"
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {SongCompletionData.map((song) => (
        <View key={song.id} style={styles.songContainer}>
          <Image source={{ uri: song.picture }} style={styles.image} />
          <Text style={styles.titleText}>{song.title}</Text>
          <Text style={styles.childText}>{song.child}</Text>
          <Text style={styles.lyricsText}>{song.lyrics}</Text>
        </View>
      ))}
      <View style={styles.songPlayContainer}>
        <Icon name="play" size={28} color="#283882" onPress={() => console.log("재생 버튼 눌림")} />
        <View style={styles.playBar} />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.completionButton}>
          <Text style={styles.ButtonText}>완성</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  songContainer: {
    alignItems: 'center',
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 5,
    marginHorizontal: 35,
    marginTop: 25,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 35,
    marginTop: 25,
  },
  childText: {
    color: 'black',
    fontSize: 14,
    marginHorizontal: 35,
  },
  lyricsText: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 35,
    lineHeight: 25,
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  songPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
    marginVertical: 10,
    alignItems: 'center',
  },
  playBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#283882',
    marginLeft: 10,
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  completionButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#283882',
    borderRadius: 50,
    width: 90,
    alignItems: 'center',
  },
  ButtonText: {
    color: '#FFFFFF',
  },
});
