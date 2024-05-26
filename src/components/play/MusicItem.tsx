import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Music {
  title: string;
  picture: string;
  lyrics: string;
}

interface MusicItemProps {
  song: Music;
  isPlaying: boolean;
  onLongPress: () => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ song, isPlaying, onLongPress }) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} style={styles.container}>
      <Animatable.Image
        animation={isPlaying ? "pulse" : undefined}
        iterationCount="infinite"
        source={{ uri: song.picture }}
        style={[styles.image, isPlaying && styles.playingImage]}
      />
      <Text style={[styles.text, isPlaying && styles.playingText]}>{song.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  playingImage: {
    borderColor: '#283882',
    borderWidth: 2,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'SCDream5',
  },
  playingText: {
    color: '#283882',
  },
})

export default MusicItem;