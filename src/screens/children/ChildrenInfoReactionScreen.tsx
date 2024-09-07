import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserData } from '../../utils/Store';
import axios from 'axios';

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
  const { selectedSongId, kidId } = route.params;
  const [title, setTitle] = useState<any[]>([]);
  const [lullabyData, setLullabyData] = useState<any[]>([]);

  useEffect(() => {
    fetchReactionData(kidId, selectedSongId);
  }, [kidId, selectedSongId, route.params?.refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchReactionData(kidId, selectedSongId);
    });
  
    return unsubscribe;
  }, [navigation, kidId, selectedSongId]);

  const fetchReactionData = async (kidId: number, selectedSongId: number) => {
    const token = await getUserData();
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/reaction/kid/${kidId}/music/${selectedSongId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = {
        musicId: response.data.data.musicId,
        musicTitle: response.data.data.musicTitle,
        reactions: response.data.data.reactions
      };
      
      setTitle(data.musicTitle);
      setLullabyData(data.reactions);
    } catch (error) {
      console.error('Error fetching reaction data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.reactionContainer}>
        <View style={styles.lullabyTitleContainer}>
          <Icon name="play" size={18} color={'#000000'} />
          <Text style={styles.reactionTitle}>{title}</Text>
        </View>
        <FlatList
          data={lullabyData}
          renderItem={({ item }) => (
            <View style={styles.reactionItemContainer}>
              <Image source={getReactionImage(item.emoji)} style={styles.reactionImage} />
                    
              <View style={styles.reactionContentContainer}>
                <Text style={styles.reactionContent}>{item.comment}</Text>
                <Text style={styles.reactionDate}>{item.created}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.reactId.toString()} 
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
