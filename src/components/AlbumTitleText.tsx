import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AlbumTitleTextProps {
  imageSource: any;
  text1: string;
  text2: string;
}

const AlbumTitleText: React.FC<AlbumTitleTextProps> = ({ imageSource, text1, text2 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
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
    marginTop: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textContainer: {
    flexDirection: 'column',
  },
  text1: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'SCDream4',
  },
  text2: {
    fontSize: 16,
    color: '#283882',
    fontFamily: 'SCDream6',
  },
});

export default AlbumTitleText;
