import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Logo = () => (
  <Image
    source={require('../assets/images/Slumbus_Logo_long_ver.png')}
    style={{ width: 180, height: 35 }}
  />
);

interface IconButtonProps {
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress }) => (  
<TouchableOpacity onPress={onPress} style={{marginRight: 5}}>
    <Icon name="circle-user" size={30} color="#283882" />
  </TouchableOpacity>
);

export { Logo, IconButton };
