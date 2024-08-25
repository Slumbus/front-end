import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface LyricSongProps {
  imageSource?: any;
  title: string;
  child: string;
  onPress?: () => void;
}

const LyricSong: React.FC<LyricSongProps> = ({ imageSource, title, child, onPress, onPress2, onPress3 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.child}>{child}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="pencil-alt" size={16} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={onPress2}>
        <Icon name="pencil-alt" size={10} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={onPress3}>
        <Icon name="trash-alt" size={10} color="#f44" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: 'none',
    marginBottom: 10,
    marginHorizontal: 35,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#000',
  },
  child: {
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#000',
  },
  button: {
    width: 30,
    height: 30,
    marginHorizontal: 3,
    borderRadius: 15,
    backgroundColor: '#283882',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: 20,
    height: 20,
    marginHorizontal: 1.5,
    borderRadius: 15,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LyricSong;
