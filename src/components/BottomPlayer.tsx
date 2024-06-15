import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import { usePlayback } from '../contexts/PlaybackContext';
import PlayButton from './button/PlayButton';


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
          <TouchableOpacity onPress={handlePress}>
            <Icon name="play-skip-back" size={20} color={'#283882'} />
          </TouchableOpacity>
          <PlayButton isPlaying={isPlaying} onPress={playPress} size={40} />
          <TouchableOpacity onPress={handlePress}>
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