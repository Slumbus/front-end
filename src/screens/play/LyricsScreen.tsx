import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlayback } from '../../contexts/PlaybackContext';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';

const LyricsScreen: React.FC = () => {
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();

  return (
    <View style={styles.container}>
      <Text style={styles.lyrics}>잘 자라 우리 사랑이{"\n"}가사가사가사가사가사가사가사{"\n"}가사 가사 가사 가사 가사{"\n"}가사 가사 가사 가사{"\n"}가사가사가사가사 가사{"\n"}가사 가사 가사 가사{"\n"}가사가사{"\n"}잘자라 우리 사랑이</Text>
      <View style={styles.playbackBar}>
        <SliderComponent playbackPosition={playbackPosition} setPlaybackPosition={setPlaybackPosition} maximumValue={200} />
        <PlayButtonBarContainer
          isPlaying={isPlaying}
          onPlayPress={playPress}
          onShufflePress={handlePress}
          onPreviousPress={handlePress}
          onNextPress={handlePress}
          onRepeatPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lyrics: {
    fontSize: 14,
    color: '#000',
    marginVertical: 20,
    fontFamily: 'SCDream4',
    paddingHorizontal: 20,
    lineHeight: 25,
  },
  playbackBar: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
  },
});

export default LyricsScreen;
