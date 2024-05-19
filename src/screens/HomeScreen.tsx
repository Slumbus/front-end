import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AlbumTitleText from '../components/AlbumTitleText';
import AlbumJacket from '../components/AlbumJacket';

export default function HomeScreen({navigation}: any) {

  const ChildrenAlbumdata = [
    {
      picture: "https://cdn.pixabay.com/photo/2015/05/20/14/23/baby-775503_1280.jpg",
      name: "사랑이",
      albumname: "사랑이 자장가 모음",
      Music: [
        {
        title: "Good night",
        picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
        },
        {
        title: "꿀잠2",
        picture: "https://cdn.pixabay.com/photo/2022/11/16/13/39/cuddly-toys-7596017_1280.jpg",
        },
        {
        title: "좋은 꿈",
        picture: "https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467761_1280.jpg",
        },
        {
        title: "꿀잠",
        picture: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
        },
        {
        title: "완전 취침",
        picture: "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_1280.jpg",
        },
      ]
    },
    {
      picture: "https://cdn.pixabay.com/photo/2016/01/20/11/11/baby-1151351_1280.jpg",
      name: "행복이",
      albumname: "행복 쿨쿨",
      Music: [
        {
        title: "꿀잠",
        picture: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
        },
        {
        title: "Good night",
        picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
        },
        {
        title: "완전 취침",
        picture: "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_1280.jpg",
        },
      ]
    },
    {
      picture: "https://cdn.pixabay.com/photo/2017/11/10/08/08/baby-2935722_1280.jpg",
      name: "행운이",
      albumname: "행운 가득",
      Music: [
        {
        title: "좋은 꿈",
        picture: "https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467761_1280.jpg",
        },
        {
        title: "꿀잠2",
        picture: "https://cdn.pixabay.com/photo/2022/11/16/13/39/cuddly-toys-7596017_1280.jpg",
        },
      ]
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {ChildrenAlbumdata.map((album) => (
        <View key={album.albumname}>
          <AlbumTitleText imageSource={{ uri: album.picture}} text1= {album.name} text2={album.albumname} />
          <View style={styles.jackets}>
            {album.Music.map((song) => (
              <AlbumJacket key={song.title} imageSource={{ uri: song.picture}} text={song.title} onPress={() => navigation.navigate('PlayScreen')} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24, 
  },
  jackets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
});
