import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AlbumJacketProps {
  imageSource?: any;
  text: string;
}

const AlbumJacket: React.FC<AlbumJacketProps> = ({ imageSource, text }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        {imageSource && typeof imageSource === 'string' ? (
          <Image source={{ uri: imageSource }} style={styles.image} />
        ) : (
          <Image source={imageSource || require('../assets/images/Slumbus_Logo.png')} style={styles.image} />
        )}
        <View style={styles.playIcon}>
          <Icon name="play" size={32} color="#fff" />
        </View>
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#dea',
    marginBottom: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default AlbumJacket;
