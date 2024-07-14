import React, { useState, useEffect }  from 'react';
import {View, Text, StyleSheet, FlatList, Image, ListRenderItemInfo, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';

interface Child {
  id: number;
  name: string;
  birthdate: string;
  age: number;
  image: any;
  photoList: any[];
}

// const childrenData: Child[] = [
//   {
//     id: 1,
//     name: '사랑이',
//     birthdate: '2024-03-12',
//     age: 1,
//     image: "https://cdn.pixabay.com/photo/2015/05/20/14/23/baby-775503_1280.jpg",
//     photoList: [
//       "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
//       "https://cdn.pixabay.com/photo/2022/11/16/13/39/cuddly-toys-7596017_1280.jpg",
//       "https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467761_1280.jpg",
//     ],
//   },
//   {
//     id: 2,
//     name: '행복이',
//     birthdate: '2023-05-20',
//     age: 2,
//     image: "https://cdn.pixabay.com/photo/2016/01/20/11/11/baby-1151351_1280.jpg",
//     photoList: [
//       "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
//     ],
//   },
// ];

export default function ChildrenListScreen({ navigation }: any) {
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const fetchChildrenData = async () => {
      const token = ''; // 임시 토큰 값

      try {
        const response = await axios.get('http://10.0.2.2:8080/api/song/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data.map((child: any) => ({
          id: child.kidId,
          name: child.kidName,
          birthdate: child.kidBirth,
          age: calculateAge(new Date(child.kidBirth)),
          image: child.kidPicture,
          photoList: child.musicList.map((music: any) => music.artwork)
        }));
        setChildrenData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChildrenData();
  }, []);

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const renderItem = ({ item }: ListRenderItemInfo<Child>) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.childInfoContainer} onPress={() => navigation.navigate('ChildrenInfoPlaylist', { child: item })}>
        <Image source={{ uri: item.image }} style={styles.childImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.birth}>{item.birthdate}</Text>
          <Text style={styles.age}>만 {item.age}세</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={item.photoList}
        horizontal
        renderItem={({ item: photo }) => (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('ChildrenInfoPlaylist', { child: item })}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김
        scrollEnabled={scrollEnabled}
        onTouchStart={() => setScrollEnabled(true)}
        onTouchEnd={() => setScrollEnabled(true)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={childrenData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={scrollEnabled}
        onTouchStart={() => setScrollEnabled(true)}
        onTouchEnd={() => setScrollEnabled(true)}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('ChildrenRegister')}>
        <Image source={require('../../assets/images/ic_add_white.png')} style={styles.floatingIc} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    padding: 16
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#E7F2FF',
    borderRadius: 10,
    marginBottom: 18,
  },
  childInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  childImage: {
    width: 86,
    height: 86,
    borderRadius: 100, // 원형
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    marginBottom: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'SCDream5',
    color: '#000000',
    marginBottom: 10,
  },
  birth: {
    color: '#646464',
    fontFamily: 'SCDream3',
    fontSize: 12,
    marginBottom: 5,
  },
  age: {
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000000',
  },
  photo: {
    width: 72,
    height: 72,
    marginRight: 12,
    borderRadius: 5,
  },
  floatingButton: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#283882',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 55,
    right: 16,
  },
  floatingIc: {
    width: 34,
    height: 34
  }
});
