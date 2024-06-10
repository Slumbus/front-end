import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [verificationCodeError, setVerificationCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isMailSent, setIsMailSent] = useState(false);

  const startTimer = () => {
    setTimer(300); // 5분 (300초) 타이머 시작
    setIsMailSent(true);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSignUp = () => {
    setEmailError(email === '');
    setVerificationCodeError(verificationCode === '');
    setPasswordError(password === '');
    setConfirmPasswordError(
      confirmPassword === '' || password !== confirmPassword,
    );
    if (email && verificationCode && password && password === confirmPassword) {
      navigation.navigate('Login' as never);
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
        <Text style={styles.textView}>회원가입</Text>
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
          <Text style={styles.errorText}>이메일을 입력해주세요</Text>
        )}
        <View style={styles.mailButtonConatiner}>
          {timer > 0 && (
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          )}
          <TouchableOpacity
            style={[styles.mailButton, isMailSent && styles.mailButtonSent]}
            onPress={startTimer}>
            <Text
              style={[styles.buttonText, isMailSent && styles.buttonTextSent]}>
              인증 메일 전송
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, verificationCodeError && styles.errorInput]}
          placeholder="인증번호"
          value={verificationCode}
          onChangeText={text => {
            setVerificationCode(text);
            setVerificationCodeError(false);
          }}
        />
        {verificationCodeError && (
          <Text style={styles.errorText}>인증번호를 입력해주세요</Text>
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
          <Text style={styles.errorText}>비밀번호를 입력해주세요</Text>
        )}
        <TextInput
          style={[styles.input, confirmPasswordError && styles.errorInput]}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          secureTextEntry
          onChangeText={text => {
            setConfirmPassword(text);
            setConfirmPasswordError(false);
          }}
        />
        {confirmPasswordError && confirmPassword === '' && (
          <Text style={styles.errorText}>비밀번호 확인을 입력해주세요</Text>
        )}
        {confirmPasswordError &&
          confirmPassword !== '' &&
          password !== confirmPassword && (
            <Text style={styles.errorText}>비밀번호가 일치하지 않습니다</Text>
          )}
      </View>
      <View style={styles.signUpButtonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>회원가입</Text>
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
    marginTop: 20,
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
    fontSize: 20,
    color: 'black',
    fontFamily: 'SCDream6',
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
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: 'SCDream2',
  },
  mailButtonContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signUpButtonContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpButton: {
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
  mailButtonConatiner: {
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mailButton: {
    backgroundColor: '#CDCDCD',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: 'center',
    fontFamily: 'SCDream5',
  },
  mailButtonSent: {
    backgroundColor: '#C6DDF7',
  },
  buttonTextSent: {
    color: '#283882',
    fontFamily: 'SCDream5',
  },
  timerText: {
    marginRight: 10,
    color: '#283882',
    fontFamily: 'SCDream5',
  },
});
