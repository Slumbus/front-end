import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BasicSong from '../../components/BasicSong';

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

export default function LyricsRecordingScreen({navigation}: any) {
  // 녹음 기능
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordedURI(result);
    setIsRecording(false);
    setRecordSecs(0);
    console.log(result);
  };

  const onStartPlay = async () => {
    setIsPlaying(true);
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
    setIsPlaying(false);
    console.log(result);
  };
  
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
      
      {/* 녹음 기능 */}
      <View style={styles.recordingContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timerText}>녹음 시간: {recordTime}</Text>
        </View>
        {recordedURI ? (
          <View style={styles.playContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={isPlaying ? onStopPlay : onStartPlay}
            >
              <Icon
                name={isPlaying ? "stop" : "play"}
                size={30}
                color={isPlaying ? "#000" : "#283882"}
                style={{top: 3}}
              />
              <Text style={styles.timerText}>{playTime} / {playDuration}</Text>
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
    marginBottom: 50,
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
