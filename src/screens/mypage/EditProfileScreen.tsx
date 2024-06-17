import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(
    'https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg',
  );

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const openGallery = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

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
        const firstAsset = response.assets[0];
        if (firstAsset.uri) {
          // uri가 존재하는 경우에만 처리
          setProfileImage(firstAsset.uri);
        } else {
          Alert.alert('Error', '이미지 URI를 찾을 수 없습니다.');
        }
      } else {
        Alert.alert('Error', '이미지를 선택하지 않았습니다.');
      }
    });
  };
  return (
    <View style={styles.container}>
      {/* <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg',
        }}
        style={styles.image}
      /> */}
      <TouchableOpacity onPress={openGallery}>
        <Image source={{uri: profileImage}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('MyScreen' as never);
          }}>
          <Text style={styles.buttonText}>변경 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginBottom: 10,
    paddingHorizontal: 10,
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
