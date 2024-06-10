import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface User {
  id: number;
  email: string;
  password: string;
}

const UserData: User = {
  id: 1,
  email: 'test@test.com',
  password: 'test',
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    if (email === UserData.email && password === UserData.password) {
      navigation.navigate('MainNavigator' as never);
    } else {
      setEmailError(email !== UserData.email || email === '');
      setPasswordError(password !== UserData.password || password === '');
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
        <Text style={styles.textView}>로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="이메일"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError(false);
          }}
        />
        {emailError && (
          <Text style={styles.errorText}>올바른 이메일을 입력하세요</Text>
        )}
        <TextInput
          style={[styles.input, passwordError && styles.errorInput]}
          placeholder="비밀번호"
          value={password}
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
            setPasswordError(false);
          }}
        />
        {passwordError && (
          <Text style={styles.errorText}>올바른 비밀번호를 입력하세요</Text>
        )}
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            navigation.navigate('FindPWEmail' as never);
          }}>
          <Text style={styles.text}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <View style={styles.click}>
          <Text style={styles.text}>|</Text>
        </View>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            navigation.navigate('SignUp' as never);
          }}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>또는</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialImageContainer}>
        <Image
          source={require('../../assets/images/google.png')}
          style={styles.socialImage}
        />
        <Image
          source={require('../../assets/images/kakaotalk.png')}
          style={styles.socialImage}
        />
        <Image
          source={require('../../assets/images/naver.png')}
          style={styles.socialImage}
        />
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
    height: 100,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    marginBottom: 50,
  },
  inputContainer: {
    paddingVertical: 15,
    marginBottom: 30,
  },
  textContainer: {
    paddingLeft: 10,
  },
  textView: {
    fontFamily: 'SCDream5',
    fontSize: 20,
    color: 'black',
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
  errorText: {
    color: 'red',
    fontSize: 10,
    marginLeft: 5,
    marginBottom: 10,
    fontFamily: 'SCDream2',
  },
  loginButtonContainer: {
    // alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 50,
    alignItems: 'center',
    // height: 40,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    fontFamily: 'SCDream5',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  click: {
    // flex: 1,
    margin: 5,
    fontFamily: 'SCDream2',
    fontSize: 12,
  },
  lineContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  line: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#7D7D7D',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'SCDream2',
  },
  socialImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialImage: {
    marginHorizontal: 5,
    width: 50,
    height: 50,
  },
  text: {
    fontFamily: 'SCDream2',
  },
});
