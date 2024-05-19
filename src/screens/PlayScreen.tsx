import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

import { RootStackParamList } from '../navigation/HomeStack';

import IconButton from '../components/IconButton';
import ShuffleButton from '../components/ShuffleButton';
import PlayButton from '../components/PlayButton';
import RepeatButton from '../components/RepeatButton';
import PlayModal from '../components/PlayModal';

// const audioFile = require('../assets/audio/Lemon.mp3');

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlayScreen'>;  // 더미데이터 값 직접 전달, api 연결 시 수정

const PlayScreen: React.FC = () => {
  const route = useRoute<PlayScreenRouteProp>();
  const { picture, name, title } = route.params;

  const noise = ['빗소리', '파도 소리', '귀뚜라미 소리', '공기 청정기 소리', '비행기 소리', '청소기 소리'];
  const timer = ['5분', '15분', '30분', '1시간'];

  const [isNoiseModalVisible, setNoiseModalVisible] = useState(false);
  const [isTimerModalVisible, setTimerModalVisible] = useState(false);

  const toggleNoiseModal = () => {
    setNoiseModalVisible(!isNoiseModalVisible);
  };
  const toggleTimerModal = () => {
    setTimerModalVisible(!isTimerModalVisible);
  };

  const handlePress = () => {
    console.log('Button clicked');
  };

  // const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  // const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   loadAudio();

  //   return () => {
  //     if (sound) {
  //       sound.unloadAsync();
  //     }
  //   };
  // }, [audioFile]);

  // const loadAudio = async () => {
  //   try {
  //     const { sound } = await Audio.Sound.createAsync(audioFile, {shouldPlay: false,});
  //     setSound(sound);

  //     const status  = await sound.getStatusAsync();
  //     if (status.isLoaded && 'durationMillis' in status) {
  //       // setDuration(status.durationMillis / 1000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const playPress = () => {
    if (isPlaying) {
      // try {
      //   if (sound) {
      //     await sound.pauseAsync();
          setIsPlaying(false);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      // try {
      //   if (sound) {
      //     await sound.playAsync();
          setIsPlaying(true);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    }
  };

  // const handleSliderValueChange = async (value: number) => {
    // try {
    //   if (sound) {
    //     await sound.setPositionAsync(value * duration * 1000);
    //     setPlaybackPosition(value * duration);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  // };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (sound && isPlaying) {
  //       const status = await sound.getStatusAsync();
  //       if (status.isLoaded && 'positionMillis' in status) {
  //         setPlaybackPosition(status.positionMillis / 1000);
  //       }
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [sound, isPlaying]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{uri:picture}} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View>
        <Slider //고정 값 추후 수정
          style={{ width: 320 }}
          value={playbackPosition}
          onValueChange={(playbackPosition) => setPlaybackPosition(playbackPosition)}
          maximumValue={200}
          minimumValue={0}
          step={1}
          minimumTrackTintColor="#283882"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#283882"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
          <Text style={styles.text}>{formatTime(playbackPosition)}</Text>
          <Text style={styles.text}>{formatTime(200)}</Text>
        </View>
      </View>
      <View style={styles.playButtonBarContainer}>
        <ShuffleButton onPress={handlePress} />
        <View style={styles.playButtonContainer}>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="play-skip-back" size={30} color={'#283882'} />
          </TouchableOpacity>
          <PlayButton isPlaying={isPlaying} onPress={playPress} size={70}/>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="play-skip-forward" size={30} color={'#283882'} />
          </TouchableOpacity>
        </View>
        <RepeatButton onPress={handlePress}/>
      </View>
      <View style={styles.IconButtonContainer}>
        <IconButton IconLibrary="MaterialCommunityIcons" IconName="playlist-music" text="재생목록" onPress={handlePress} />
        <IconButton IconLibrary="MaterialIcons" IconName="lyrics" text="가사" onPress={handlePress} />
        <IconButton IconLibrary="MaterialIcons" IconName="bedtime" text="타이머" onPress={toggleTimerModal} />
        <IconButton IconLibrary="MaterialCommunityIcons" IconName="waveform" text="백색 소음" onPress={toggleNoiseModal} />
        <IconButton IconLibrary="MaterialIcons" IconName="add-reaction" text="자장가 반응 기록하기" onPress={handlePress} />
      </View>
      <PlayModal
        isVisible={isTimerModalVisible}
        onClose={toggleTimerModal}
        title="취침 타이머"
        elements={timer}
      />
      <PlayModal
        isVisible={isNoiseModalVisible}
        onClose={toggleNoiseModal}
        title="백색 소음"
        elements={noise}
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
    width: 290,
    height: 290,
    borderRadius: 5,
  },
  titleContainer:{
    marginVertical: 15,
  },
  titleText:{
    marginTop: 5,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'SCDream5',
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream4',
  },
  playButtonBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 25,
    marginVertical: 35,
  },
  playButtonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  IconButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default PlayScreen;
