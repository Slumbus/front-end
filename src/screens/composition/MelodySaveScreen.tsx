import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AlbumPhotoSelectModal from '../../components/modal/AlbumPhotoSelectModal';
import MusicSaveModal from '../../components/modal/MusicSaveModal';

export default function MelodySaveScreen({navigation}: any) {

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
          placeholder='제목을 입력해주세요.'/>
        </View>
          
          {/* <TouchableOpacity style={styles.albumPhotoBtnContainer}>
            <Image
            source={require('../../assets/images/plus.png')}
            style={styles.albumPhotoSelectImage}
            />
          </TouchableOpacity> */}
        <AlbumPhotoSelectModal/> 
      </View>
      
      <View style={styles.saveBtnContainer}>
        <TouchableOpacity style={[styles.selectBtn, {marginRight: 20}]}>
          <Text style={styles.btnText}>다시 만들기</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.selectBtn}>
          <Text style={styles.btnText}>자장가 저장</Text>
        </TouchableOpacity> */}
          <MusicSaveModal navigation={navigation}/>
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