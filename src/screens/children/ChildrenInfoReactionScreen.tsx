import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// 이모지 선택 함수
const getReactionImage = (reactionLevel: string) => {
  switch (reactionLevel) {
    case "DEEPSLEEP":
      return require('../../assets/images/ic_reaction/ic_reaction1.png');
    case "SLEEP":
      return require('../../assets/images/ic_reaction/ic_reaction2.png');
    case "GOOD":
      return require('../../assets/images/ic_reaction/ic_reaction3.png');
    case "BAD":
      return require('../../assets/images/ic_reaction/ic_reaction4.png');
    case "SAD":
      return require('../../assets/images/ic_reaction/ic_reaction5.png');
    default:
      return require('../../assets/images/ic_reaction/ic_reaction6.png');
  }
};

export default function ChildrenInfoReactionScreen({ route, navigation }: any) {
  const { title, selectedSongId, kidId, reactionData } = route.params;
  // const { title, selectedSongId, kidId, reactionData: initialReactionData } = route.params;
  // const [reactionData, setReactionData] = useState(initialReactionData);
  
  // 데이터 새로고침
  // const fetchReactionData = async () => {
  //   try {
  //     const response = await axios.get(`http://10.0.2.2:8080/api/reaction/kid/${kidId}/music/${selectedSongId}`);
  //     setReactionData(response.data.data);
  //   } catch (error) {
  //     console.error('Error fetching reaction data:', error);
  //   }
  // };

  // 화면에 다시 포커스 될 때마다 데이터 새로고침
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchReactionData();
  //   }, [])
  // );

  // useEffect(() => {
  //   if (route.params?.onGoBack) {
  //     fetchReactionData();  // 데이터 갱신
  //   }
  // }, [route.params?.onGoBack]);

  return (
    <View style={styles.container}>
      <View style={styles.reactionContainer}>
        <View style={styles.lullabyTitleContainer}>
          <Icon name="play" size={18} color={'#000000'} />
          <Text style={styles.reactionTitle}>{title}</Text>
        </View>
        <FlatList
          data={reactionData}
          renderItem={({ item }) => (
            <View style={styles.reactionItemContainer}>
              <Image source={getReactionImage(item.emoji)} style={styles.reactionImage} />
                    
              <View style={styles.reactionContentContainer}>
                <Text style={styles.reactionContent}>{item.comment}</Text>
                <Text style={styles.reactionDate}>{item.created}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity style={styles.floatingButton} 
        onPress={() => navigation.navigate('ChildrenInfoReactionRegister', { songId: selectedSongId, kidId: kidId })}>
          <Image source={require('../../assets/images/ic_add_white.png')} style={styles.floatingIc} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  reactionContainer: {
    padding: 5,
    marginVertical: 10,
    borderWidth: 1, 
    borderColor: '#CBCBCB', 
    borderStyle: 'solid', 
    borderRadius: 10, 
  },
  lullabyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 8.
  },
  reactionTitle: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'SCDream5',
    marginBottom: 4,
  },
  reactionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reactionContentContainer: {
    marginLeft: 8,
  },
  reactionImage: {
    width: 35,
    height: 35,
  },
  reactionContent: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'SCDream4',
    marginBottom: 4,
  },
  reactionDate: {
    fontSize: 10,
    color: '#6D6D6D',
    fontFamily: 'SCDream4',
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
