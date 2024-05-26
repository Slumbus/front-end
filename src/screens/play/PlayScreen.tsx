import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { Audio } from 'expo-av';

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
  const { picture, name, title } = route.params;
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();

  const noise = ['빗소리', '파도 소리', '귀뚜라미 소리', '공기 청정기 소리', '비행기 소리', '청소기 소리'];
  const timer = ['5분', '15분', '30분', '1시간'];

  const [isNoiseModalVisible, setNoiseModalVisible] = useState(false);
  const [isTimerModalVisible, setTimerModalVisible] = useState(false);
  // const [duration, setDuration] = useState(0);
  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  const toggleNoiseModal = () => {
    setNoiseModalVisible(!isNoiseModalVisible);
  };
  const toggleTimerModal = () => {
    setTimerModalVisible(!isTimerModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{uri:picture}} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <SliderComponent //고정 값 추후 수정
        playbackPosition={playbackPosition}
        setPlaybackPosition={setPlaybackPosition}
        maximumValue={200}
      />
      <View style={{marginVertical: 45}}>
        <PlayButtonBarContainer
          isPlaying={isPlaying}
          onPlayPress={playPress}
          onShufflePress={handlePress}
          onPreviousPress={handlePress}
          onNextPress={handlePress}
          onRepeatPress={handlePress}
        />
      </View>
      <View style={styles.IconButtonContainer}>
        <IconButton IconLibrary="MaterialCommunityIcons" IconName="playlist-music" text="재생목록" onPress={() => navigation.navigate('PlaylistScreen')} />
        <IconButton IconLibrary="MaterialIcons" IconName="lyrics" text="가사" onPress={() => navigation.navigate('LyricsScreen')} />
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
    fontWeight: 'bold',
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
