import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface SliderComponentProps {
  playbackPosition: number;
  setPlaybackPosition: (value: number) => void;
  maximumValue: number;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ playbackPosition, setPlaybackPosition, maximumValue }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Slider
          style={{ width: 340 }}
          value={playbackPosition}
          onValueChange={setPlaybackPosition}
          maximumValue={maximumValue}
          minimumValue={0}
          step={1}
          minimumTrackTintColor="#283882"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#283882"
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>{formatTime(playbackPosition)}</Text>
        <Text style={styles.text}>{formatTime(maximumValue)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 20,
  },
});

export default SliderComponent;
