import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function AgreeScreen() {
  const navigation = useNavigation();
  const [allChecked, setAllChecked] = useState(false);
  const [checkStates, setCheckStates] = useState([false, false, false]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const toggleAllCheckboxes = (newValue: any) => {
    setAllChecked(newValue);
    setCheckStates([newValue, newValue, newValue]);
    setIsButtonEnabled(newValue); // 모든 체크박스가 체크되면 버튼 활성화
  };

  const toggleCheckbox = (index: any) => {
    const updatedCheckStates = [...checkStates];
    updatedCheckStates[index] = !updatedCheckStates[index];
    setCheckStates(updatedCheckStates);

    if (updatedCheckStates.every(state => state)) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }

    // 필수 체크박스가 모두 체크되었는지 확인
    if (updatedCheckStates[0] && updatedCheckStates[1]) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleNextPress = () => {
    if (isButtonEnabled) {
      navigation.navigate('SignUp' as never);
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

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxAllRow}>
          <CheckBox
            value={allChecked}
            onValueChange={toggleAllCheckboxes}
          />
          <Text style={styles.checkboxAllText}>전체 동의</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={checkStates[0]}
            onValueChange={() => toggleCheckbox(0)}
          />
          <Text style={styles.checkboxText}>서비스 이용약관</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={checkStates[1]}
            onValueChange={() => toggleCheckbox(1)}
          />
          <Text style={styles.checkboxText}>개인정보 수집 및 이용동의</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={checkStates[2]}
            onValueChange={() => toggleCheckbox(2)}
          />
          <Text style={styles.checkboxText}>광고성 정보 수신동의(선택)</Text>
        </View>
      </View>
      
      <View style={styles.signUpButtonContainer}>
        <TouchableOpacity 
          style={[styles.signUpButton, !isButtonEnabled && styles.disabledButton]} 
          onPress={handleNextPress}
          disabled={!isButtonEnabled}
        >
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
    marginTop: 43,
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
  checkboxContainer: {
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  checkboxAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxAllText: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'SCDream5',
    color: '#000000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: '#000000',
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
  disabledButton: {
    backgroundColor: '#CDCDCD',
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