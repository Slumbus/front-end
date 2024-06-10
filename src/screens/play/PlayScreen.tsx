import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Sound from 'react-native-sound';

import { RootStackParamList } from '../../navigation/HomeStack';

import IconButton from '../../components/button/IconButton';
import PlayModal from '../../components/modal/PlayModal';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';
import { usePlayback } from '../../contexts/PlaybackContext';

// const audioFile = require('../assets/audio/Lemon.mp3');

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlayScreen'>;  // 더미데이터 값 직접 전달, api 연결 시 수정

const PlayScreen: React.FC = ({navigation}: any) => {
  const route = useRoute<PlayScreenRouteProp>();
  const { album, song } = route.params;
  const { playbackPosition, setPlaybackPosition, playPress, currentTrackIndex } = usePlayback();

  const noise = ['빗소리', '파도 소리', '귀뚜라미 소리', '비행기 소리', '청소기 소리'];
  const timer = ['5분', '15분', '30분', '1시간'];

  const [isNoiseModalVisible, setNoiseModalVisible] = useState(false);
  const [isTimerModalVisible, setTimerModalVisible] = useState(false);
  const [timeDuration, setTimeDuration] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);


  const toggleNoiseModal = () => {
    setNoiseModalVisible(!isNoiseModalVisible);
  };
  const toggleTimerModal = () => {
    setTimerModalVisible(!isTimerModalVisible);
  };

  const handleTimerSelect = (duration: string) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const durationInMs = parseDuration(duration);
    setTimeDuration(durationInMs);

    const newTimerId = setTimeout(() => {
      playPress();
      setTimeDuration(null);
    }, durationInMs);

    setTimerId(newTimerId);
    toggleTimerModal();
  };

  const parseDuration = (duration: string) => {
    switch (duration) {
        case '5분':
          return 5*60*1000;
        case '15분':
          return 15*60*1000;
        case '30분':
          return 30*60*1000;
        case '1시간':
          return 60*60*1000;
        default:
          return 0;
    }
  };

  const handleNoiseSelect = (noise: string) => {
    if (sound) {
      // 이전에 재생 중이던 소리 멈춤
      sound.stop(() => {
        sound.release();
      });
    }

    let soundFile;
    switch (noise) {
      case '빗소리':
        soundFile = require('../../assets/audio/Rain.mp3');
        break;
      case '파도 소리':
        soundFile = require('../../assets/audio/Waves.mp3');
        break;
      case '귀뚜라미 소리':
        soundFile = require('../../assets/audio/Crickets.mp3');
        break;
      case '비행기 소리':
        soundFile = require('../../assets/audio/Airplane.mp3');
        break;
      case '청소기 소리':
        soundFile = require('../../assets/audio/Vacuum.mp3');
        break;
      default:
        return;
    }

    // 새로운 소리 파일 재생
    const newSound = new Sound(soundFile, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      console.log('Sound loaded successfully');
      setSound(newSound);
      newSound.play((success) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
        newSound.release();
      });
    });
    
    toggleNoiseModal();
  };

  useEffect(() => {
    
  }, [currentTrackIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{uri:song.picture}} style={styles.image} />
        <Text style={styles.titleText}>{song.title}</Text>
        <Text style={styles.text}>{album.name}</Text>
      </View>
      <SliderComponent //고정 값 추후 수정
        playbackPosition={playbackPosition}
        setPlaybackPosition={setPlaybackPosition}
        maximumValue={200}
      />
      <View style={{marginVertical: 45}}>
        <PlayButtonBarContainer />
      </View>
      <View style={styles.IconButtonContainer}>
        <IconButton
          IconLibrary="MaterialCommunityIcons"
          IconName="playlist-music"
          text="재생목록"
          onPress={() => navigation.navigate('PlaylistScreen', { // 더미데이터 값 직접 전달, api 연결 시 수정
            album: album,
            song: song,
          })} />
        <IconButton 
          IconLibrary="MaterialIcons"
          IconName="lyrics"
          text="가사"
          onPress={() => navigation.navigate('LyricsScreen', { // 더미데이터 값 직접 전달, api 연결 시 수정
            picture: song.picture,
            name: album.name,
            title: song.title,
            lyrics: song.lyrics,
          })}/>
        <IconButton IconLibrary="MaterialIcons" IconName="bedtime" text="타이머" onPress={toggleTimerModal} />
        <IconButton IconLibrary="MaterialCommunityIcons" IconName="waveform" text="백색 소음" onPress={toggleNoiseModal} />
        <IconButton
          IconLibrary="MaterialIcons"
          IconName="add-reaction"
          text="자장가 반응 기록하기"
          onPress={() => navigation.navigate('ChildrenListStack', { // api 연결 시 param 전달
            screen: 'ChildrenInfoReactionRegister'
        })}/>
      </View>
      <PlayModal
        isVisible={isTimerModalVisible}
        onClose={toggleTimerModal}
        title="취침 타이머"
        elements={timer}
        onElementPress={handleTimerSelect}
      />
      <PlayModal
        isVisible={isNoiseModalVisible}
        onClose={toggleNoiseModal}
        title="백색 소음"
        elements={noise}
        onElementPress={handleNoiseSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 310,
    height: 310,
    borderRadius: 5,
  },
  titleContainer:{
    marginVertical: 15,
  },
  titleText:{
    marginTop: 5,
    fontSize: 20,
    color: '#000',
    fontFamily: 'SCDream5',
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream4',
  },
  IconButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default PlayScreen;
