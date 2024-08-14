import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const url = 'http://10.0.2.2:8080';

export default function FindPWChangeScreen({route}: any) {
  const navigation = useNavigation();
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  const resetPassword = async () => {
    if (!password || !confirmPassword) {
      setPasswordError(true);
      setPasswordMessage('비밀번호를 입력해 주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log(email, password);

    try {
      const res = await axios.patch(`${url}/api/auth/password`, {
        email,
        password,
      });
      console.log(res.data);

      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('비밀번호 재설정 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={require('../../assets/images/Slumbus_Logo_long_ver.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textView}>비밀번호 재설정</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="새 비밀번호"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError(false);
            setPasswordMessage('');
          }}
        />
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="새 비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setPasswordError(false);
            setPasswordMessage('');
          }}
        />
        {passwordMessage ? (
          <Text
            style={[
              styles.statusText,
              passwordError ? styles.errorStatusText : styles.successStatusText,
            ]}>
            {passwordMessage}
          </Text>
        ) : null}
        <TouchableOpacity style={styles.nextButton} onPress={resetPassword}>
          <Text style={styles.buttonText}>비밀번호 재설정</Text>
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
  },
  imageView: {
    flexDirection: 'row',
  },
  logo: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    marginBottom: 50,
  },
  textContainer: {
    paddingLeft: 10,
  },
  textView: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'SCDream6',
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
  },
  errorInput: {
    borderColor: 'red',
  },
  successInput: {
    borderColor: 'green',
  },
  statusText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'SCDream2',
  },
  errorStatusText: {
    color: 'red',
  },
  successStatusText: {
    color: 'green',
  },
  nextButton: {
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
