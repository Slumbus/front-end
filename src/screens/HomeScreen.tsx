import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import AlbumTitleText from '../components/AlbumTitleText';
import AlbumJacket from '../components/AlbumJacket';
import BottomPlayer from '../components/BottomPlayer';
import TrackPlayer, { RepeatMode, useTrackPlayerEvents, Event} from 'react-native-track-player';


const events = [
  Event.PlaybackActiveTrackChanged,
];

export default function HomeScreen({navigation}: any) {
  const [currentAlbum, setCurrentAlbum] = useState<any | undefined>();
  const [curremtTrack, setCurrentTrack] = useState<any | undefined>();

  const ChildrenAlbumdata = [
    {
      id: 0,
      picture: "https://cdn.pixabay.com/photo/2015/05/20/14/23/baby-775503_1280.jpg",
      name: "사랑이",
      albumname: "사랑이 자장가 모음",
      Music: 
      [
        {
        id: 0,
        title: "트랙1",
        artwork: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
        url: 'https://sample-music.netlify.app/death%20bed.mp3',
        lyrics: "트랙1 가사",
        },
        {
        id: 1,
        title: "트랙2",
        artwork: "https://cdn.pixabay.com/photo/2022/11/16/13/39/cuddly-toys-7596017_1280.jpg",
        url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
        lyrics: "빛 좋은 개살구.\n호랑이 그리려다 고양이 그린다.",
        },
        {
        id: 2,
        title: "트랙3",
        artwork: "https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467761_1280.jpg",
        url: 'https://sample-music.netlify.app/Faded.mp3',
        lyrics: "병 주고 약 준다.\n보기 좋은 떡이 먹기도 좋다.",
        },
        {
        id: 3,
        title: "트랙4",
        artwork: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
        url: 'https://sample-music.netlify.app/death%20bed.mp3',
        lyrics: "열 길 물속은 알아도 한 길 사람 속은 모른다.\n백지장도 맞들면 낫다.",
        },
        {
        id: 4,
        title: "트랙5",
        artwork: "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_1280.jpg",
        url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
        lyrics: "배보다 배꼽이 더 크다.\n호랑이 그리려다 고양이 그린다.",
        },
      ]
    },
    {
      id: 1,
      picture: "https://cdn.pixabay.com/photo/2016/01/20/11/11/baby-1151351_1280.jpg",
      name: "행복이",
      albumname: "행복 쿨쿨",
      Music: [
        {
        id: 0,
        title: "2트랙1",
        artwork: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
        url: 'https://sample-music.netlify.app/Without%20Me.mp3',
        lyrics: "바늘 도둑이 소 도둑 된다.\n믿는 도끼에 발등 찍힌다.",
        },
        {
        id: 1,
        title: "2트랙2",
        artwork: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
        url: 'https://sample-music.netlify.app/Without%20Me.mp3',
        lyrics: "열 길 물속은 알아도 한 길 사람 속은 모른다.\n호랑이 그리려다 고양이 그린다.",
        },
        {
        id: 2,
        title: "2트랙3",
        artwork: "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_1280.jpg",
        url: 'https://sample-music.netlify.app/Without%20Me.mp3',
        lyrics: "목구멍이 포도청\n밑 빠진 독에 물 붓기",
        },
      ]
    },
    {
      id: 2,
      picture: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
      name: "행운이",
      albumname: "행운 가득",
      Music: [
        {
        id: 0,
        title: "3트랙1",
        artwork: "https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467761_1280.jpg",
        url: 'https://sample-music.netlify.app/Solo.mp3',
        lyrics: "마른 하늘에 날벼락\n등잔 밑이 어둡다",
        },
        {
        id: 1,
        title: "3트랙2",
        artwork: "https://cdn.pixabay.com/photo/2022/11/16/13/39/cuddly-toys-7596017_1280.jpg",
        url: 'https://sample-music.netlify.app/Solo.mp3',
        lyrics: "되로 주고 말로 받는다\n땅 짚고 헤엄치기",
        },
      ]
    },
  ];

  const setSongList = async (index: number, songId: number) => {
    setCurrentAlbum(ChildrenAlbumdata[index]);
    const addTrack = async () => {
      try {
        await TrackPlayer.reset();
        console.log('TrackPlayer 초기화 성공');
        
        await TrackPlayer.add(ChildrenAlbumdata[index].Music);
        await TrackPlayer.setRepeatMode(RepeatMode.Off); // Off: 큐 반복 재생x, track: 한곡만 재생, Queue 전체 목록 재생
        const mode = await TrackPlayer.getRepeatMode();
        console.log(mode);
        
      } catch (error) {
        console.error('TrackPlayer 초기화 오류:', error);
      }
    };
  
    await addTrack();
    
    try {
      await TrackPlayer.skip(songId);
      const index = await TrackPlayer.getActiveTrackIndex();
      await TrackPlayer.play();
      console.log('TrackPlayer 시작 성공');
      setCurrentTrack(index);
      
    } catch (error) {
      console.error('TrackPlayer 시작 오류:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.albums}>
          {ChildrenAlbumdata.map((album) => (
            <View key={album.albumname}>
              <AlbumTitleText imageSource={{ uri: album.picture}} text1= {album.name} text2={album.albumname} />
              <View style={styles.jackets}>
                {album.Music.map((song) => (
                  <AlbumJacket 
                  key={song.id} 
                  imageSource={{ uri: song.artwork}} 
                  text={song.title} 
                  onPress={() => {navigation.navigate('PlayScreen', { // 더미데이터 값 직접 전달, api 연결 시 수정
                    album: album,
                    song: song,
                    // trackData:  //추후 여기에 앨범 트랙 데이터 넘겨주어야 함.
                  }); setSongList(album.id, song.id);}} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomPlayer 
        song={ChildrenAlbumdata[0].Music[0]} // 고정 값 직접 전달, api 연결 시 수정
        onPress={()=>navigation.navigate('PlayScreen', {
          album: currentAlbum.albumname,
          song: currentAlbum.Music[curremtTrack]})} 
        listPress={()=>navigation.navigate('PlaylistScreen', {
          album: currentAlbum,
          song: currentAlbum.Music[curremtTrack]})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24, 
    paddingTop: 5,
  },
  albums: {
    marginBottom: 20,
  },
  jackets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
