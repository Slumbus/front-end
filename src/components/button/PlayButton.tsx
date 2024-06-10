import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayback } from '../../contexts/PlaybackContext';

interface PlayButtonProps {
  size: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({size}) => {
  const { isPlaying, playPress } = usePlayback();

  return (
    <TouchableOpacity onPress={playPress}>
      {isPlaying ? (
        <Icon name="pause-circle" size={size} color={'#283882'} />
      ) : (
        <Icon name="play-circle" size={size} color={'#283882'} />
      )}
    </TouchableOpacity>
  );
};

export default PlayButton;