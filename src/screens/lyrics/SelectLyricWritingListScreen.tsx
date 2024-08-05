import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LyricSong from '../../components/LyricSong';
import { getUserData } from '../../utils/Store';

export default function SelectLyricWritingList({navigation}: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getUserData();
      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/song/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>곡 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>어떤 자장가를 작사하고 싶나요?</Text>
        </View>
      </View>
      {data.map((song) => (
        <View key={song.id}>
          <LyricSong
            imageSource={{ uri: song.artwork }}
            title={song.title}
            child={song.kidName}
            onPress={() => navigation.navigate('LyricWriting', { songId: song.id })}
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
    fontFamily: 'SCDream6',
    color: '#4A4A4A',
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
    fontFamily: 'SCDream4',
    color: '#4A4A4A',
  },
});
