import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import BasicSong from '../../components/BasicSong';

export default function LyricsRecordingScreen({navigation}: any) {
  const LyricWritingdata = [
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
      {LyricWritingdata.map((song) => (
        <View key={song.id} style={styles.song}>
          <BasicSong imageSource={{uri: song.picture}} title={song.title} child={song.child} />
        </View>
      ))}
      <View style={styles.songPlayContainer}>
        <Icon name="play" size={28} color="#283882" onPress={() => console.log("재생 버튼 눌림")} />
        <View style={styles.playBar} />
      </View>
      {LyricWritingdata.map((song) => (
        <Text key={song.id} style={styles.lyricsText}>{song.lyrics}</Text>
      ))}
      <View style={styles.recordingContainer}>
        <Text>녹음</Text>
      </View>
      <TouchableOpacity style={styles.recordingButton}>
        <Icon2 name="record-circle-outline" size={50} color="red" onPress={() => console.log("녹음 시작")} />
      </TouchableOpacity>
      <View style={styles.ButtonsContainer}>
        <TouchableOpacity style={styles.Button1}>
          <Text style={styles.ButtonText}>재생</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button2}>
          <Text style={styles.ButtonText}>다시 녹음하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button3} onPress={() => navigation.navigate('CompositionScreen')}>
          <Text style={styles.ButtonText2}>저장</Text>
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283882',
  },
  song: {
    marginTop: 25,
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
  lyricsText: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 35,
    lineHeight: 25,
    color: '#000',
    fontSize: 12,
    fontFamily: 'SCDream4',
  },
  recordingContainer: {
    backgroundColor: 'grey',
    height: 170,
  },
  recordingButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  ButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  Button1: {
    padding: 10,
    marginHorizontal: 5,
    borderBlockColor: '#283882',
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
  },
  Button2: {
    padding: 10,
    marginHorizontal: 5,
    borderBlockColor: '#283882',
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
  },
  Button3: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#283882',
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
  },
  ButtonText: {
    color: '#283882',
    fontFamily: 'SCDream5',
    fontSize: 14,
  },
  ButtonText2: {
    color: '#FFFFFF',
    fontFamily: 'SCDream5',
    fontSize: 14,
  },
});
