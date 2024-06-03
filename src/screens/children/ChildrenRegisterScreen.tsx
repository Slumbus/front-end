import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ChildrenRegisterScreen() {
  const [birthdate, setBirthdate] = useState(new Date()); // 기본값을 현재 날짜로 설정
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthdate;
    setBirthdate(currentDate);
    // 캘린더가 닫혀있는 경우에만 setShowDatePicker(false) 호출
    if (event.type === 'set' || event.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setSelectedImage(imageUri);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.imageView} onPress={handleImagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} resizeMode="cover" />
          ) : (
            <Image source={require('../../assets/images/ic_add_image_white.png')} style={styles.imageIc} resizeMode="contain" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.text}>이름(태명)</Text>
        <TextInput placeholder='이름' style={styles.textInput} />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.text}>생년월일</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}
        disabled={showDatePicker}
        >
          <Text>{birthdate.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require('../../assets/images/ic_info.png')}
          style={styles.infoIc}
        />
        <Text style={styles.infoText}>아직 태어나지 않았다면 출산 예정일을 작성해주세요!</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={[styles.text, {marginRight: 10}]}>성별</Text>
        <TouchableOpacity
          style={[styles.genderButton, gender === '여자' && styles.genderButtonSelected]}
          onPress={() => setGender('여자')}
        >
          <Image
            source={require('../../assets/images/ic_woman.png')}
            style={styles.genderIcWoman}
            resizeMode="contain"
          />
          <Text style={[styles.genderButtonText, gender === '여자' && styles.genderButtonTextSelected]}>여</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === '남자' && styles.genderButtonSelected]}
          onPress={() => setGender('남자')}
        >
          <Image
            source={require('../../assets/images/ic_man.png')}
            style={styles.genderIcMan}
            resizeMode="contain"
          />
          <Text style={[styles.genderButtonText, gender === '남자' && styles.genderButtonTextSelected]}>남</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require('../../assets/images/ic_info.png')}
          style={styles.infoIc}
        />
        <Text style={styles.infoText}>선택사항 입니다</Text>
      </View>
      <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            /* 버튼을 눌렀을 때 수행할 동작 */
          }}>
          <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 60
  },
  text: {
    fontSize: 16,
    fontFamily: 'SCDream4',
    color: '#000000',
  },
  centerContainer: {
    alignItems: 'center', // 세로 방향 가운데 정렬
  },
  imageView: {
    width: 144,
    height: 144,
    backgroundColor: '#D8D8D8',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageIc: {
    width: 56,
    height: 56,
  },
  nameContainer: {
    flexDirection: 'row', // 수평 배치
    alignItems: 'center', // 수직 가운데 정렬
    marginBottom: 30,
    justifyContent: 'flex-start', // 좌측 정렬
  },
  textInput: {
    borderBottomWidth: 0.5, // 하단 테두리 추가
    borderBottomColor: '#989898', // 하단 테두리 색상
    marginLeft: 40, // 텍스트와 입력창 사이의 간격
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row', // 수평 배치
    alignItems: 'center', // 수직 가운데 정렬
    marginBottom: 14,
    justifyContent: 'flex-start', // 좌측 정렬
  },
  dateInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#989898',
    marginLeft: 40,
    paddingVertical: 8,
  },
  datePicker: {
    flex: 1,
    marginLeft: 40,
  },
  infoContainer: {
    marginBottom: 40,
    flexDirection: 'row'
  },
  infoIc: {
    width: 13,
    height: 13,
    marginRight: 13
  },
  genderButton: {
    marginLeft: 14,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    borderRadius: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  genderButtonSelected: {
    backgroundColor: '#283882',
    borderColor: '#283882',
    borderRadius: 10,
  },
  genderButtonText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'SCDream4',
  },
  genderButtonTextSelected: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'SCDream4',
  },
  genderIcWoman: {
    width: 14,
    height: 20,
    marginRight: 12
  },
  genderIcMan: {
    width: 24,
    height: 21,
    marginRight: 8
  },
  infoText: {
    fontSize: 10,
    fontFamily: 'SCDream4',
    color: '#989898',
  },
  doneButton: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 9,
    alignItems: 'center',
    width: 261,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    fontFamily: 'SCDream5',
  },
});
