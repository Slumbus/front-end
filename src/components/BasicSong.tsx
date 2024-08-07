import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface SongProps {
  imageSource?: any;
  title: string;
  child: string;
  url: string;
}

const BasicSong: React.FC<SongProps> = ({ imageSource, title, child, url }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.child}>{child}</Text>
      </View>
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
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#000',
  },
  child: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'SCDream4',
  },
});

export default BasicSong;
