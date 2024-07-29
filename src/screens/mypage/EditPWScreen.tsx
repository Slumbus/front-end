import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {getUserData} from '../../utils/Store';

const url = 'http://10.0.2.2:8080';

export default function EditPWScreen() {
  const navigation = useNavigation();
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [originPasswordError, setOriginPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePasswords = () => {
    let isValid = true;

    if (!originPassword) {
      setOriginPasswordError('기존 비밀번호를 입력해주세요.');
      isValid = false;
    } else {
      setOriginPasswordError('');
    }

    if (!newPassword) {
      setNewPasswordError('새 비밀번호를 입력해주세요.');
      isValid = false;
    } else {
      setNewPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('새 비밀번호 확인을 입력해주세요.');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.',
      );
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      const token = await getUserData();
      const res = await axios.patch(
        `${url}/api/my-page/password`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            origin: originPassword,
            new: newPassword,
          },
        },
      );

      if (res.data.code === 'SUCCESS_UPDATE_PASSWORD') {
        Alert.alert('Success', '비밀번호 변경에 성공했습니다.');
        navigation.navigate('MyScreen' as never);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (
          err.response &&
          err.response.data.code === 'INVALID_ORIGIN_PASSWORD'
        ) {
          setOriginPasswordError('기존 비밀번호가 일치하지 않습니다.');
        } else {
          Alert.alert('Error', '비밀번호 변경에 실패했습니다.');
        }
      } else {
        Alert.alert('Error', '예상치 못한 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, originPasswordError ? styles.errorInput : null]}
          placeholder="기존 비밀번호"
          secureTextEntry
          value={originPassword}
          onChangeText={text => {
            setOriginPassword(text);
            setOriginPasswordError('');
          }}
        />
        {originPasswordError ? (
          <Text style={styles.errorText}>{originPasswordError}</Text>
        ) : null}

        <TextInput
          style={[styles.input, newPasswordError ? styles.errorInput : null]}
          placeholder="새 비밀번호"
          secureTextEntry
          value={newPassword}
          onChangeText={text => {
            setNewPassword(text);
            setNewPasswordError('');
          }}
        />
        {newPasswordError ? (
          <Text style={styles.errorText}>{newPasswordError}</Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            confirmPasswordError ? styles.errorInput : null,
          ]}
          placeholder="새 비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>변경 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 35,
    paddingTop: 100,
  },
  inputContainer: {
    paddingVertical: 15,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E9E9E9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    fontFamily: 'SCDream2',
    marginTop: 15,
    marginBottom: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 50,
    alignItems: 'center',
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
