import React from 'react';
import { TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePlayback } from '../../contexts/PlaybackContext';

const RepeatButton: React.FC = () => {
  const { repeatMode, toggleRepeat } = usePlayback();

  const handlePress = () => {
    toggleRepeat();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {repeatMode === 0 ? (
        <MCIcon name="repeat" size={30} color="#D9D9D9" />
      ) : repeatMode === 1 ? (
        <MCIcon name="repeat" size={30} color="#283882" />
      ) : (
        <MCIcon name="repeat-once" size={30} color="#283882" />
      )}
    </TouchableOpacity>
  );
};

export default RepeatButton;
