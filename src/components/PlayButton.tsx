import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlayButtonProps {
  size: number;
  isPlaying: boolean;
  onPress: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({size, isPlaying, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {isPlaying ? (
        <Icon name="play-circle" size={size} color={'#283882'} />
      ) : (
        <Icon name="pause-circle" size={size} color={'#283882'} />
      )}
    </TouchableOpacity>
  );
};

export default PlayButton;