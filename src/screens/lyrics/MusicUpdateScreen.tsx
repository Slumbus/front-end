import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AlbumPhotoSelectModal from '../../components/modal/AlbumPhotoSelectModal';
import axios from 'axios';
import { getUserData } from '../../utils/Store';

export default function MusicUpdateScreen({route, navigation}: any) {
  const { songId } = route.params;
  const [data, setData] = useState(null);
  
  const [musicTitle, setMusicTitle] = useState('');
  const [imageFile, setImageFile] = useState<any>(null); // 새 이미지 파일
  const [imageSource, setImageSource] = useState(''); // 기존 앨범 이미지

  useEffect(() => {
    async function fetchData() {
      const token = await getUserData();
      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/song/detail/${songId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setMusicTitle(response.data.data.title);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    }

    fetchData();
  }, [songId]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('musicDTO', JSON.stringify({ title: musicTitle }));
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
      const response = await axios.put(`http://10.0.2.2:8080/api/song/${songId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }); 
      console.log('Upload Response:', response.data);
      navigation.navigate('SelectLyricWritingList');
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.infoContainer} />
      <View style={styles.albumContainer}>
        <View style={styles.musicTitleContainer}>
          <Image
            source={require('../../assets/images/edit_pencil.png')}
            style={styles.pencilStyle}
          />
          {data && (
            <TextInput
              style={styles.musicTitleInput}
              value={musicTitle}
              onChangeText={setMusicTitle}
            />
          )}
        </View>
        <AlbumPhotoSelectModal setImageFile={setImageFile} />
      </View>
      <View style={styles.saveBtnContainer}>
        <TouchableOpacity style={styles.selectBtn} onPress={handleSave}>
          <Text style={styles.btnText}>저장</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 35,
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