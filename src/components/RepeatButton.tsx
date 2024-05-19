import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RepeatButtonProps {
  onPress: () => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({ onPress }) => {
  const [state, setState] = useState(0);

  const handlePress = () => {
    const nextState = (state + 1) % 3;
    setState(nextState);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {(() => {
        if (state === 0) return <MCIcon name="repeat" size={30} color="#D9D9D9" />;
        else if (state === 1) return <MCIcon name="repeat" size={30} color="#283882" />;
        else if (state === 2) return <MCIcon name="repeat-once"size={30} color="#283882" />;
      })()}
    </TouchableOpacity>
  );
};

export default RepeatButton;
