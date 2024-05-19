import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={require('../assets/images/Slumbus_Logo_long_ver.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textView}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="이메일" />
        <View style={styles.mailButtonConatiner}>
          <TouchableOpacity
            style={styles.mailButton}
            onPress={() => {
              /* 버튼을 눌렀을 때 수행할 동작 */
            }}>
            <Text style={styles.buttonText}>인증 메일 전송</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} placeholder="인증번호" />
        <TextInput style={styles.input} placeholder="비밀번호" />
        <TextInput style={styles.input} placeholder="비밀번호 확인" />
      </View>
      <View style={styles.signUpButtonContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            /* 버튼을 눌렀을 때 수행할 동작 */
          }}>
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
  signUpButtonContainer: {
    // alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpButton: {
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
});
