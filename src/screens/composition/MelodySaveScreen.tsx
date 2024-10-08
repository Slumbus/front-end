import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AlbumPhotoSelectModal from '../../components/modal/AlbumPhotoSelectModal';
import MusicSaveModal from '../../components/modal/MusicSaveModal';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '../../navigation/ComposeStack';
import { getUserData } from '../../utils/Store';
import {API_URL} from '@env';

type MelodySaveScreenRouteProp = RouteProp<RootStackParamList, 'MelodySaveScreen'>;

export default function MelodySaveScreen({navigation}: any) {
  const route = useRoute<MelodySaveScreenRouteProp>();
  const {kidId, url} = route.params;
  
  const [musicTitle, setMusicTitle] = useState('');
  const [imageFile, setImageFile] = useState<any>(null); // 이미지 파일

  const [sound, setSound] = useState<Sound | undefined>(); // 자장가 파일
  const [position, setPosition] = useState(0); // 음악 재생 지점 
  const [duration, setDuration] = useState(0); // 음악 길이
  const [isPlaying, setIsPlaying] = useState(false); // 재생 여부

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('musicDTO', JSON.stringify({ kidId: kidId, music: url, title: musicTitle }));
      if (imageFile) {
        formData.append('image', {
          uri: imageFile.uri,
          name: imageFile.fileName,
          type: imageFile.type,
        });
      } else {
        formData.append('image', null);
      }
      const token = await getUserData();
      const response = await axios.post(`${API_URL}/api/song/composition`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }); 
      console.log('Upload Response:', response.data);
      // navigation.navigate('HomeStack', { screen: 'HomeScreen' });
      
      console.log('음악 Id: '+response.data.data.id);
      return response.data.data.id;
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  // 사운드 초기화 및 duration 가져오기
  useEffect(() => {
    const initializeSound = () => {
      if (!url) return;
      const newSound = new Sound(url, '', (error) => {
        if (error) {
          console.log('음악 불러오기 실패', error);
          return;
        }
        // duration을 가져올 때까지 대기
        const checkDuration = () => {
          const duration = newSound.getDuration();
          if (duration > 0) {
            setDuration(duration);
          } else {
            // 일정 시간 후 다시 체크
            setTimeout(checkDuration, 100);
          }
        };
        setSound(newSound);
        setDuration(newSound.getDuration()); // duration 값 설정
      });
    };

    initializeSound();

    // 컴포넌트 unmount 시 사운드 해제
    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [url]);

  //음악 재생 동작
  const playSound = (filePath: string | null) => {
    if (!filePath) return;
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('음악 재생 성공');
        } else {
          console.log('음악 재생 실패');
        }
        setIsPlaying(false);
        setPosition(0);
      });
      setIsPlaying(true);
    } else {
      const newSound = new Sound(filePath, '', error => {
        if (error) {
          console.log('음악 불러오기 실패', error);
          return;
        }
        setSound(newSound);
        setDuration(newSound.getDuration());
        setIsPlaying(true);
        newSound.play(success => {
          if (success) {
            console.log('음악 재생 성공');
          } else {
            console.log('음악 재생 실패');
          }
          setIsPlaying(false);
          setPosition(0);
        });
      });
    }
  };

  //음악 정지
  const stopSound = () => {
    if (sound) {
      sound.pause(() => {
        sound.getCurrentTime(seconds => {
          setPosition(seconds);
        });
      });
      setIsPlaying(false);
    }
  };

  // Update position regularly
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;  // interval을 undefined로 초기화
    if (isPlaying && sound) {
      interval = setInterval(() => {
        sound?.getCurrentTime(seconds => {
          setPosition(seconds);
        });
      }, 1000);
    }
    return () => {
      if (interval) {  // interval이 정의된 경우에만 clearInterval 호출
        clearInterval(interval);
      }
    };
  }, [isPlaying, sound]);

  //해당 스크린 벗어나면 음악 정지
  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [sound]);

  // 음악 분, 초로 변경
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return(
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>생성된 자장가 멜로디</Text>
      </View>
      <View style={styles.musicTrackContainer}>
        <TouchableOpacity onPress={async () => (isPlaying ? stopSound() : playSound(url))}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={28} color="#283882" />
        </TouchableOpacity>
        <Slider
          style={styles.playBar}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#283882"
          maximumTrackTintColor="#D9D9D9"
          onSlidingComplete={(value) => { 
            if (sound) {
              sound.setCurrentTime(value);
              setPosition(value);
              }
          }}
        />
      </View>
      <View style={styles.songTimeContainer}>
        <Text style={[styles.songTimeText, {marginLeft: 50, marginRight: 200,}]}>{formatTime(position)}</Text>
        <Text style={styles.songTimeText}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.albumContainer}>
        <View style={styles.musicTitleContainer}>
          <Image
            source={require('../../assets/images/edit_pencil.png')}
            style={styles.pencilStyle}
          />
          <TextInput
            style={styles.musicTitleInput}
            placeholder='제목을 입력해주세요.'
            value={musicTitle}
            onChangeText={setMusicTitle}
          />
        </View>
        <AlbumPhotoSelectModal setImageFile={setImageFile} />
      </View>
      <View style={styles.saveBtnContainer}>
        <TouchableOpacity style={[styles.selectBtn, {marginRight: 20}]} onPress={() => navigation.navigate('ChildSelectScreen')}>
          <Text style={styles.btnText}>다시 만들기</Text>
        </TouchableOpacity>
        <MusicSaveModal navigation={navigation} handleSave={handleSave}/>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal:35
  },
  infoContainer: {
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#4A4A4A',
  },
  musicTrackContainer:{
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  albumContainer:{
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 140,
  },
  musicTitleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pencilStyle:{
    width: 20,
    height: 20,
  },
  musicTitleInput: {
    width: 160,
    height: 25,
    marginLeft: 5,
    padding:1,
    borderBottomWidth: 1,
    borderBottomColor: '#283882',
    fontSize: 14,
    fontFamily: 'SCDream4',
  },
  albumPhotoBtnContainer:{
    width: 200,
    height: 200,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumPhotoSelectImage: {
    width: 50,
    height: 50,
  },
  saveBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtn:{
    width: 135,
    height: 35,
    borderRadius: 50,
    backgroundColor: '#283882',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  btnText:{
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SCDream5',
  },

  playBar: {
    flex: 1,
  },
  songTimeContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  songTimeText: {
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000000',
  },
});