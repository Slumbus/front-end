import React, { useEffect, useState } from 'react';
import { Image, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';


export default function HummingScreen({navigation}: any) {
  const [selectedOption, setSelectedOption] = useState("file");
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | undefined>();

  const selectFile = () => {
    setSelectedOption("file");
    setModalVisible(true);
  };

  //파일 접근 권한 얻기
  useEffect(() => {
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ]);

                if (
                    granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
                    granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    requestPermissions();
  }, []);

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        throw err;
      }
    }
  };

  //음악 재생 동작
  const playSound = () => {
    const newSound = new Sound('lemon.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      setSound(newSound);
      setIsPlaying(true);
      newSound.play(() => {
        newSound.release();
        setIsPlaying(false);
      });
    });
  };

  const stopSound = () => {
    console.log('Stop sound function called');
    console.log(sound);
    if (sound) {
      sound.pause();
      setIsPlaying(false);
      sound.release();
      setSound(undefined);
    }
  };


  return(
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>허밍 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>자장가의 기본 멜로디가 되는 {"\n"}허밍을 녹음해주세요!</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.hummingBtn, {marginRight: 35}, selectedOption === 'file' && styles.selectedHummingBtn]}
          onPress={() => {selectFile()}}>
          <Text style={[styles.btnText, selectedOption === 'file' && styles.selectedBtnText]}>+ 파일 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hummingBtn, selectedOption === 'record' && styles.selectedHummingBtn]} onPress={() => setSelectedOption("record")}>
          <Text style={[styles.btnText, selectedOption === 'record' && styles.selectedBtnText]}>녹음하기</Text>
        </TouchableOpacity>
      </View>

      {selectedOption === 'file' && (
          <View style={styles.contentContainer}>
            <TouchableOpacity>
              {/* <Image source={require("../../assets/images/plus.png") }/>
              <Text>파일 첨부</Text> */}
            </TouchableOpacity>
            <Text style={styles.songTitleText}>Humming.mp3</Text>
            <View style={styles.songPlayContainer}>
              <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
                <Icon name={isPlaying ? 'pause' : 'play'} size={28} color="#283882" />
              </TouchableOpacity>
              <View style={styles.playBar} />
            </View>
          </View>
        )}
        
        {selectedOption === 'record' && (
          <View style={styles.contentContainer}>
            <Text>녹음하기 뷰</Text>
          </View>
        )}

      <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate('MoodSelectScreen')}>
        <Text style={styles.selectBtnText}>곡 분위기 선택하기</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>음성 파일 선택</Text>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.modalContentText} onPress={handleFilePicker}>내 파일</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginBottom: 35,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#4A4A4A',
  },
  infoTextContainer: {
    marginTop: 5,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderTopColor: '#D9D9D9',
  },
  infoText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    textAlign:'center',
    color: '#4A4A4A',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hummingBtn: {
    flexDirection:'row',
    width: 115,
    height:35,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#283882',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHummingBtn:{
    width: 115,
    height:35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#283882',
  },
  selectedBtnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
  },
  contentContainer:{
    marginTop: 15,
    height: 250,
    flexDirection: 'column',
    alignItems: 'center',
  },
  songTitleText:{
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#000000',
  },
  songPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  playBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#283882',
    marginLeft: 10,
  },


  selectBtn:{
    marginHorizontal: 45,
    marginTop: 45,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
    borderRadius: 50,
  },
  selectBtnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
  },

// 모달 CSS
  modalView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000044',

  },
  modalContainer:{
    width: 250,
    height: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection:'row',
    width: 230,
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    fontSize: 16,
    fontFamily: 'SCDream5',
    color: '#000000',
  },
  modalCancel: {
    position: 'absolute',
    right: 10,
  },
  modalContentText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: '#000000',
  },
  

})