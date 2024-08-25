import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import axios from 'axios';

import AlbumTitleText from '../components/AlbumTitleText';
import AlbumJacket from '../components/AlbumJacket';
// import BottomPlayer from '../components/BottomPlayer';
import TrackPlayer, { RepeatMode, useTrackPlayerEvents, Event} from 'react-native-track-player';
import { usePlayback } from '../contexts/PlaybackContext';
import {getUserData} from '../utils/Store';
import SliderComponent from '../components/play/SliderComponent';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayButton from '../components/button/PlayButton';

const events = [
  Event.PlaybackActiveTrackChanged,
];

type Music = {
  userId: number;
  kidId: number;
  musicId: number;
  url: string;
  title: string;
  artwork: string;
  lyric: string | null;
};

type KidAlbum = {
  kidId: number;
  kidName: string;
  kidPicture: string;
  Music: Music[];
};

export default function HomeScreen({navigation}: any) {
  const [currentAlbum, setCurrentAlbum] = useState<any | undefined>();
  const [currentTrack, setCurrentTrack] = useState<Music | undefined>(undefined);
  const [childrenAlbumData, setChildrenAlbumData] = useState<KidAlbum[]>([]);

  const { isPlaying, playPress, setIsPlaying } = usePlayback();
  const [artworkUri, setArtworkUri] = useState<string | null>(null);
  const [temTitle, setTemTitle] = useState<string | null>(null);

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

  const fetchAlbumData = async () => {
    try {
      const token = await getUserData();
      const response = await axios.get('http://10.0.2.2:8080/api/song/home', { // 로컬 서버 연결
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // console.log(response.data.data);
      const data: KidAlbum[] = response.data.data.map((kid: any) => ({
        kidId: kid.kidId,
        kidName: kid.kidName,
        kidPicture: kid.kidPicture,
        Music: kid.musicList.map((music: any) => ({
          kidId: kid.kidId,
          musicId: music.musicId,
          url: music.url,
          title: music.title,
          artwork: music.artwork,
          lyric: music.lyric
        }))
      }));
      setChildrenAlbumData(data);
    } catch (error) {
      console.error('Error fetching album data', error);
    }
  };

  useEffect(() => {
    fetchAlbumData();
    if (currentAlbum && currentTrack) {
      setArtworkUri(currentTrack.artwork);
      setTemTitle(currentTrack.title);
    }
  }, [currentTrack]);


  const setSongList = async (index: number, songId: number) => {
    setCurrentAlbum(childrenAlbumData[index]);
    setCurrentTrack(childrenAlbumData[index].Music[songId]);
    setArtworkUri(childrenAlbumData[index].Music[songId].artwork);
    setTemTitle(childrenAlbumData[index].Music[songId].title);
    const addTrack = async () => {
      try {
        await TrackPlayer.reset();
        console.log('TrackPlayer 초기화 성공');
        await TrackPlayer.add(childrenAlbumData[index].Music);
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
      await TrackPlayer.play();
      setIsPlaying(true);
      navigation.navigate('PlayScreen', {
        album: childrenAlbumData[index],
        song: childrenAlbumData[index].Music[songId],
      });
      console.log('TrackPlayer 시작 성공');
      setCurrentTrack(childrenAlbumData[index].Music[songId]);
    } catch (error) {
      console.error('TrackPlayer 시작 오류:', error);
    }
  }

  const onPlayPause = () => {
    if (isPlaying === true) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else if (isPlaying === false) {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const findTrackInAlbum = (currentTrack : any): Music | undefined => {
    if (currentAlbum && currentTrack) {
      return currentAlbum.Music.find((track: { url: string; title: string; artwork: string; }) => 
        track.url === currentTrack.url && 
        track.title === currentTrack.title && 
        track.artwork === currentTrack.artwork
      );
    }
    return undefined;
  };

  const goFoward = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    // console.log(1, currentTrackIndex);
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const fowardTrack = await TrackPlayer.getTrack(currentTrackIndex + 1); 
      const matchedTrack = findTrackInAlbum(fowardTrack);
      // console.log(2, fowardTrack);
      if (fowardTrack !== null && fowardTrack && fowardTrack.title && fowardTrack.artwork) {
        await TrackPlayer.skipToNext();
        setCurrentTrack(matchedTrack);
        // console.log(3, '다음곡 넘김 성공');
      } else { // Queue의 마지막 곡일 때 예외처리
        await TrackPlayer.skip(0);
        const firstTrack = await TrackPlayer.getTrack(0);
        if (firstTrack && firstTrack.title && firstTrack.artwork) {
          const matchedTrack = findTrackInAlbum(fowardTrack);
          setCurrentTrack(matchedTrack);
          // console.log(4, '첫곡으로 이동 성공');
        }
      }
    }
  }

  const goBack = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
      const backTrack = await TrackPlayer.getTrack(currentTrackIndex - 1); // 첫번째 곡일 때 예외처리 필요
      if (backTrack !== null && backTrack && backTrack.title && backTrack.artwork) {
        const matchedTrack = findTrackInAlbum(backTrack);
        await TrackPlayer.skipToPrevious();
        setCurrentTrack(matchedTrack);
      } else { // Queue의 첫번째 곡일 때 예외처리
        const queue = await TrackPlayer.getQueue();
        const queueLength = queue.length
        await TrackPlayer.skip(queueLength - 1);
        const lastTrack = await TrackPlayer.getTrack(queueLength - 1);
        if (lastTrack && lastTrack.title && lastTrack.artwork) {
          const matchedTrack = findTrackInAlbum(backTrack);
          setCurrentTrack(matchedTrack);
        }
      }
    }
  }

  const getAlbumAndTrackFromCurrent = () => {
    if (currentAlbum && currentTrack) {
      const albumIndex = childrenAlbumData.findIndex(album => album.kidId === currentAlbum.kidId);
      if (albumIndex !== -1) {
        const trackIndex = childrenAlbumData[albumIndex].Music.findIndex(track => track.musicId === currentTrack.musicId);
        if (trackIndex !== -1) {
          return {
            album: childrenAlbumData[albumIndex],
            song: childrenAlbumData[albumIndex].Music[trackIndex],
          };
        }
      }
    }
    return null;
  };  

  const handlePlayScreenNavigation = () => {
    const albumAndTrack = getAlbumAndTrackFromCurrent();
    if (albumAndTrack) {
      navigation.navigate('PlayScreen', {
        album: albumAndTrack.album,
        song: albumAndTrack.song,
      });
    } else {
      console.error('앨범 또는 트랙을 찾을 수 없습니다.');
    }
  };

  const handlePlaylistScreenNavigation = () => {
    const albumAndTrack = getAlbumAndTrackFromCurrent();
    if (albumAndTrack) {
      navigation.navigate('PlaylistScreen', {
        album: albumAndTrack.album,
        song: albumAndTrack.song,
      });
    } else {
      console.error('앨범 또는 트랙을 찾을 수 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {childrenAlbumData.length === 0 ? 
        <View style={{alignItems: 'center', paddingVertical: 40}}>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 아이가 없습니다.</Text>
          <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>아이 목록 탭에서 아이를 등록해주세요!</Text>
        </View>
        :
          <View style={styles.albums}>
            {childrenAlbumData.map((album, albumIndex) => (
              <View key={albumIndex}>
                <AlbumTitleText imageSource={{ uri: album.kidPicture}} text= {album.kidName} />
                <View style={styles.jackets}>
                  {album.Music.map((song, songIndex) => (
                    <AlbumJacket 
                      key={songIndex}
                      imageSource={{ uri: song.artwork}} 
                      text={song.title} 
                      onPress={() => {setSongList(albumIndex, songIndex);}} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        }
      </ScrollView>
      { currentAlbum == null || currentTrack == null ? 
        <View />
      :
        <TouchableOpacity 
          onPress={handlePlayScreenNavigation}>
          <SliderComponent  bottomPlayer={true} />
          <View style={styles.playcontainer}>
            <View style={styles.albumContainer}>
              <View style={styles.imageContainer}>
                <Image 
                  source={artworkUri ? { uri: artworkUri } : require('../assets/images/Slumbus_Logo.png')}
                  style={styles.image} />
              </View>
              <Text style={styles.text}>{temTitle ? temTitle : "제목 로딩 중"}</Text>
            </View>
            <View style={styles.playButtonContainer}>
              <TouchableOpacity onPress={goBack}>
                <Icon name="play-skip-back" size={20} color={'#283882'} />
              </TouchableOpacity>
              <PlayButton isPlaying={isPlaying} onPress={() => {playPress(); onPlayPause();}} size={40} />
              <TouchableOpacity onPress={goFoward}>
                <Icon name="play-skip-forward" size={20} color={'#283882'} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{marginLeft: 8}} 
                onPress={handlePlaylistScreenNavigation}>
                <MCIcon name="playlist-music" size={28} color="#283882"/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      }
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

  
  playcontainer: {
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
});
