import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import { usePlayback } from '../contexts/PlaybackContext';
import PlayButton from './button/PlayButton';
import TrackPlayer from 'react-native-track-player';


interface Music {
  id: number;
  title: string;
  artwork: string;
  url: string;
  lyrics: string;
}

interface BottomPlayerProps {
  song: Music;
  onPress : () => void;
  listPress : () => void;
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({ song, onPress, listPress }) => {
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback(); //임시 호출

  const goFoward = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const fowardTrack = await TrackPlayer.getTrack(currentTrackIndex + 1); 
      if (fowardTrack !== null && fowardTrack !== undefined) {
        await TrackPlayer.skipToNext();
        // navigation.navigate('PlayScreen', {
        //   album: album,
        //   song: fowardTrack,
        // });
      } else { // Queue의 마지막 곡일 때 예외처리
        await TrackPlayer.skip(0);
        const firstTrack = await TrackPlayer.getTrack(0);
        // navigation.navigate('PlayScreen', {
        //   album: album,
        //   song: firstTrack,
        // });
      }
      
    }
  }

  const goBack = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const backTrack = await TrackPlayer.getTrack(currentTrackIndex - 1); // 첫번째 곡일 때 예외처리 필요
      if (backTrack !== null && backTrack !== undefined) {
        await TrackPlayer.skipToPrevious();
        // navigation.navigate('PlayScreen', {
        //   album: album,
        //   song: backTrack,
        // });
      } else { // Queue의 첫번째 곡일 때 예외처리
        const queue = await TrackPlayer.getQueue();
        const queueLength = queue.length
        await TrackPlayer.skip(queueLength - 1);
        const lastTrack = await TrackPlayer.getTrack(queueLength - 1);
        // navigation.navigate('PlayScreen', {
        //   album: album,
        //   song: lastTrack,
        // });
      }
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Slider
        style={{ marginHorizontal: -40 }}
        value={playbackPosition}
        onValueChange={setPlaybackPosition}
        maximumValue={200}
        minimumValue={0}
        step={1}
        minimumTrackTintColor="#283882"
        maximumTrackTintColor="#D9D9D9"
        thumbTintColor="#283882"
      />
      <View style={styles.container}>
        <View style={styles.albumContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: song.artwork }} style={styles.image} />
          </View>
          <Text style={styles.text}>{song.title}</Text>
        </View>
        <View style={styles.playButtonContainer}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="play-skip-back" size={20} color={'#283882'} />
          </TouchableOpacity>
          <PlayButton isPlaying={isPlaying} onPress={playPress} size={40} />
          <TouchableOpacity onPress={goFoward}>
            <Icon name="play-skip-forward" size={20} color={'#283882'} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 8}} onPress={listPress}>
            <MCIcon name="playlist-music" size={28} color="#283882"/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 7,
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream5',
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',
  },
})

export default BottomPlayer;