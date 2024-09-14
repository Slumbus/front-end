import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { getUserData } from '../../utils/Store';
import axios from 'axios';
import {API_URL} from '@env';

interface Song {
  id: number;
  //kidName: String,
  url: string,
  title: string;
  artwork: string;
}

const emojiImages = [
  require('../../assets/images/ic_reaction/ic_reaction1_gray.png'),
  require('../../assets/images/ic_reaction/ic_reaction2_gray.png'),
  require('../../assets/images/ic_reaction/ic_reaction3_gray.png'),
  require('../../assets/images/ic_reaction/ic_reaction4_gray.png'),
  require('../../assets/images/ic_reaction/ic_reaction5_gray.png'),
  require('../../assets/images/ic_reaction/ic_reaction6_gray.png'),
];

const selectedEmojiImages = [
  require('../../assets/images/ic_reaction/ic_reaction1.png'),
  require('../../assets/images/ic_reaction/ic_reaction2.png'),
  require('../../assets/images/ic_reaction/ic_reaction3.png'),
  require('../../assets/images/ic_reaction/ic_reaction4.png'),
  require('../../assets/images/ic_reaction/ic_reaction5.png'),
  require('../../assets/images/ic_reaction/ic_reaction6.png'),
];

export default function ChildrenInfoReactionRegisterScreen({ route, navigation }: any ) {
  const { songId, kidId } = route.params;
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number | null>(null);
  const [reactionText, setReactionText] = useState<string>('');
  const [songData, setSongData] = useState<Song | null>(null);

  useEffect(() => {
    fetchSongData(songId);
  }, [songId]);

  const handleEmojiPress = (index: number) => {
    setSelectedEmojiIndex(index);
  };

  const fetchSongData = async (songId: number) => {
    const token = await getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/song/detail/${songId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setSongData(data);
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  };

  const handleRegister = async () => {
    if (selectedEmojiIndex === null || reactionText.trim() === '') {
      Alert.alert('Error', 'Please select an emoji and write a comment.');
      return;
    }

    const token = await getUserData(); 
    const reactionData = {
      emoji: selectedEmojiIndex,
      comment: reactionText,
    };

    try {
      await axios.post(`${API_URL}/api/reaction/kid/${kidId}/music/${songId}`, reactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', '자장가 반응 등록 완료');
      navigation.goBack();
    } catch (error) {
      console.error('Error registering reaction:', error);
      Alert.alert('Error', 'Failed to register reaction');
    }
  };

  if (!songData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.songContainer}>
        <Image source={{ uri: songData.artwork }} style={styles.songImage} />
        <View style={styles.songTextContainer}>
          <Text style={styles.songTitle}>{songData.title}</Text>
          <Text style={styles.songOwner}>{songData.title}</Text>
        </View>
      </View>
      <Text style={styles.selectTitle}>반응 이모지 선택</Text>
      <View style={styles.emojiContainer}>
        {emojiImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiPress(index)}>
            <Image
              source={selectedEmojiIndex === index ? selectedEmojiImages[index] : image}
              style={styles.emoji}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.commentTitle}>한줄 코멘트</Text>
      <TextInput
        style={styles.input}
        placeholder="해당 자장가를 들려주었을 때 아이의 반응을 작성하세요."
        value={reactionText}
        onChangeText={setReactionText}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 23,
  },
  songContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  songTextContainer: {
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'SCDream5',
    marginBottom: 2,
  },
  songOwner: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'SCDream4',
  },
  selectTitle: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'SCDream6',
    marginBottom: 14,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emoji: {
    width: 77,
    height: 77,
    margin: 10,
  },
  commentTitle: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'SCDream6',
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 17,
    paddingVertical: 15,
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000000',
    textAlignVertical: 'top', 
  },
  buttonContainer: {
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingVertical: 9,
    alignItems: 'center',
    width: 261,
    position: 'absolute',
    bottom: -100, // 바닥으로부터 마진
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    fontFamily: 'SCDream5',
  },
});
