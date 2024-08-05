import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import BasicSong from '../../components/BasicSong';
import LyricsSaveModal from '../../components/modal/LyricsSaveModal';
import Slider from '@react-native-community/slider';

import { getUserData } from '../../utils/Store';
import axios from 'axios';

export default function LyricWriting({route, navigation}: any) {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const [sliderValue, setSliderValue] = useState(0);

  const { songId } = route.params;

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

  // AI 버튼 클릭 핸들러
  const handleAIButtonPress = async () => {
    const token = await getUserData();
    try {
      const response = await axios.post(`http://10.0.2.2:8080/api/song/genLyrics`,
        { lyrics: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setLyrics(response.data.result);
    } catch (error) {
      console.error('AI 요청 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      {data && (
        <View key={data.id} style={styles.song}>
          <BasicSong imageSource={{uri: data.artwork}} title={data.title} child={data.kidName} url={data.url} />
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
      <View style={styles.infoContainer}>
        <Text style={styles.title}>직접 작사 또는 AI에게 가사 추천 받기</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.promptInput}
            textAlignVertical='top'
            multiline
            placeholder='AI에게 요청하고 싶은 내용을 입력해 주세요.'
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity style={styles.AIbutton} onPress={handleAIButtonPress}>
            <Icon2 name="robot" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer2}>
          <TextInput
            style={styles.lyricsInput}
            textAlignVertical='top'
            multiline
            placeholder='가사를 입력해주세요.'
            value={lyrics}
            onChangeText={setLyrics}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            {/* <Text style={styles.saveText}>저장</Text> */}
            <LyricsSaveModal navigation={navigation} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SCDream6',
    color: '#283882',
  },
  song: {
    marginTop: 25,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'regular',
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
  inputContainer: {
    marginTop: 20,
  },
  inputContainer2: {
    marginBottom: 5,
  },
  promptInput: {
    height: 110,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: 'SCDream4',
    fontSize: 12,
  },
  lyricsInput: {
    height: 240,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: 'SCDream4',
    fontSize: 12,
  },
  AIbutton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#283882',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    height: 35,
    width: 90,
    borderRadius: 50,
    backgroundColor: '#283882',
    justifyContent: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'SCDream5',
  },
  modalView: {
    top: '45%',
    left: '15%',
    backgroundColor: 'grey',
    width: 260,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
