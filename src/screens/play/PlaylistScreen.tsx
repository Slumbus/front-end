import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import TrackPlayer from 'react-native-track-player';

import { RootStackParamList } from '../../navigation/HomeStack';
import { usePlayback } from '../../contexts/PlaybackContext';
import SliderComponent from '../../components/play/SliderComponent';
import PlayButtonBarContainer from '../../components/play/PlayButtonBarContainer';
import MusicItem from '../../components/play/MusicItem';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlaylistScreen'>;

interface Music {
  id: number;
  title: string;
  artwork: string;
  url: string;
  lyrics: string;
}

export default function PlaylistScreen({navigation}: any) {
  const route = useRoute<PlayScreenRouteProp>();
  const { album, song } = route.params;
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();

  const [musicList, setMusicList] = useState(album.Music);

  const onTrackSelect = async (song:Music) => {
    await TrackPlayer.skip(song.id);
    const SelectTrack = await TrackPlayer.getTrack(song.id); 
    navigation.navigate('PlayScreen', {
      album: album,
      song: SelectTrack,
    });
  };

  // const onDragEnd = async (data) => {
  //   setMusicList(data);
  //   큐재설정 함수 추가
  // };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Music>) => {
      const isPlaying = item.title === song.title;
      return (
        <MusicItem 
          song={item} 
          isPlaying={isPlaying} 
          onLongPress={drag} // 드래그 시작을 위한 onLongPress 추가
          onPress={() => onTrackSelect(item)} 
        />
      );
    },
    [song]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.albumTitleText}>{album.albumname}</Text>
      <DraggableFlatList
        style={styles.listContainer}
        data={musicList}
        // onDragEnd={({ data }) => onDragEnd(data)}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
      <View style={styles.playbackBar}>
        <SliderComponent playbackPosition={playbackPosition} setPlaybackPosition={setPlaybackPosition} maximumValue={200} />
        <PlayButtonBarContainer
          isPlaying={isPlaying}
          onPlayPress={playPress}
          onShufflePress={handlePress}
          onRepeatPress={handlePress}
          album={album}
          song={song}
          navigation={navigation}
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
  listContainer: {
    paddingHorizontal: 30,
    height: 535,
  },
  playbackBar: {
    bottom: 10,
    paddingHorizontal: 20,
  },
});
