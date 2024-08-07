import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShuffleButton from '../../components/button/ShuffleButton';
import PlayButton from '../../components/button/PlayButton';
import RepeatButton from '../../components/button/RepeatButton';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { usePlayback } from '../../contexts/PlaybackContext';

interface PlayButtonBarContainerProps {
  isPlaying: boolean;
  onPlayPress: () => void;
}

const PlayButtonBarContainer: React.FC<PlayButtonBarContainerProps> = ({
  isPlaying,  //Boolean 으로 넘어옴 false: 재생x, ture: 재생
  onPlayPress,
}, trackData ) => {

  const { setIsPlaying } = usePlayback();

  const returnPlayBtn = () => {
    switch (isPlaying) {
      case true:
        return <Icon color="#fff" name="pause" size={45} />;
      case false:
        return <Icon color="#fff" name="play-arrow" size={45} />;
      default:
        return <ActivityIndicator size={45} color="#fff" />;
    }
  };

  const onPlayPause = () => {
    if (isPlaying === true) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else if (isPlaying === false) {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const goFoward = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const fowardTrack = await TrackPlayer.getTrack(currentTrackIndex + 1); 
      if (fowardTrack !== null && fowardTrack !== undefined) {
        await TrackPlayer.skipToNext();
      } else { // Queue의 마지막 곡일 때 예외처리
        await TrackPlayer.skip(0);
        const firstTrack = await TrackPlayer.getTrack(0);
      }
    }
  }

  const goBack = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const backTrack = await TrackPlayer.getTrack(currentTrackIndex - 1);
      if (backTrack !== null && backTrack !== undefined) {
        await TrackPlayer.skipToPrevious();
      } else { // Queue의 첫번째 곡일 때 예외처리
        const queue = await TrackPlayer.getQueue();
        const queueLength = queue.length
        await TrackPlayer.skip(queueLength - 1);
        const lastTrack = await TrackPlayer.getTrack(queueLength - 1);
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* <ShuffleButton onPress={onShufflePress} /> */}
      <View style={{width: 30, height: 30}} />
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={() => {goBack(); }}>
          <Icon name="play-skip-back" size={30} color={'#283882'} />
        </TouchableOpacity>
        <PlayButton isPlaying={isPlaying} onPress={() => {onPlayPress(); onPlayPause();}} size={70} />
        <TouchableOpacity onPress={() => {goFoward(); }}>
          <Icon name="play-skip-forward" size={30} color={'#283882'} />
        </TouchableOpacity>
      </View>
      <RepeatButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 25,
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
});

export default PlayButtonBarContainer;
