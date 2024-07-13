import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AlbumPhotoSelectModal from '../../components/modal/AlbumPhotoSelectModal';
import MusicSaveModal from '../../components/modal/MusicSaveModal';
import axios from 'axios';

export default function MelodySaveScreen({navigation}: any) {
  const [musicTitle, setMusicTitle] = useState('');
  // const [musicFile, setMusicFile] = useState<any>(null); // 음악 파일
  const [imageFile, setImageFile] = useState<any>(null); // 이미지 파일
  const [kidId, setKidId] = useState<number>(6); // 임의 값 설정
  const musicFile = { // 임의 값 전달
    uri: require('../../assets/audio/Lemon.mp3'),
    fileName: 'sample-music.mp3',
    type: 'audio/mp3',
  };
  const token = ``; // 로그인 기능 구현 후 수정 필요



  const handleSave = async () => {
    const formData = new FormData();
    formData.append('musicDTO', JSON.stringify({ kidId, title: musicTitle }));
    formData.append('musicFile', {
      uri: musicFile.uri,
      name: musicFile.fileName,
      type: musicFile.type,
    });
    formData.append('image', {
      uri: imageFile.uri,
      name: imageFile.fileName,
      type: imageFile.type,
    });
    // console.log(formData);
    try {
      const response = await axios.post('http://10.0.2.2:8080/api/song/composition', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Upload Response:', response.data);
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>허밍 선택</Text>
      </View>
      <View style={styles.musicTrackContainer}>
        <Text>트랙 재생바 들어가야 함</Text>
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
        <TouchableOpacity style={[styles.selectBtn, {marginRight: 20}]}>
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
    marginBottom: 50,
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
});