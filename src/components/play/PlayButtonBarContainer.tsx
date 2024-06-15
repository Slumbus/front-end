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

interface PlayButtonBarContainerProps {
  isPlaying: boolean;
  onPlayPress: () => void;
  onShufflePress: () => void;
  onPreviousPress: () => void;
  onNextPress: () => void;
  onRepeatPress: () => void;
  album: any;
  song: any;
  navigation: any;
}

const PlayButtonBarContainer: React.FC<PlayButtonBarContainerProps> = ({
  isPlaying,  //Boolean 으로 넘어옴 false: 재생x, ture: 재생
  onPlayPress,
  onShufflePress,
  onPreviousPress,
  onNextPress,
  onRepeatPress,
  album,
  song,
  navigation,
}, trackData ) => {
  // const playbackState: any = usePlaybackState();
  // // const isTrackPlaying = useRef('paused'); //paused play loading

  // useEffect(() => {
  //   console.log('Player State', playbackState);

  //   //set the player state
  //   if (playbackState === true || playbackState === 3) {
  //     isPlaying = true;
  //   } else if (playbackState === false || playbackState === 2) {
  //     isPlaying = false;
  //   } else {
  //     // isPlaying.current = 'loading';
  //   }
  // }, [playbackState]);

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
    if (isPlaying === false) {
      TrackPlayer.pause();
    } else if (isPlaying === true) {
      TrackPlayer.play();
    }
  };

  const goFoward = async () => {
    const fowardTrack = await TrackPlayer.getTrack(song.id); // 마지막 곡일 때 예외처리 필요
    TrackPlayer.skipToNext();
    navigation.navigate('PlayScreen', {
      album: album,
      song: fowardTrack,
    });
  }

  const goBack = async () => {
    const backTrack = await TrackPlayer.getTrack(song.id-2); // 첫번째 곡일 때 예외처리 필요
    TrackPlayer.skipToPrevious()
    navigation.navigate('PlayScreen', {
      album: album,
      song: backTrack,
    });
  }

  return (
    <View style={styles.container}>
      <ShuffleButton onPress={onShufflePress} />
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={() => {goBack(); }}>
          <Icon name="play-skip-back" size={30} color={'#283882'} />
        </TouchableOpacity>
        <PlayButton isPlaying={isPlaying} onPress={() => {onPlayPress(); onPlayPause();}} size={70} />
        <TouchableOpacity onPress={() => {goFoward(); }}>
          <Icon name="play-skip-forward" size={30} color={'#283882'} />
        </TouchableOpacity>
      </View>
      <RepeatButton onPress={onRepeatPress} />
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
