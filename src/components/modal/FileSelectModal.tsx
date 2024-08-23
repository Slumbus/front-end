import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

export default function FileSelectModal({visible, onClose}: any) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(visible);
  }, [modalVisible]);

  return(
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
        >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>음성 파일 선택</Text>
              <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
                <Icon name="cross" size={30} color={'#000'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.modalContentText}>내 파일</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    right: 0,
  },
  modalContentText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: '#000000',
  },

})