import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { usePlayback } from '../../contexts/PlaybackContext';

const ShuffleButton: React.FC = () => {
  const { isShuffle, toggleShuffle } = usePlayback();

  const handlePress = () => {
    toggleShuffle();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {isShuffle ? (
        <Icon name="shuffle" size={24} color={'#283882'} />
      ) : (
        <Icon name="shuffle" size={24} color={'#D9D9D9'} />
      )}
    </TouchableOpacity>
  );
};

export default ShuffleButton;