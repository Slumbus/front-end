import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

import { RootStackParamList } from '../../navigation/ComposeStack';
import { getUserData } from '../../utils/Store';

import MusicComposeLoadingModal from '../../components/modal/MusicComposeLoadingModal';

type MoodSelectScreenRouteProp = RouteProp<RootStackParamList, 'MoodSelectScreen'>;

export default function MoodSelectScreen({navigation}: any) {
  const route = useRoute<MoodSelectScreenRouteProp>();
  const {kidId, file} = route.params;

  const genreBtnNames: string[] = ['조용한', '새벽', '자정', '평화로운', '몽환적', '잠오는', '신나는', '부드러운', '은은한'];
  const instBtnNames: string[] = ['하프', '피리', '바이올린', '첼로', '플루트', '기타', '오르골', '오보에', '마림바'];

  const [selectedGenreButtons, setSelectedGenreButtons] = useState<number[]>([]);
  const [selectedInstButtons, setSelectedInstButtons] = useState<number[]>([]);3
  
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const pressGenreButton = (index: number) => {
    setSelectedGenreButtons((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, index];
      } else if (prevSelected.length >= 2) {
        Alert.alert('', '최대 2개까지 선택해주세요.');
      }
      return prevSelected;
    });
  };

  const pressInstButton = (index: number) => {
    setSelectedInstButtons((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, index];
      } else if (prevSelected.length >= 2) {
        Alert.alert('', '최대 2개까지 선택해주세요.');
      }
      return prevSelected;
    });
  };

  const koreanToEnglish = (word: string) => {
    const translations: { [key: string]: string }= {
      '조용한': 'quiet',
      '새벽': 'dawn',
      '자정': 'midnight',
      '평화로운': 'peaceful',
      '몽환적': 'dreamy',
      '잠오는': 'sleepy',
      '신나는': 'exciting',
      '부드러운': 'soft',
      '은은한': 'subtle',
      '하프': 'harp',
      '피리': 'pipe',
      '바이올린': 'violin',
      '첼로': 'Cello',
      '플루트': 'flute',
      '기타': 'guitar',
      '오르골': 'music box',
      '오보에': 'Oboe',
      '마림바': 'marimba',
    };
  
    return translations[word] || null;
  }

  const uploadMusic = async () => {
    setLoadingModalVisible(true);    
    const formData = new FormData();
    formData.append('options', JSON.stringify({
      mood: `${koreanToEnglish(genreBtnNames[selectedGenreButtons[0]])}, ${koreanToEnglish(genreBtnNames[selectedGenreButtons[1]])}`,
      instrument: `${koreanToEnglish(instBtnNames[selectedInstButtons[0]])}, ${koreanToEnglish(instBtnNames[selectedInstButtons[1]])}`,
    }));
    formData.append('humming', {
      uri: file,
      name: 'music.mp3',
      type: 'audio/mp3',
    });
    console.log(file, formData);
    try {
      const token = await getUserData();
      const response = await axios.post('http://10.0.2.2:8080/api/song/compose', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 200) {
        // console.log(response.data)
        setLoadingModalVisible(false);
        navigation.navigate('MelodySaveScreen', {
          kidId: kidId,
          url: response.data.data.music,
        });
      } else {
        console.error('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>자장가 스타일 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>원하는 스타일의 자장가를 생성하도록 {"\n"}분위기를 선택해보세요!</Text>
        </View>
      </View>

      <View style={[styles.genreContainer, {marginBottom: 30,}]}>
        <View style={styles.optionsContainer}>
          <Text style={styles.headerText}>장르</Text>
          <Text style={styles.noticeText}>{"("}최대 2개 선택 가능{")"}</Text>
        </View>

        <View style={styles.btnContainer}>
        {genreBtnNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionBtn, selectedGenreButtons.includes(index) && styles.selectedOptionBtn
            ]}
            onPress={() => pressGenreButton(index)}>
            <Text style={styles.btnText}>{name}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>

      <View style={styles.instContainer}>
        <View style={styles.optionsContainer}>
          <Text style={styles.headerText}>악기</Text>
          <Text style={styles.noticeText}>{"("}최대 2개 선택 가능{")"}</Text>
        </View>

        <View style={styles.btnContainer}>
        {instBtnNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionBtn, selectedInstButtons.includes(index) && styles.selectedOptionBtn
            ]}
            onPress={() => pressInstButton(index)}>
            <Text style={styles.btnText}>{name}</Text>
          </TouchableOpacity>
        ))}

        </View>
      </View>
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={uploadMusic}>
        {/* onPress={()=> navigation.navigate('MelodySaveScreen', {
          kidId: kidId,
          url: `https://slumbus.s3.ap-southeast-2.amazonaws.com/music/077de29c-ae28-4116-92a9-ebef20bbc343.mp3`,
        })}> */}
        <Text style={styles.selectBtnText}>곡 분위기 선택하기</Text>
      </TouchableOpacity>

      {/* loading modal */}
      <MusicComposeLoadingModal loadingModalVisible={loadingModalVisible}/>
      
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal:35
  },
  infoContainer: {
    marginTop: 25,
    marginBottom: 35,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#4A4A4A',
  },
  infoTextContainer: {
    marginTop: 5,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderTopColor: '#D9D9D9',
  },
  infoText:{
    fontSize: 14,
    fontFamily: 'SCDream4',
    textAlign:'center',
    color: '#4A4A4A',
  },
  genreContainer:{
  },
  instContainer:{
  },
  optionsContainer:{
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'SCDream6',
    color: '#4A4A4A',
    marginRight: 5,
    marginBottom: 10,
  },
  noticeText:{
    fontSize: 10,
    fontFamily: 'SCDream6',
    color: '#969696',
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRowContainer:{
    flexDirection: 'row',
  },
  optionBtn:{
    width: 100,
    height: 35,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C6DDF7',
    
  },
  selectedOptionBtn:{
    width: 100,
    height: 35,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#C6DDF7',
  },
  btnText:{
    fontSize: 14,
    fontFamily: 'SCDream6',
    color: '#283882',
  },
  selectBtn:{
    marginHorizontal: 45,
    marginTop: 45,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
    borderRadius: 50,
  },
  selectBtnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
  },
});