import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePlaybackState, useTrackPlayerEvents, Event } from 'react-native-track-player';

interface PlaybackContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackPosition: number;
  setPlaybackPosition: React.Dispatch<React.SetStateAction<number>>;
  playPress: () => void;
  handlePress: () => void;
  stopPlayback: () => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

interface PlaybackProviderProps {
  children: ReactNode;
}

const events = [
  Event.PlaybackState,
];

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const playbackState: any = usePlaybackState();
  // const isTrackPlaying = useRef('paused'); //paused play loading

  // 음악이 바뀌게 될 시 화면 제어
  useTrackPlayerEvents(events, (event) => {

    if (event.type === Event.PlaybackState) {
      // 트랙 변경 시 실행될 코드
      if (playbackState === true || playbackState === 3) {
        setIsPlaying(true);
      } else if (playbackState === false || playbackState === 2) {
        setIsPlaying(false);
      } else {
        // isPlaying.current = 'loading';
      }
    }
  });

  // useEffect(() => {
  //   console.log('Player State', playbackState);


  //   //set the player state
  //   if (playbackState === true || playbackState === 3) {
  //     setIsPlaying(true);
  //   } else if (playbackState === false || playbackState === 2) {
  //     setIsPlaying(false);
  //   } else {
  //     // isPlaying.current = 'loading';
  //   }
  // }, [playbackState]);

  const playPress = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePress = () => {
    console.log('Button clicked');
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setPlaybackPosition(0);
  };

  return (
    <PlaybackContext.Provider value={{ isPlaying, setIsPlaying, playbackPosition, setPlaybackPosition, playPress, handlePress, stopPlayback }}>
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = (): PlaybackContextType => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};
