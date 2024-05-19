import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface ShuffleButtonProps {
  onPress: () => void;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({onPress}) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive((prev) => !prev);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {isActive ? (
        <Icon name="shuffle" size={24} color={'#283882'} />
      ) : (
        <Icon name="shuffle" size={24} color={'#D9D9D9'} />
      )}
    </TouchableOpacity>
  );
};

export default ShuffleButton;