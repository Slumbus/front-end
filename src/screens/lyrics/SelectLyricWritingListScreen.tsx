import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LyricSong from '../../components/LyricSong';
import { getUserData } from '../../utils/Store';
import {API_URL} from '@env';

export default function SelectLyricWritingList({navigation}: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getUserData();
      try {
        const response = await axios.get(`${API_URL}/api/song/list`, {
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

  const handleDelete = async (songId: string) => {
    try {
      const token = await getUserData();
      await axios.delete(`${API_URL}/api/song/${songId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 삭제된 항목만 목록에서 제거
      setData((prevData) => prevData.filter((song) => song.id !== songId));
    } catch (error) {
      console.error('Error deleting song', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>곡 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>어떤 자장가를 작사하고 싶나요?</Text>
        </View>
      </View>
      
      {data.length === 0 ? 
        <View style={{alignItems: 'center', paddingVertical: 40}}>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 자장가가 없습니다.</Text>
          <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>작곡 탭에서 자장가를 등록해주세요!</Text>
        </View>
        :
        <View>
          {data.map((song) => (
            <View key={song.id}>
              <LyricSong
                imageSource={{ uri: song.artwork }}
                title={song.title}
                child={song.kidName}
                onPress={() => navigation.navigate('LyricWriting', { songId: song.id })}
                onPress2={() => navigation.navigate('MusicUpdateScreen', { songId: song.id })}
                onPress3={() => handleDelete(song.id)}
              />
            </View>
          ))}
        </View>
      }
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
