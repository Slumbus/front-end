import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Event, useProgress } from 'react-native-track-player';
import {PlaybackActiveTrackChangedEvent} from 'react-native-track-player';

interface SliderComponentProps {
  playbackPosition: number;
  setPlaybackPosition: (value: number) => void;
  maximumValue: number;
}

const SliderComponent: React.FC<SliderComponentProps> = () => {
  const {position, duration} = useProgress(1000);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  // 음악 분 초 변경
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {
      setIsSeeking(false);
    });
  }, []);

  const handleChange = (val: any) => {
    TrackPlayer.seekTo(val);
    TrackPlayer.play().then(() => {
      setTimeout(() => {
        setIsSeeking(false);
      }, 1000);
    });
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Slider
          style={{ width: 340 }}
          value={isSeeking ? seek : position}
          // onValueChange={setPlaybackPosition}
          maximumValue={duration}
          step={1}
          onSlidingComplete={handleChange}
          minimumTrackTintColor="#283882"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#283882"
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>{formatTime(isSeeking ? seek : position)}</Text>
        <Text style={styles.text}>{formatTime(duration)}</Text>
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
