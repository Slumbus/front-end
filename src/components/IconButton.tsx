import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps {
  IconLibrary: string;
  IconName: string;
  text: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ IconLibrary, IconName, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {IconLibrary == "MaterialCommunityIcons" ? 
        <MCIcon name={IconName} size={28} color="#fff" />
      :
        <MIcon name={IconName} size={26} color="#fff" />
      }
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283882',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 5,
    fontFamily: 'SCDream5',
  },
});

export default IconButton;
