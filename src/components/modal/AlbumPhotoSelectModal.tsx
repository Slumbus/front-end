import React, { useEffect, useState } from "react";
import { Image, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function AlbumPhotoSelectModal() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 권한 요청',
          message: '앱에서 카메라를 사용하려면 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '취소',
          buttonPositive: '허용',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('카메라 권한이 허용되지 않았습니다.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('갤러리 닫음');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];
        console.log('Image selected: ', selectedImage);
        // 여기에 이미지 선택 후의 처리 추가
      }
    });
  };

  const openCamera = () => {
    const options: CameraOptions ={
      mediaType: 'photo',
      cameraType: 'back',
    };
    
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        console.log('Camera Response: ', response.assets);
        // 여기서 이미지 데이터를 사용할 수 있습니다 (response.assets[0])
      }
    });
  };

  return(
    <View>
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
                <Text style={styles.modalHeaderText}>앨범 표지 선택</Text>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(!modalVisible)}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalContent}>
                <View style={styles.contentLine}>
                  <TouchableOpacity onPress={openGallery}>
                    <Text style={styles.modalContentText}>갤러리</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={openCamera}>
                  <Text style={styles.modalContentText}>카메라</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.albumPhotoBtnContainer} onPress={() => setModalVisible(true)}>
          <Image
          source={require('../../assets/images/plus.png')}
          style={styles.albumPhotoSelectImage}
          />
        </TouchableOpacity>
      </View> 
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
    height: 120,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection:'row',
    width: 230,
    height: 40,
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
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    width: 230,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  modalContentText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: '#000000',
    margin: 10,
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

});