import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUserData, removeUserData} from '../utils/Store';
import axios from 'axios';
import {API_URL} from '@env';

export default function MyScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({email: '', picture: ''});
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      const token = await getUserData();
      console.log(token);
      const res = await axios.get(`${API_URL}/api/my-page`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      setUserData(res.data.data);
    } catch (err) {
      setError('사용자 데이터를 가져오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []),
  );

  const handleLogout = async () => {
    await removeUserData();
    // navigation.navigate('AuthStack' as never);
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack' as never}],
    });
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
      <View>
        <Image
          source={
            userData.picture
              ? {uri: userData?.picture}
              : require('../assets/images/Slumbus_Logo.png')
          }
          style={styles.image}
        />
      </View>
      <Text style={styles.email}>{userData.email}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SelectLyricWritingList' as never);
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.text2}>
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
            <Text style={styles.text2}>회원 정보 수정</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditPW' as never);
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.text2}>비밀번호 변경</Text>
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
  text2: {
    fontSize: 15,
    fontFamily: 'SCDream5',
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
    alignItems: 'flex-start',
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
    marginLeft: 20,
  },
  arrow: {
    fontSize: 15,
    fontFamily: 'SCDream5',
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
    fontFamily: 'SCDream5',
  },
});
