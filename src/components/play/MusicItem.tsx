import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Music {
  id: number;
  title: string;
  artwork: string;
  url: string;
  lyrics: string;
}

interface MusicItemProps {
  song: Music;
  isPlaying: boolean;
  onLongPress: () => void;
  onPress: () => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ song, isPlaying, onLongPress, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.container, isPlaying && styles.playingContainer]}>
      <View style={styles.albumContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: song.artwork }} style={[styles.image, isPlaying && styles.playingImage]} />
          {isPlaying && (
              <Animatable.View 
                animation="tada"
                iterationCount="infinite" 
                style={styles.playingIconContainer}
              >
                <Icon name="music-note" size={25} color="#283882" />
              </Animatable.View>
            )}
        </View>
        <Text style={[styles.text, isPlaying && styles.playingText]}>{song.title}</Text>
      </View>
      <Icon name="menu" size={30} color="#283882"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playingContainer: {
    backgroundColor: '#C6DDF7',
    borderRadius: 10,
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
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
    opacity: 0.6,
  },
  playingIconContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream5',
  },
  playingText: {
    color: '#283882',
  },
})

export default MusicItem;