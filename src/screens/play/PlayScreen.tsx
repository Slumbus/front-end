import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Sound from 'react-native-sound';

import { RootStackParamList } from '../../navigation/HomeStack';

import IconButton from '../../components/button/IconButton';
import PlayModal from '../../components/modal/PlayModal';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';
import { usePlayback } from '../../contexts/PlaybackContext';
import TrackPlayer, {Capability, Event, RepeatMode, useTrackPlayerEvents} from 'react-native-track-player';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlayScreen'>;  // 더미데이터 값 직접 전달, api 연결 시 수정

interface TrackPlayerControlsOptions {
  waitforBuffer: boolean;
  stopWithApp: boolean;
  alwaysPauseOnInterruption: boolean;
  capabilities: Capability[];
  compactCapabilities: Capability[];
}

const TRACK_PLAYER_CONTROLS_OPTS: TrackPlayerControlsOptions = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
};

const events = [
  Event.PlaybackActiveTrackChanged,
];

const PlayScreen: React.FC = ({navigation}: any) => {
  const route = useRoute<PlayScreenRouteProp>();
  const { album, song } = route.params;
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, stopPlayback } = usePlayback();

  const noise = ['빗소리', '파도 소리', '귀뚜라미 소리', '비행기 소리', '청소기 소리', '중지'];
  const timer = ['5분', '15분', '30분', '1시간', '초기화'];

  const [isNoiseModalVisible, setNoiseModalVisible] = useState(false);
  const [isTimerModalVisible, setTimerModalVisible] = useState(false);
  const [timeDuration, setTimeDuration] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [artworkUri, setArtworkUri] = useState<string | null>(null);
  const [temTitle, setTemTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNoise, setSelectedNoise] = useState<string>('중지');
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { setIsPlaying } = usePlayback();

  const toggleNoiseModal = () => {
    setNoiseModalVisible(!isNoiseModalVisible);
  };
  const toggleTimerModal = () => {
    setTimerModalVisible(!isTimerModalVisible);
  };


  useEffect(() => {
    console.log("로그 찍히냐: "+ timeDuration);
    
    if (timeDuration === null) {
      console.log("시간");
      return;
    }
    
    // Clear previous timer if exists
    if (timerId) {
      clearTimeout(timerId);
    }
    
    // Set up new timer
    const startTimer = (duration: any) => {
      const newTimerId = setTimeout(() => {
        setRemainingTime(0);
        setTimeDuration(null);
        setRemainingTime(null);
        console.log("Timer ended");
        TrackPlayer.pause();
        TrackPlayer.stop();
        setIsPlaying(false);
      }, duration);

      return newTimerId;
    }
  
    startTimer(timeDuration);
    
    // Clear timer on component unmount
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timeDuration]); // Depend on timeDuration

  const handleTimerSelect = (duration: string) => {
    console.log("시간:"+duration);
    
    if (timerId) {
      clearTimeout(timerId);
    }

    if (duration === '초기화') {
      setTimeDuration(null);
      setRemainingTime(null);
      toggleTimerModal();
      return;
    }

    const durationInMs = parseDuration(duration);
    // setDurationInMs(parseDuration(duration));
    console.log("우왕: "+ durationInMs);
    
    setTimeDuration(durationInMs);
    setRemainingTime(durationInMs);

    toggleTimerModal();

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime && prevTime > 1000) {
          return prevTime - 1000;
        } else {
          clearInterval(interval);
          return null;
        }
      });
    }, 1000);
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

  // 남은 시간을 분:초 형식으로 변환하는 함수
  const formatTime = (milliseconds: number | null): string => {
    if (!milliseconds || milliseconds <= 0) {
      return '';
    }

    const totalSeconds = Math.round(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  const handleNoiseSelect = (noise: string) => {
    if (sound) {
      // 이전에 재생 중이던 소리 멈춤
      sound.stop(() => {
        sound.release();
      });
      setSound(null); // sound 상태 초기화
    }

    if (noise === '중지') {
      setSelectedNoise('중지');
      toggleNoiseModal();
      console.log('Sound stop');
      return;
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
      setSelectedNoise(noise);
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

  // 음악이 바뀌게 될 시 화면 제어
  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      // 트랙 변경 시 실행될 코드
      navigation.navigate('PlayScreen', {
        album: album,
        song: event.track,
      });
      console.log('Active track changed to:', event.track);
    }
  });

    // 슬라이더 음악 업데이트
    // useEffect(() => {
    //   let interval: NodeJS.Timeout | undefined;  // interval을 undefined로 초기화
    
    //   if (isPlaying) {
    //     interval = setInterval(() => {
    //       TrackPlayer.getTrack.?.getCurrentTime(seconds => {
    //         setPlaybackPosition(seconds);
    //       });
    //     }, 1000);
    //   }
    //   return () => {
    //     if (interval) {  // interval이 정의된 경우에만 clearInterval 호출
    //       clearInterval(interval);
    //     }
    //   };
    // }, [isPlaying]);

    useEffect(() => {
      const loadArtwork = async () => {
        if (song && song.artwork) {
          setArtworkUri(song.artwork);
        }
        setIsLoading(false);
      };
      const loadTitle = async () => {
        if (song && song.title) {
          setTemTitle(song.title);
        }
        setIsLoading(false);
      }
      loadArtwork();
      loadTitle();
    }, [song]);
    

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={artworkUri ? { uri: artworkUri } : require('../../assets/images/Slumbus_Logo.png')} 
          style={styles.image} />
        <Text style={styles.titleText}>{temTitle ? temTitle : "제목 로딩 중"}</Text>
        <Text style={styles.text}>{album.kidName}</Text>
      </View>
      <SliderComponent bottomPlayer={false} />
      <View style={{marginVertical: 45}}>
        <PlayButtonBarContainer isPlaying={isPlaying} onPlayPress={playPress} />
      </View>
      <View style={styles.IconButtonContainer}>
        <IconButton
          IconLibrary="MaterialCommunityIcons"
          IconName="playlist-music"
          text="재생목록"
          onPress={() => navigation.navigate('PlaylistScreen', {
            album: album,
            song: song,
          })} />
        <IconButton 
          IconLibrary="MaterialIcons"
          IconName="lyrics"
          text="가사"
          onPress={() => navigation.navigate('LyricsScreen', {
            album: album,
            song: song,
          })}/>
        <IconButton
          IconLibrary="MaterialIcons"
          IconName="bedtime"
          text={remainingTime ? `${formatTime(remainingTime)}` : '타이머'}
          onPress={toggleTimerModal} />
        <IconButton IconLibrary="MaterialCommunityIcons" IconName="waveform" text="백색 소음" onPress={toggleNoiseModal} />
        <IconButton
          IconLibrary="MaterialIcons"
          IconName="add-reaction"
          text="자장가 반응 기록하기"
          onPress={() => navigation.navigate('ChildrenStack', {
            screen: 'ChildrenInfoReactionRegister',
            params: {
              songId: song.musicId, 
              kidId: song.kidId
            }
          })} />
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
        selectedElement={selectedNoise}
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
