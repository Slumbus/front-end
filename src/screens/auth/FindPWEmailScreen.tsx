import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FindPWEmailScreen() {
  const navigation = useNavigation();
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
        <TextInput style={styles.input} placeholder="이메일" />
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
        <TextInput style={styles.input} placeholder="인증번호" />
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('FindPWChange' as never);
          }}>
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
  nextButtonContainer: {
    // alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  nextButton: {
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
    // height: 40,
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
