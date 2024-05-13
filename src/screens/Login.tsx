import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
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
        <Text style={styles.textView}>로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="이메일" />
        <TextInput style={styles.input} placeholder="비밀번호" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* 버튼을 눌렀을 때 수행할 동작 */
          }}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            /* 버튼을 눌렀을 때 수행할 동작 */
          }}>
          <Text>비밀번호 찾기</Text>
        </TouchableOpacity>
        <View style={styles.click}>
          <Text>|</Text>
        </View>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            /* 버튼을 눌렀을 때 수행할 동작 */
          }}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
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
    marginBottom: 30,
  },
  inputContainer: {
    paddingVertical: 15,
    marginBottom: 30,
  },
  textContainer: {
    paddingLeft: 15,
  },
  textView: {
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
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  click: {
    flex: 1,
  },
});
