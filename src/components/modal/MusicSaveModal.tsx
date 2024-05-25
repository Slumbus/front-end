import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MusicSaveModal({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  
  return(
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>가사 생성 여부 선택</Text>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(!modalVisible)}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.modalContentBtn} onPress={() => {navigation.navigate('LyricWriting'); setModalVisible(false);}}>
              <Text style={styles.modalContentText}>가사 녹음하러 가기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalContentBtn}>
              <Text style={styles.modalContentText}>이대로 저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.selectBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.btnText}>자장가 저장</Text>
      </TouchableOpacity>
    </View>  
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000044',

  },
  modalContainer:{
    width: 250,
    height: 140,
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
    borderColor: '#000000',
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
  modalContentBtn: {
    width: 220,
    height: 35,
    marginBottom: 10,
    backgroundColor: '#283882',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: '#FFFFFF',
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
