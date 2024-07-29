import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Asset, ImageLibraryOptions} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {getUserData} from '../../utils/Store';
import axios from 'axios';

const url = 'http://10.0.2.2:8080';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [picture, setPicture] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getUserData();
        const res = await axios.get(`${url}/api/my-page`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = res.data.data;
        setPicture(userData.picture);
      } catch (err) {
        setError('사용자 데이터를 가져오지 못했습니다.');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const hasAndroidPermission = async () => {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    };
    hasAndroidPermission();
  }, []);

  const openGallery = async () => {
    // if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    //   return;
    // }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];
        if (selectedImage.uri) {
          // uri가 존재하는 경우에만 처리
          setPicture(selectedImage.uri);
        } else {
          Alert.alert('Error', '이미지 URI를 찾을 수 없습니다.');
        }
      } else {
        Alert.alert('Error', '이미지를 선택하지 않았습니다.');
      }
    });
  };

  const handleProfileUpdate = async () => {
    try {
      const token = await getUserData();
      const formData = new FormData();
      formData.append('image', {
        uri: picture,
        type: 'image/jpeg', // 이미지 타입, 적절히 변경해야 할 수도 있습니다.
        name: 'profile.jpg', // 이미지 파일 이름
      });

      await axios.patch(`${url}/api/my-page`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', '프로필 사진이 업데이트되었습니다.');
      navigation.navigate('MyScreen' as never);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', '프로필 사진을 업데이트하지 못했습니다.');
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg',
        }}
        style={styles.image}
      /> */}
      <TouchableOpacity onPress={openGallery}>
        <Image
          source={
            picture
              ? {uri: picture}
              : require('../../assets/images/Slumbus_Logo.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>프로필 사진</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleProfileUpdate}>
          <Text style={styles.buttonText}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: 15,
    fontFamily: 'SCDream2',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 40,
    marginBottom: 30,
  },
  buttonContainer: {
    // alignItems: 'center',
    marginTop: 100,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '70%',
  },
  button: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 50,
    alignItems: 'center',
    // height: 40,
    width: '100%',
    fontFamily: 'SCDream5',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    fontFamily: 'SCDream5',
  },
});
