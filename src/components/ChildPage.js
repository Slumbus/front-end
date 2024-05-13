import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView } from 'react-native';

const ChildPage = () => {
  // 아이 목록 데이터 배열 (임시)
  const childrenData = [
    { id: 1, name: '사랑이', birthdate: '2024.03.12', age: 1, image: require('../image/child_sample.png'),
      photoList: [require('../image/child_sample.png'), require('../image/child_sample.png'), require('../image/child_sample.png'),]
    },
    { id: 2, name: '아이2', birthdate: '2023.05.20', age: 2, image: require('../image/child_sample.png'),
      photoList: [require('../image/child_sample.png'), require('../image/child_sample.png'), require('../image/child_sample.png'),]
    },
  ];

  // FlatList에서 각 아이를 렌더링하는 함수
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { marginBottom: 18 }]}>
      <View style={styles.childInfoContainer}>
      <Image source={item.image} style={styles.childImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.birth}>{item.birthdate}</Text>
          <Text style={styles.age}>만 {item.age}세</Text>
        </View>
      </View>
      <FlatList
        data={item.photoList}
        horizontal
        renderItem={({ item }) => (
          <Image source={item} style={styles.photo} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={childrenData} // 데이터 배열 전달
        renderItem={renderItem} // 각 항목을 렌더링하는 함수 전달
        keyExtractor={item => item.id.toString()} // 각 아이템의 고유 키 설정
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    padding: 16
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#E7F2FF',
    borderRadius: 10,
    padding: 20, 
  },
  childInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childImage: {
    width: 86,
    height: 86,
    borderRadius: 25, // 원형으로 표시하기 위해 반지름 설정
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    marginBottom: 16
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  birth: {
    fontSize: 14,
  },
  age: {
    fontSize: 12,
    color: '#000000',
  },
  photo: {
    width: 72,
    height: 72,
    marginRight: 12,
    borderRadius: 5,
  },
});

export default ChildPage;