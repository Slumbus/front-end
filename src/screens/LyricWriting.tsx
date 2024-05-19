import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

import BasicSong from '../components/BasicSong';

export default function LyricWriting() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const LyricWritingdata = [
    {
      id: 1,
      picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
      title: "완전 취침",
      child: "사랑이",
      song: "https://freemusicarchive.org/music/Dee_Yan-Key/lullaby/lullaby/"
    },
  ];

  const handleSave = () => {
    setModalVisible(true);
  };
  
  return (
    <View style={styles.container}>
      {LyricWritingdata.map((song) => (
        <View key={song.id} style={styles.song}>
          <BasicSong imageSource={{uri: song.picture}} title={song.title} child={song.child} />
        </View>
      ))}
      <View style={styles.songPlayContainer}>
          <Icon name="play" size={28} color="#283882" onPress={() => console.log("재생 버튼 눌림")} />
          <View style={styles.playBar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>직접 작사 또는 AI에게 가사 추천 받기</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.promptInput}
            textAlignVertical='top'
            multiline
            placeholder='AI에게 요청하고 싶은 내용을 입력해 주세요.'
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity style={styles.AIbutton}>
            <Icon2 name="robot" size={16} color="#fff" onPress={() => console.log("ai 버튼 눌림")} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer2}>
          <TextInput
            style={styles.lyricsInput}
            textAlignVertical='top'
            multiline
            placeholder='가사를 입력해주세요.'
            value={lyrics}
            onChangeText={setLyrics}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.saveText}>저장</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>가사 녹음하러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>이대로 저장하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    marginHorizontal: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283882',
  },
  song: {
    marginTop: 25,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'regular',
  },
  songPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
    marginVertical: 10,
    alignItems: 'center',
  },
  playBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#283882',
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputContainer2: {
    marginBottom: 5,
  },
  promptInput: {
    height: 110,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lyricsInput: {
    height: 240,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  AIbutton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#283882',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    height: 35,
    width: 90,
    borderRadius: 50,
    backgroundColor: '#283882',
    justifyContent: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  modalView: {
    top: '45%',
    left: '15%',
    backgroundColor: 'grey', // 수정 필
    width: 260,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    height: 35,
    width: 230,
    borderRadius: 50,
    backgroundColor: '#283882',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});
