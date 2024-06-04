import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import PlayButton from '../../components/button/PlayButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const SongData = [
  {
    id: 1,
    picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
    title: "완전 취침",
  },
  {
    id: 2,
    picture: "https://cdn.pixabay.com/photo/2015/02/04/08/03/baby-623417_960_720.jpg",
    title: "Goodnight",
  },
];

const lullabiesData = [
  {
    title: "완전 취침",
    reactionLevel: 1,
    reactionText: "자장가를 틀자마자 금새 잠이 들었다",
    date: "2024.03.13 15:00",
  },
  {
    title: "완전 취침",
    reactionLevel: 6,
    reactionText: "자장가를 들어도 기분이 풀리지 않았다",
    date: "2024.03.13 15:00",
  },
  {
    title: "Goodnight",
    reactionLevel: 2,
    reactionText: "훌륭해요",
    date: "2024.03.13 15:00",
  },
];

const groupedLullabies: Record<string, { reactionLevel: number; reactionText: string; date: string; }[]> = lullabiesData.reduce((acc, cur) => {
  if (!acc[cur.title]) {
    acc[cur.title] = [];
  }
  acc[cur.title].push(cur);
  return acc;
}, {} as Record<string, { reactionLevel: number; reactionText: string; date: string; }[]>);

// 이모지 선택 함수
const getReactionImage = (reactionLevel: number) => {
  switch (reactionLevel) {
    case 1:
      return require('../../assets/images/ic_reaction/ic_reaction1.png');
    case 2:
      return require('../../assets/images/ic_reaction/ic_reaction2.png');
    case 3:
      return require('../../assets/images/ic_reaction/ic_reaction3.png');
    case 4:
      return require('../../assets/images/ic_reaction/ic_reaction4.png');
    case 5:
      return require('../../assets/images/ic_reaction/ic_reaction5.png');
    default:
      return require('../../assets/images/ic_reaction/ic_reaction6.png');
  }
};

export default function ChildrenInfoPlaylistScreen({ route, navigation }: any) {
  const { child } = route.params;
  const [showPhotos, setShowPhotos] = useState(true);
  const [progress, setProgress] = useState(0.5);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<number | null>(null); // 재생 상태를 관리할 상태 추가

  const handleButtonClick = (isPhotoButton: boolean) => {
    setShowPhotos(isPhotoButton);
    setProgress(isPhotoButton ? 0.5 : 0);
    setShowFloatingButton(!isPhotoButton);
  };

  const handlePlayButtonClick = (id: number) => {
    setPlayingSongId(playingSongId === id ? null : id); // 재생 버튼 클릭 시 상태 업데이트
  };

  const renderButtonIcon1 = (isActive: boolean) => {
    return isActive ? require('../../assets/images/ic_playlist_activate.png') : require('../../assets/images/ic_playlist.png');
  };

  const renderButtonIcon2 = (isActive: boolean) => {
    return isActive ? require('../../assets/images/ic_reaction.png') : require('../../assets/images/ic_reaction_activate.png');
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: progress }]} />
        <View style={[styles.progressBar, { flex: 1 - progress }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Image source={{ uri: child.image }} style={styles.childImage} />
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{child.name}</Text>
          <Image
            source={require('../../assets/images/ic_man.png')}
            style={styles.genderIcMan}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.birth}>{child.birthdate}</Text>
          <Text style={styles.age}>(만 {child.age}세)</Text>
        </View>
      </View>
      {/* 이미지 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showPhotos ? styles.activeButton : null]}
          onPress={() => handleButtonClick(true)}
        >
          <Image source={renderButtonIcon1(showPhotos)} style={styles.buttonIc}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showPhotos ? styles.activeButton : null]}
          onPress={() => handleButtonClick(false)}
        >
          <Image source={renderButtonIcon2(showPhotos)} style={styles.buttonIc}/>
        </TouchableOpacity>
      </View>
      {/* 프로그래스 바 */}
      {renderProgressBar()}
      {/* 사진 목록 또는 다른 목록 */}
      {showPhotos ? (
        <FlatList
          data={SongData}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Image source={{ uri: item.picture }} style={styles.photo} />
              <Text style={styles.songTitle}>{item.title}</Text>
              <PlayButton
                size={32}
                isPlaying={playingSongId !== item.id}
                onPress={() => handlePlayButtonClick(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.reactionListContainer}>
          <Text style={styles.reactionTitle}>자장가 반응 기록</Text>
          <FlatList
            data={Object.entries(groupedLullabies)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ChildrenInfoReaction', { title: item[0], data: item[1] })}
                style={styles.reactionContainer}
              >
                <View style={styles.lullabyTitleContainer}
                >
                  <Icon name="play" size={18} color={'#000000'} />
                  <Text style={styles.lullabyTitle}>{item[0]}</Text>
                </View>
                {item[1].map((lullabyData, index) => (
                  <View key={index} style={styles.reactionItemContainer}>
                    <Image source={getReactionImage(lullabyData.reactionLevel)} style={styles.reactionImage} />
                    <View style={styles.reactionContentContainer}>
                      <Text style={styles.reactionContent}>{lullabyData.reactionText}</Text>
                      <Text style={styles.reactionDate}>{lullabyData.date}</Text>
                    </View>
                  </View>
                ))}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item[0]}
          />
        </View>
      )}
      {/* 자장가 반응 추가 버튼 */}
      {showFloatingButton && (
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('ChildrenInfoReactionRegister')}>
          <Image source={require('../../assets/images/ic_add_white.png')} style={styles.floatingIc} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  centerContainer: {
    alignItems: 'center', // 세로 방향 가운데 정렬
  },
  childImage: {
    width: 144,
    height: 144,
    backgroundColor: '#D8D8D8',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'SCDream6',
    color: '#000000',
  },
  birth: {
    fontSize: 14,
    color: '#636363',
    fontFamily: 'SCDream4',
    marginRight: 6
  },
  age: {
    fontSize: 14,
    color: '#636363',
    fontFamily: 'SCDream4',
  },
  genderIcMan: {
    width: 24,
    height: 21,
    marginRight: 8
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  // 이미지 버튼 스타일
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 45,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  buttonIc: {
    width: 32,
    height: 32,
  },
  // 프로그래스 바 스타일
  progressBarContainer: {
    flexDirection: 'row',
    height: 1,
    marginBottom: 10,
  },
  progressBar: {
    backgroundColor: '#E9E9E9',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  songTitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'SCDream5',
    flex: 1,
    marginLeft: 16,
  },
  playButton: {
    padding: 10,
  },
  playIcon: {
    width: 24,
    height: 24,
  },
  reactionListContainer: {
    marginHorizontal: 18,
  },
  reactionTitle: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'SCDream5',
    marginBottom: 4,
  },
  reactionContainer: {
    padding: 5,
    marginVertical: 10,
    borderWidth: 1, // 테두리 두께
    borderColor: '#CBCBCB', // 테두리 색상
    borderStyle: 'solid', // 테두리 스타일 (solid, dashed, dotted)
    borderRadius: 10, // 테두리 모서리를 둥글게
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
  lullabyTitle: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'SCDream5',
    marginLeft: 6,
  },
  reactionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reactionContentContainer: {
    marginLeft: 8
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
    bottom: 90,
    right: 16,
  },
  floatingIc: {
    width: 34,
    height: 34
  }
});