import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { getUserData } from '../../utils/Store';

export default function ChildrenRegisterScreen({ navigation, route }: any) {
  const [birthdate, setBirthdate] = useState(new Date()); // 기본값을 현재 날짜로 설정
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // 수정모드 여부 확인

  useEffect(() => {
    if (route.params?.child) {
      const { birthdate, gender, image, name } = route.params.child;
      setIsEditMode(true); // 수정 모드로 설정

      if (birthdate) {
        // 'yyyy.MM.dd' 형식에서 'yyyy-MM-dd' 형식으로 변환
        const parsedDate = birthdate.replace(/\./g, '-');
        if (!isNaN(Date.parse(parsedDate))) {
          setBirthdate(new Date(parsedDate));
        } else {
          setBirthdate(new Date());
        }
      } else {
        setBirthdate(new Date());
      }
      setGender(gender);
      setSelectedImage(image);
      setName(name);
    }
  }, [route.params]);
  
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

  const handleRegister = async () => {
    const token = await getUserData(); 
    try {
      const formData = new FormData();
      
      formData.append('kidDTO', {"string": JSON.stringify({
        name: name,
        birth: birthdate.toISOString().split('T')[0],
        gender: gender === 'MALE' ? 0 : gender === 'FEMALE' ? 1 : 2,
      }), type: "application/json"});
      
      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }

      if (isEditMode) {
        await axios.patch(`http://10.0.2.2:8080/api/kid/${route.params.child.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        Alert.alert('수정 성공', '아이 정보가 성공적으로 수정되었습니다.');
      } else {
        await axios.post('http://10.0.2.2:8080/api/kid', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        Alert.alert('등록 성공', '아이 정보가 성공적으로 등록되었습니다.');
      }

      navigation.navigate('ChildrenList', { refresh: true });
    } catch (error) {
      console.error(error);
      Alert.alert('등록 실패', '아이 정보 등록에 실패했습니다.');
    }
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
        <TextInput 
          placeholder='이름' 
          style={styles.textInput}
          value={name}
          onChangeText={setName} />
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
          style={[styles.genderButton, gender === 'FEMALE' && styles.genderButtonSelected]}
          onPress={() => setGender('FEMALE')}
        >
          <Image
            source={require('../../assets/images/ic_woman.png')}
            style={styles.genderIcWoman}
            resizeMode="contain"
          />
          <Text style={[styles.genderButtonText, gender === 'FEMALE' && styles.genderButtonTextSelected]}>여</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'MALE' && styles.genderButtonSelected]}
          onPress={() => setGender('MALE')}
        >
          <Image
            source={require('../../assets/images/ic_man.png')}
            style={styles.genderIcMan}
            resizeMode="contain"
          />
          <Text style={[styles.genderButtonText, gender === 'MALE' && styles.genderButtonTextSelected]}>남</Text>
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
          onPress={handleRegister}
          >
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
