import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

const url = 'http://10.0.2.2:8080';

export default function FindPWEmailScreen({navigation}: any) {
  const [timer, setTimer] = useState(0);
  const [isMailSent, setIsMailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [verificationCodeError, setVerificationCodeError] = useState(false);
  const [emailStatusText, setEmailStatusText] = useState('');
  const [verificationCodeStatusText, setVerificationCodeStatusText] =
    useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const startTimer = async () => {
    setTimer(300); // 5분 (300초) 타이머 시작
    setIsMailSent(true);
  };

  const handleSendVerificationMail = async () => {
    if (email === '') {
      setEmailError(true);
      setEmailStatusText('이메일을 입력해주세요');
      return;
    }
    try {
      const res = await axios.post(
        `${url}/api/auth/resend-email?email=${email}`,
      );
      setEmailError(false);
      setEmailStatusText('인증메일이 전송되었습니다.');
      startTimer();
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '인증메일 전송에 실패했습니다.';
        setEmailError(true);
        setEmailStatusText(errorMessage);
      } else {
        setEmailError(true);
        setEmailStatusText('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/check-code-password`, {
        params: {email, code},
      });
      setIsCodeVerified(true);
      setVerificationCodeStatusText('인증번호 확인에 성공했습니다.');
      setVerificationCodeError(false);
    } catch (error) {
      console.error('인증 오류:', error);
      setVerificationCodeError(true);
      setVerificationCodeStatusText('인증번호가 일치하지 않습니다');
    }
  };

  const next = async () => {
    if (isCodeVerified) {
      navigation.navigate('FindPWChange', {email});
    }
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
        <Text style={styles.textView}>비밀번호 찾기</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="이메일"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError(false);
            setEmailStatusText('');
          }}
        />
        {emailStatusText ? (
          <Text
            style={[
              styles.statusText,
              emailError ? styles.errorStatusText : styles.successStatusText,
            ]}>
            {emailStatusText}
          </Text>
        ) : null}
        <View style={styles.mailButtonContainer}>
          {timer > 0 && (
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          )}
          <TouchableOpacity
            style={[styles.mailButton, isMailSent && styles.mailButtonSent]}
            onPress={handleSendVerificationMail}>
            <Text
              style={[styles.buttonText, isMailSent && styles.buttonTextSent]}>
              인증 메일 전송
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[
            styles.input,
            verificationCodeError ? styles.errorInput : null,
          ]}
          placeholder="인증번호"
          value={code}
          onChangeText={text => {
            setCode(text);
            setVerificationCodeError(false);
            setVerificationCodeStatusText('');
          }}
        />
        {verificationCodeStatusText ? (
          <Text
            style={[
              styles.statusText,
              verificationCodeError
                ? styles.errorStatusText
                : styles.successStatusText,
            ]}>
            {verificationCodeStatusText}
          </Text>
        ) : null}
        <TouchableOpacity style={styles.nextButton} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>인증 확인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !(email && code && isCodeVerified) && styles.disabledButton,
          ]}
          onPress={next}>
          <Text style={styles.buttonText}>다음</Text>
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
  successInput: {
    borderColor: 'green',
  },
  successStatusText: {
    color: 'green',
  },
  errorStatusText: {
    color: 'red',
  },
  statusText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'SCDream2',
  },
  mailButtonContainer: {
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
  nextButtonContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
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
  timerText: {
    marginRight: 10,
    color: '#283882',
    fontFamily: 'SCDream5',
  },
  disabledButton: {
    backgroundColor: '#CDCDCD',
    fontFamily: 'SCDream5',
  },
});
