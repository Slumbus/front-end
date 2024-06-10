import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShuffleButton from '../../components/button/ShuffleButton';
import PlayButton from '../../components/button/PlayButton';
import RepeatButton from '../../components/button/RepeatButton';
import { usePlayback } from '../../contexts/PlaybackContext';

const PlayButtonBarContainer: React.FC = () => {
  const { nextTrack, prevTrack } = usePlayback();

  return (
    <View style={styles.container}>
      <ShuffleButton />
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={prevTrack}>
          <Icon name="play-skip-back" size={30} color={'#283882'} />
        </TouchableOpacity>
        <PlayButton size={70} />
        <TouchableOpacity onPress={nextTrack}>
          <Icon name="play-skip-forward" size={30} color={'#283882'} />
        </TouchableOpacity>
      </View>
      <RepeatButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 25,
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
});

export default PlayButtonBarContainer;
