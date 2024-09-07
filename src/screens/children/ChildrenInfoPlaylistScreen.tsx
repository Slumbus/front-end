import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import PlayButton from '../../components/button/PlayButton';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { getUserData } from '../../utils/Store';

interface Song {
  id: number;
  url: string,
  title: string;
  artwork: string;
}

interface Props {
  route: any;
  navigation: any;
  selectedChild: any;
  setSelectedChild: (child: any) => void;
}

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

const getGenderImage = (gender: string) => {
  return gender === 'MALE'
    ? require('../../assets/images/ic_man.png')
    : require('../../assets/images/ic_woman.png');
};

export default function ChildrenInfoPlaylistScreen({ route, navigation, selectedChild, setSelectedChild }: Props) {
  const { child } = route.params;
  const [showPhotos, setShowPhotos] = useState(true);
  const [progress, setProgress] = useState(0.5);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<number | null>(null); // 재생 상태를 관리할 상태 추가
  const [modalVisible, setModalVisible] = useState(false);
  const [songData, setSongData] = useState<Song[]>([]);
  const [lullabyData, setLullabyData] = useState<any[]>([]);
  
  useEffect(() => {
    setSelectedChild(child);
    fetchSongData(child.id);
    fetchReactionData(child.id);
  }, [child, route.params?.refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchReactionData(child.id);
    });
  
    return unsubscribe;
  }, [navigation, child.id]);

  const fetchSongData = async (kidId: number) => {
    const token = await getUserData();
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/song/list/${kidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data.map((song: any) => ({
        id: song.id,
        url: song.url,
        title: song.title,
        artwork: song.artwork,
      }));
      setSongData(data);
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  };

  const fetchReactionData = async (kidId: number) => {
    const token = await getUserData();
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/reaction/kid/${kidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data.map((reactionGroup: any) => ({
        kidId: reactionGroup.kidId,
        musicId: reactionGroup.musicId,
        musicTitle: reactionGroup.musicTitle,
        reactions: reactionGroup.reactions.map((reaction: any) => ({
          reactId: reaction.reactId,
          emoji: reaction.emoji,
          comment: reaction.comment,
          created: reaction.createdAt
        })),
      }));
      setLullabyData(data);
      console.log('데이터', "불러오기")
    } catch (error) {
      console.error('Error fetching reaction data:', error);
    }
  };

  const keyExtractor = (item: any) => item.musicId.toString();

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

  const handleFloatingButtonPress = () => {
    setModalVisible(true);
  };

  const handleNavigate = (selectedSongData: any) => {
    setModalVisible(false);
    navigation.navigate('ChildrenInfoReactionRegister', { songId: selectedSongData.id, kidId: child.id, refresh: true });  // 등록 후 refresh 값 전달
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        {child.image ? (
          <Image source={{ uri: child.image }} style={styles.childImage} />
        ) : (
          <Image source={require('../../assets/images/Slumbus_Logo.png')} style={styles.childImage} />
        )}
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{child.name}</Text>
          <Image
            source={getGenderImage(child.gender)}
            style={styles.genderIcMan}
            resizeMode='contain'
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
        songData.length === 0 ? (
          <View style={{alignItems: 'center', paddingVertical: 40}}>
            <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 자장가가 없습니다.</Text>
            <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>작곡 탭에서 자장가를 등록해주세요!</Text>
          </View>
        ) : (
          <FlatList
            data={songData}
            extraData={songData}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Image source={{ uri: item.artwork }} style={styles.photo} />
                <Text style={styles.songTitle}>{item.title}</Text>
                <PlayButton
                  size={32}
                  isPlaying={playingSongId == item.id}
                  onPress={() => handlePlayButtonClick(item.id)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      ) : (
        lullabyData.length === 0 ? (
          songData.length === 0 ? (
            <View style={{alignItems: 'center', paddingVertical: 40}}>
              <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 자장가가 없습니다.</Text>
              <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>작곡 탭에서 자장가를 등록해주세요!</Text>
            </View>
          ) : (
            <View style={{alignItems: 'center', paddingVertical: 40}}>
            <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 자장가 반응 기록이 없습니다.</Text>
              <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>하단의
              <View>
                <TouchableOpacity style={styles.smallButton} disabled={true}>
                  <Image source={require('../../assets/images/ic_add_white.png')} style={styles.smallIc} />
                </TouchableOpacity>
              </View>
              버튼을 통해 자장가 반응을 기록해주세요!</Text>
            </View>
          )
        ) : (
          <View style={styles.reactionListContainer}>
            <Text style={styles.reactionTitle}>자장가 반응 기록</Text>
            <FlatList
              data={lullabyData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChildrenInfoReaction', { 
                    title: item.musicTitle, 
                    selectedSongId: item.musicId,
                    kidId: item.kidId,
                    reactionData: item.reactions })}
                  style={styles.reactionContainer}
                >
                  <View style={styles.lullabyTitleContainer}
                  >
                    <Icon name="play" size={18} color={'#000000'} />
                    <Text style={styles.lullabyTitle}>{item.musicTitle}</Text>
                  </View>
                  {item.reactions.map((reaction: {
                    created: string; emoji: string; comment: string | string | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; 
  }, index: React.Key | null | undefined) => (
                    <View key={index} style={styles.reactionItemContainer}>
                      <Image source={getReactionImage(reaction.emoji)} style={styles.reactionImage} />
                      <View style={styles.reactionContentContainer}>
                        <Text style={styles.reactionContent}>{reaction.comment}</Text>
                        <Text style={styles.reactionDate}>{reaction.created}</Text>
                      </View>
                    </View>
                  ))}
                </TouchableOpacity>
              )}
              keyExtractor={keyExtractor}
            />
          </View>
        )
      )}
      {/* 자장가 반응 추가 버튼 */}
      {showFloatingButton && (
        <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
          <Image source={require('../../assets/images/ic_add_white.png')} style={styles.floatingIc} />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground} />
          <Pressable style={styles.modalView} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modelTextContainer}>
              <Text style={styles.modalText}>반응을 기록할 자장가 선택</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { flex: 1 }]} />
              </View>
            </View>
            {songData.length === 0 ? 
              <View style={{alignItems: 'center', paddingVertical: 40}}>
                <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontFamily: 'SCDream5'}}>등록된 자장가가 없습니다.</Text>
                <Text style={{fontSize: 14, color: '#283882', fontWeight: 'bold', fontFamily: 'SCDream4'}}>작곡 탭에서 자장가를 등록해주세요!</Text>
              </View>
            :
              <FlatList
                  data={songData}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNavigate(item)}>
                      <View style={styles.modalListItemContainer}>
                        <Image source={{ uri: item.artwork }} style={styles.selectPhoto} />
                        <Text style={styles.selectTitle}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
            }
          </Pressable>
        </Pressable>
      </Modal>
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
    marginLeft: 4,
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
    bottom: 70,
    right: 16,
  },
  floatingIc: {
    width: 34,
    height: 34
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',  // 전체 화면의 80% 너비
    height: '50%', // 전체 화면의 60% 높이
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalListItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  modelTextContainer: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'SCDream5',
    marginBottom: 15,
  },
  selectPhoto: {
    width: 38,
    height: 38,
    borderRadius: 5,
  },
  selectTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream5',
    marginLeft: 12,
  },
  smallButton: {
    width: 14,
    height: 14,
    borderRadius: 100,
    backgroundColor: '#283882',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 1,
  },
  smallIc: {
    width: 9,
    height: 9,
  }
});