import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface LyricSongProps {
  imageSource?: any;
  title: string;
  child: string;
  onPress?: () => void;
}

const LyricSong: React.FC<LyricSongProps> = ({ imageSource, title, child, onPress }) => {
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
    fontWeight: 'bold',
    color: '#000',
  },
  child: {
    fontSize: 12,
    color: '#000',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#283882',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LyricSong;
