import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Alert, Image, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import RNFetchBlob from 'rn-fetch-blob';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { RootStackParamList } from '../../navigation/ComposeStack';

const audioRecorderPlayer = new AudioRecorderPlayer();
type MoodSelectScreenRouteProp = RouteProp<RootStackParamList, 'MoodSelectScreen'>;

export default function HummingScreen({navigation}: any) {
  const route = useRoute<MoodSelectScreenRouteProp>();
  const {kidId} = route.params;

  const [selectedOption, setSelectedOption] = useState("file");
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | undefined>();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [recordedFile, setRecordedFile] = useState<string | null>(null);
  const [recordText, setRecordText] = useState("하단 버튼을 통해 녹음해 주세요.");

  const selectFile = () => {
    setSelectedOption("file");
    setModalVisible(true);
  };

  // 파일 경로 변환 (캐쉬에 저장)
  const getResolvedPath = async (uri: any) => {
    console.log("인수: "+ uri)
    const fileBase64 = await ReactNativeBlobUtil.fs.readFile(uri, "base64")
    const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${Date.now()}.mp3`

    await ReactNativeBlobUtil.fs.writeFile(path, fileBase64, "base64")
    const tempFileInfo = await ReactNativeBlobUtil.fs.stat(path)
    console.log("여기")
    console.log(`file://${tempFileInfo.path}`);
    return `file://${tempFileInfo.path}`
  }

  //파일 접근 권한 얻기
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE , 
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ]);
        if (
          granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
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
        type: [DocumentPicker.types.audio],
      });
      console.log(res);
      if (res.length > 0) { // 파일 변수에 저장
        const uri = res[0].uri;
        console.log("경로"+res[0].uri);
        const filePath = await getResolvedPath(uri); // 파일 경로 변환 함수 호출
        console.log(filePath);
        setSelectedFile(filePath);
        setSelectedFileName(res[0].name); //파일명
        setModalVisible(false);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        throw err;
      }
    }
  };

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
      if (selectedOption === 'file') {
        const newSound = new Sound(selectedFile, '', error => {
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
      } else {
        const newSound = new Sound(recordedFile, '', error => {
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
    if (isPlaying) {
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
  }, [isPlaying]);

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

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setPosition(e.currentPosition / 1000);
      setDuration(e.currentPosition / 1000);
    });
    setIsRecording(true);
    setRecordText("녹음이 진행 중입니다.");
    console.log(`Recording started: ${result}`);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordedFile(result);
    setIsRecording(false);
    setPosition(0);
    setRecordText("녹음이 완료되었습니다.");
    console.log(`Recording stopped: ${result}`);
    // console.log(recordedFile);
  };

  const navigateToMoodSelect = () => {
    stopSound();
    if(recordedFile == null && selectedFile == null){
      Alert.alert('', '허밍 파일을 불러오거나 녹음해주세요.');
    } else {
      const fileToPass = selectedOption === 'record' ? recordedFile : selectedFile;
      navigation.navigate('MoodSelectScreen', { kidId, file: fileToPass });
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
          <View style={styles.playbarContainer}>
            <TouchableOpacity>
              {/* <Image source={require("../../assets/images/plus.png") }/>
              <Text>파일 첨부</Text> */}
            </TouchableOpacity>
            <Text style={styles.songTitleText}>{selectedFile ? selectedFileName: '선택된 파일이 없습니다.'}</Text>
            <View style={styles.songPlayContainer}>
              <TouchableOpacity onPress={() => (isPlaying ? stopSound() : playSound(selectedFile))}>
                <Icon name={isPlaying ? 'pause' : 'play'} size={28} color="#283882" />
              </TouchableOpacity>
              {/* <View style={styles.playBar} /> */}
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
          </View>
          <View style={styles.songTimeContainer}>
            <Text style={[styles.songTimeText, {marginLeft: 50, marginRight: 200,}]}>{formatTime(position)}</Text>
            <Text style={styles.songTimeText}>{formatTime(duration)}</Text>
          </View>
        </View>
        )}
        
        {selectedOption === 'record' && (
          <View style={styles.contentContainer}>
            <View style={styles.playbarContainer}>
              <Text style={styles.songTitleText}>{recordText}</Text>
              <View style={styles.songPlayContainer}>
                <TouchableOpacity onPress={isRecording ? onStopRecord : onStartRecord}>
                  <Icon name={isRecording ? 'pause-circle' : 'mic-circle'} size={35} color="#F24E1E" />
                </TouchableOpacity>
                <Text style={[styles.songTimeText, {marginLeft: 10}]}>{formatTime(duration)}</Text>
              </View>
            </View>
            {recordedFile && (
              <View>
                <View style={styles.songPlayContainer}>
                  <TouchableOpacity onPress={() => (isPlaying ? stopSound() : playSound(recordedFile))}>
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
              </View>
            )}
          </View>
        )}

      <TouchableOpacity style={styles.selectBtn} onPress={navigateToMoodSelect}>
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
  },
  playbarContainer:{
    justifyContent: 'center',
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
  },
  songTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  songTimeText: {
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000000',
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