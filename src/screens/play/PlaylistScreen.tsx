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
  const [curremtTrack, setCurrentTrack] = useState<any>(song);
  const [musicList, setMusicList] = useState<Music[]>(album.Music);
  const { isPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress } = usePlayback();

  const onTrackSelect = async (song:Music) => {
    await TrackPlayer.skip(song.id);
    const SelectTrack = await TrackPlayer.getTrack(song.id); 
    setCurrentTrack(SelectTrack);
    navigation.navigate('PlayScreen', { // 리스트로 이동 시 재생 화면 새로고침 필요
      album: album,
      song: SelectTrack,
    });
  };

  // 순서 편집 함수
  // const onDragEnd = async (data:Music[]) => {
  //   console.log(data);
  //   await TrackPlayer.setQueue(data);
  //   setMusicList(data);
  // };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Music>) => {
      const isPlaying = item.id === curremtTrack?.id;
      return (
        <MusicItem 
          song={item} 
          isPlaying={isPlaying} 
          onLongPress={drag} // 드래그 시작을 위한 onLongPress 추가
          onPress={() => onTrackSelect(item)} 
        />
      );
    },
    [curremtTrack]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.albumTitleText}>{album.name}</Text>
      <DraggableFlatList
        style={styles.listContainer}
        data={musicList}
        // onDragEnd={({ data }) => onDragEnd(data)}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
      <View style={styles.playbackBar}>
        <SliderComponent bottomPlayer={false} />
        <PlayButtonBarContainer isPlaying={isPlaying} onPlayPress={playPress} />
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
