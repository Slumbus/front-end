import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShuffleButton from '../../components/button/ShuffleButton';
import PlayButton from '../../components/button/PlayButton';
import RepeatButton from '../../components/button/RepeatButton';

interface PlayButtonBarContainerProps {
  isPlaying: boolean;
  onPlayPress: () => void;
  onShufflePress: () => void;
  onPreviousPress: () => void;
  onNextPress: () => void;
  onRepeatPress: () => void;
}

const PlayButtonBarContainer: React.FC<PlayButtonBarContainerProps> = ({
  isPlaying,
  onPlayPress,
  onShufflePress,
  onPreviousPress,
  onNextPress,
  onRepeatPress,
}) => {
  return (
    <View style={styles.container}>
      <ShuffleButton onPress={onShufflePress} />
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={onPreviousPress}>
          <Icon name="play-skip-back" size={30} color={'#283882'} />
        </TouchableOpacity>
        <PlayButton isPlaying={isPlaying} onPress={onPlayPress} size={70} />
        <TouchableOpacity onPress={onNextPress}>
          <Icon name="play-skip-forward" size={30} color={'#283882'} />
        </TouchableOpacity>
      </View>
      <RepeatButton onPress={onRepeatPress} />
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
    marginVertical: 35,
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
});

export default PlayButtonBarContainer;
