import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { getUserData } from '../utils/Store';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

export default function SongCompletion2({route, navigation}: any) {
  const { songId } = route.params;
  const [data, setData] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = await getUserData();
      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/song/detail/${songId}`, {
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
  }, [songId]);

  // 음악 재생
  useEffect(() => {
    if (data && data.url) {
      // URL이 정의되어 있는지 확인
      if (typeof data.url !== 'string' || !data.url.trim()) {
        console.error('Invalid music URL:', data.url);
        return;
      }

      if (sound) {
        sound.release();
      }
      
      const newSound = new Sound(data.url, null, (error) => {
        if (error) {
          console.error('Failed to load the sound', error);
          return;
        }
        setDuration(newSound.getDuration());
        setSound(newSound);
      });

      return () => {
        if (sound) {
          sound.release();
        }
      };
    }
  }, [data]);

  //해당 스크린 벗어나면 음악 정지
  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [sound]);

  const playPause = () => {
    if (!sound) {
      console.error('Sound not loaded');
      return;
    }
    
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play((success) => {
        if (success) {
          console.log('Finished playing');
        } else {
          console.error('Playback failed due to audio decoding errors');
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        sound?.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
          setSliderValue(seconds);
        });
      }, 1000);
    } else if (!isPlaying && currentTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSliderValueChange = (value: number) => {
    setSliderValue(value);
    if (sound) {
      sound.setCurrentTime(value);
      setCurrentTime(value);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {data && (
        <View key={data.id} style={styles.songContainer}>
          <Image source={{ uri: data.artwork }} style={styles.image} />
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.childText}>{data.kidName}</Text>
          <Text style={styles.lyricsText}>{data.lyric}</Text>
        </View>
      )}
      <View style={styles.songPlayContainer}>
        <Icon name={isPlaying ? "pause" : "play"} size={28} color="#283882" onPress={playPause} />
        <View style={styles.playBarContainer}>
          <Slider
            style={styles.playBar}
            minimumValue={0}
            maximumValue={duration}
            value={sliderValue}
            onValueChange={handleSliderValueChange}
            minimumTrackTintColor="#283882"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#283882"
          />
        </View>
        <Text>{formatTime(currentTime)} / {formatTime(duration)}</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.completionButton}>
          <Text style={styles.ButtonText} onPress={() => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            })
          )}>완성</Text>
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
    color: '#000',
    fontSize: 20,
    fontFamily: 'SCDream5',
    marginHorizontal: 35,
    marginTop: 25,
  },
  childText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'SCDream4',
    marginHorizontal: 35,
  },
  lyricsText: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 35,
    lineHeight: 25,
    color: '#000',
    fontSize: 12,
    fontFamily: 'SCDream4',
    textAlign: 'center',
  },
  songPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
    marginVertical: 10,
    alignItems: 'center',
  },
  playBarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  playBar: {
    height: 30,
    width: '100%',
    marginVertical: 10,
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 100,
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
    fontFamily: 'SCDream5',
  },
});
