import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { usePlayback } from '../../contexts/PlaybackContext';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';
import { RootStackParamList } from '../../navigation/HomeStack';
import { RouteProp, useRoute } from '@react-navigation/native';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'LyricsScreen'>;

const LyricsScreen: React.FC = ({navigation}: any) => {
  const route = useRoute<PlayScreenRouteProp>();
  const { album, song } = route.params;
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();
  const defaultImage = require('../../assets/images/Slumbus_Logo.png');

  return (
    <View style={styles.container}>
      <View style={styles.album}>
        <Image source={song.artwork ? { uri: song.artwork } : defaultImage} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{song.title}</Text>
          <Text style={styles.nameText}>{album.kidName}</Text>
        </View>
      </View>
      <View style={styles.lyricsContainer}>
        <ScrollView>
          {song.lyric ? 
            <Text style={styles.lyrics}>{song.lyric}</Text>
          :
            <Text style={styles.lyrics}>등록된 가사가 없습니다.</Text>
          }
        </ScrollView>
      </View>
      <View style={styles.playbackBar}>
        <SliderComponent bottomPlayer={false} />
        <PlayButtonBarContainer isPlaying={isPlaying} onPlayPress={playPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  album: {
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
  titleText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'SCDream5',
  },
  nameText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream4',
  },
  lyricsContainer: {
    height: 500,
  },
  lyrics: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream4',
    paddingHorizontal: 20,
    lineHeight: 25,
  },
  playbackBar: {
    bottom: 10,
    paddingHorizontal: 20,
  },
});

export default LyricsScreen;
