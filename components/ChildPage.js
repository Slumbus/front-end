import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

const ChildPage = () => {
  // 아이 목록 데이터 배열 (임시)
  const childrenData = [
    { id: 1, name: '사랑이', birthdate: '2024.03.12', age: 1 },
    { id: 2, name: '아이2', birthdate: '2023.05.20', age: 2 },
  ];

  // FlatList에서 각 아이를 렌더링하는 함수
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { marginBottom: 18 }]}>
      <View style={styles.childInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>{item.birthdate}</Text>
          <Text style={styles.info}>만 {item.age}세</Text>
        </View>
      </View>
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
    width: 50,
    height: 50,
    borderRadius: 25, // 원형으로 표시하기 위해 반지름 설정
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  info: {
    fontSize: 14,
  },
});

export default ChildPage;