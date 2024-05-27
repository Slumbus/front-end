import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

import { RootStackParamList } from '../../navigation/HomeStack';
import { usePlayback } from '../../contexts/PlaybackContext';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';
import MusicItem from '../../components/play/MusicItem';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlaylistScreen'>;

interface Music {
  title: string;
  picture: string;
  lyrics: string;
}

export default function PlaylistScreen() {
  const route = useRoute<PlayScreenRouteProp>();
  const { album, song } = route.params;
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();

  const [musicList, setMusicList] = useState(album.Music);
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Music>) => {
      const isPlaying = item.title === song.title;
      return (
        <MusicItem 
          song={item} 
          isPlaying={isPlaying} 
          onLongPress={drag} // 드래그 시작을 위한 onLongPress 추가
        />
      );
    },
    [song]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.albumTitleText}>{album.albumname}</Text>
      <DraggableFlatList
        data={musicList}
        onDragEnd={({ data }) => setMusicList(data)}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  albumTitleText: {
    fontSize: 20,
    color: '#283882',
    fontFamily: 'SCDream6',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
  playbackBar: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
  },
});
