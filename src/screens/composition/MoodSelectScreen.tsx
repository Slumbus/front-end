import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MoodSelectScreen({navigation}: any) {

  const genreBtnNames: string[] = ['장르1', '장르2', '장르3', '장르4', '장르5', '장르6', '장르7', '장르8', '장르9'];
  const instBtnNames: string[] = ['악기1', '악기2', '악기3', '악기4', '악기5', '악기6', '악기7', '악기8', '악기9'];

  const [selectedGenreButtons, setSelectedGenreButtons] = useState<number[]>([]);
  const [selectedInstButtons, setSelectedInstButtons] = useState<number[]>([]);


  const pressGenreButton = (index: number) => {
    setSelectedGenreButtons((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, index];
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
      }
      return prevSelected;
    });
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

      <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate('MelodySaveScreen')}>
        <Text style={styles.selectBtnText}>곡 분위기 선택하기</Text>
      </TouchableOpacity>
      
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