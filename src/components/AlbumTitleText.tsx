import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AlbumTitleTextProps {
  imageSource: any;
  text: string;
}

const AlbumTitleText: React.FC<AlbumTitleTextProps> = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource.uri ? { uri: imageSource.uri } : require('../assets/images/Slumbus_Logo.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
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
  text: {
    fontSize: 16,
    color: '#283882',
    fontFamily: 'SCDream6',
  },
});

export default AlbumTitleText;
