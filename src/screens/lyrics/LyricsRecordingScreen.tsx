import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BasicSong from '../../components/BasicSong';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { getUserData } from '../../utils/Store';
import axios from 'axios';
import CombineLoadingModal from '../../components/modal/CombineLoadingModal';

// 녹음 기능
const audioRecorderPlayer = new AudioRecorderPlayer();

const requestPermissions = async() => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('마이크, 저장 공간 사용 가능');
      } else {
        console.log('마이크 권한 거절');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

export default function LyricsRecordingScreen({route, navigation}: any) {
  const { songId } = route.params;
  const [data, setData] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const [sliderValue, setSliderValue] = useState(0);

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

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

  // 녹음 기능
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingRec, setIsPlayingRec] = useState(false);
  const [recordedURI, setRecordedURI] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playTime, setPlayTime] = useState('00:00:00');
  const [playDuration, setPlayDuration] = useState('00:00:00');
  
  const onStartRecord = async () => {
    await requestPermissions();
    setIsRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording: ', e.currentPosition);
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  const formatTimeToMinutesSeconds = (timeString: any) => {
    const timeParts = timeString.split(':');
    const minutes = timeParts[0];
    const secondsWithMilliseconds = timeParts[1];

    // 초와 밀리초를 ':'로 나눔 (예: '05.50' -> '05'와 '50')
    const seconds = secondsWithMilliseconds.split('.')[0];

    // 최종적으로 분:초 형식으로 반환
    return `${minutes}:${seconds}`;
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordedURI(result);
    setIsRecording(false);
    setRecordSecs(0);
    console.log(result);
  };

  const onStartPlay = async () => {
    setIsPlayingRec(true);
    const result = await audioRecorderPlayer.startPlayer(recordedURI);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setPlayDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      console.log('Playing: ', e.currentPosition);
      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
      return;
    });
    console.log(result);
  };

  const onStopPlay = async () => {
    const result = await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlayingRec(false);
    console.log(result);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveMusic = async () => {
    setLoadingModalVisible(true);
    const token = await getUserData();

    // 녹음 파일 경로
    const recordedFilePath = 'file:////data/user/0/com.slumbus/cache/sound.mp4';

    const formData = new FormData();
    formData.append('musicUrl', data.url);
    console.log(data.url);
    formData.append('recordedFile', {
      uri: recordedFilePath,
      type: 'audio/mp3',
      name: 'recording.mp3',
    });

    try {
      const response = await axios.post(`http://10.0.2.2:8080/api/song/combine/${songId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        console.log('녹음본 합본 저장 성공');
        setLoadingModalVisible(false);
        navigation.navigate('CompositionScreen', {songId});
      } else {
        console.error('녹음본 합본 저장 실패:', response.data.message);
      }
    } catch (error) {
      console.error('녹음본 합본 저장 오류:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {data && (
        <View key={data.id} style={styles.song}>
          <BasicSong imageSource={{uri: data.artwork}} title={data.title} child={data.kidName} />
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
      {data && (
        <Text style={styles.lyricsText}>{data.lyric}</Text>
      )}
      
      {/* 녹음 기능 */}
      <View style={styles.recordingContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timerText}>녹음 시간: {formatTimeToMinutesSeconds(recordTime)}</Text>
        </View>
        {recordedURI ? (
          <View style={styles.playContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={isPlayingRec ? onStopPlay : onStartPlay}
            >
              <Icon
                name={isPlayingRec ? "stop" : "play"}
                size={30}
                color={isPlayingRec ? "#000" : "#283882"}
                style={{top: 3}}
              />
              <Text style={styles.timerText}>{formatTimeToMinutesSeconds(playTime)} / {formatTimeToMinutesSeconds(playDuration)}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.recordingButton}
          onPress={isRecording ? onStopRecord : onStartRecord}
        >
          <Icon2
            name={isRecording ? "record-circle" : "record-circle-outline"}
            size={50}
            color={isRecording ? "darkred" : "red"}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.ButtonsContainer}>
        <TouchableOpacity style={styles.Button3} onPress={handleSaveMusic}>
          <Text style={styles.ButtonText2}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* loading modal */}
      <CombineLoadingModal loadingModalVisible={loadingModalVisible}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#E4E4E4',
    height: 170,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  recordingButton: {
    marginVertical: 10,
    alignItems: 'center',
    width: 50,
  },
  ButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop:10,
    marginBottom: 100
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
  timeContainer: {
    margin: 10,
    alignItems: 'center',
  },
  playContainer: {
    margin: 10,
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: 'row',
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'SCDream4',
    marginVertical: 10,
    color: '#000',
    marginHorizontal: 10,
  },
});
