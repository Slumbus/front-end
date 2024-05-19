import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function HummingScreen({navigation}: any) {
  const [selectedOption, setSelectedOption] = useState("file");

  return(
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>허밍 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>자장가의 기본 멜로디가 되는 {"\n"}허밍을 녹음해주세요!</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.hummingBtn, {marginRight: 35}, selectedOption === 'file' && styles.selectedHummingBtn]}
          onPress={() => setSelectedOption("file")}>
          <Text style={[styles.btnText, selectedOption === 'file' && styles.selectedBtnText]}>파일 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hummingBtn, selectedOption === 'record' && styles.selectedHummingBtn]} onPress={() => setSelectedOption("record")}>
          <Text style={[styles.btnText, selectedOption === 'record' && styles.selectedBtnText]}>녹음하기</Text>
        </TouchableOpacity>

      </View>
      {selectedOption === 'file' && (
          <View>
            <Text>파일 선택 뷰</Text>
          </View>
        )}
        
        {selectedOption === 'record' && (
          <View>
            <Text>녹음하기 뷰</Text>
          </View>
        )}
      <View style={styles.contentContainer}>

      </View>

      <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate('MoodSelectScreen')}>
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
    marginBottom: 20,
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
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hummingBtn: {
    width: 115,
    height:35,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#283882',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHummingBtn:{
    width: 115,
    height:35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#283882',
  },
  selectedBtnText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
  },
  contentContainer:{
    height: 250,
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

})