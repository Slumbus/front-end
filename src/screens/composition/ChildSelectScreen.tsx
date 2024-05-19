import React from 'react';
import { useState } from "react";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";




export default function ChildSelectScreen({navigation}: any) {

  //추후 여기는 데이터 파싱해서 해당 데이터 값으로 들어갈 수 있도록 변경해주어야 함.
  const [children, setChildren] = useState([
    { name: '사랑이', birthdate: '2023.03.11', age: '만 1세', imageUri: 'https://www.maeili.com/editor/upload/82e20ab7-309b-4bfc-936a-74a5a57fa4bd.jpg' },
    { name: '행복이', birthdate: '2024.03.11', age: '만 0세', imageUri: 'https://img.freepik.com/premium-photo/cute-baby-learning-sit-her-tummy-smiling-baby_4740-3205.jpg' },
    { name: '행운이', birthdate: '2022.03.11', age: '만 2세', imageUri: 'https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2019/03/421.jpg?w=750' }
  ]);
  const [selectedChildIndex, setSelectedChildIndex] = useState<number | null>(null);

  const selectChild = (index: any) => {
    setSelectedChildIndex(index);
  };

  const getChildBackgroundColor = (index: number) => {
    return selectedChildIndex === index ? '#C6DDF7' : '#FFFFFF';
  };

  return(
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>아이 선택</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>어떤 아이의 자장가를 만들고 싶나요?</Text>
        </View>
      </View>
      
      <View style={styles.childListContainer}>
 
        {children.map((child, index) => (
        <TouchableOpacity key={index} style={[styles.childContainer, { backgroundColor: getChildBackgroundColor(index)}]} onPress={() => selectChild(index)}>
          <Image 
            source = {{uri: child.imageUri}} 
            style={styles.childImage}
          />
          <View style={styles.childProfile}>
            <Text style={styles.childName}>{child.name}</Text>
            <Text style={styles.childInfo}>{child.birthdate}</Text>
            <Text style={styles.childInfo}>{child.age}</Text>
          </View>
        </TouchableOpacity>))}

      </View>
      
      <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate('HummingScreen')}>
        <Text style={styles.btnText}>선택 완료</Text>
      </TouchableOpacity>
    
    </View>
    );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    marginHorizontal: 35,
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
    color: '#4A4A4A',
  },
  childListContainer: {
    marginHorizontal:35,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  childContainer: {
    marginHorizontal: 20,
    marginVertical: 12.5,
    paddingLeft: 25,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderColor: '#C6DDF7',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childImage:{
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  childProfile:{
    marginLeft: 15,
  },
  childName:{
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#000000',
  },
  childInfo:{
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000000',
  },
  selectBtn:{
    marginHorizontal: 80,
    marginTop: 45,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
    borderRadius: 50,
  },
  btnText:{
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
  }
});