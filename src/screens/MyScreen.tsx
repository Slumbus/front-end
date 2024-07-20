import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeUserData} from '../utils/Store';

export default function MyScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await removeUserData();
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg',
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.email}>test@test.com</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SelectLyricWritingList' as never);
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.text}>
              내가 만든 자장가 목록 - 작사하러 가기
            </Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditProfile' as never);
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.text}>회원 정보 수정</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditPW' as never);
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.text}>비밀번호 변경</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'SCDream3',
    marginBottom: 50,
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
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  arrow: {
    fontSize: 15,
    fontFamily: 'SCDream2',
    color: '#C8C8C8',
    marginLeft: 10,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#E9E9E9',
    marginVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 200,
    // alignItems: 'flex-end',
  },
  logoutText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'SCDream2',
  },
});
