import React, { createContext, useState, useContext, ReactNode, useEffect, useRef  } from 'react';
import Sound from 'react-native-sound';

interface Music {
  title: string;
  picture: string;
  lyrics: string;
  music: string;
}

interface PlaybackContextType {
  currentTrack: Music | null;
  currentTrackIndex: number;
  trackList: Music[];
  setTrackList: (trackList: Music[], startTrack?: Music) => void;
  playTrack: (track: Music) => void;
  playbackPosition: number;
  setPlaybackPosition: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isShuffle: boolean;
  toggleShuffle: () => void;
  repeatMode: number;
  toggleRepeat: () => void;

  playPress: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

interface PlaybackProviderProps {
  children: ReactNode;
}

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackList, setTrackListState] = useState<Music[]>([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  const soundRef = useRef<Sound | null>(null);

  const setTrackList = (newTrackList: Music[], startTrack?: Music) => {
    setTrackListState(newTrackList);
    if (startTrack) {
      const startIndex = newTrackList.findIndex(track => track.title === startTrack.title);
      setCurrentTrackIndex(startIndex);
      playTrack(startTrack);
    }
  };

  const playTrack = (track: Music) => {
    if (soundRef.current) {
      soundRef.current.release();
    }
    soundRef.current = new Sound(track.music, '', (error) => {
      if (error) {
        console.log('파일 불러오기 실패', error);
        return;
      }
      setCurrentTrack(track);
      setIsPlaying(true);
      soundRef.current?.play((success) => {
        if (success) {
          console.log('재생 성공, 재생 중인 트랙: ', currentTrackIndex);
          handleEndOfTrack();
        } else{
          console.log('재생 실패: 오디오 디코딩 오류');
        }
      });
    });
  };

  const handleEndOfTrack = () => {
    if (repeatMode === 2) {
      playTrack(currentTrack!);
    } else if (repeatMode === 1) {
      nextTrack();
    }
  };

  const playPress = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
        console.log('노래 멈춤');
      } else {
        soundRef.current.play((success) => {
          if (success) {
            console.log('노래 재생');
          } else {
            console.log('재생 실패: 오디오 디코딩 오류');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (trackList.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % trackList.length;
      playTrack(trackList[nextIndex]);
      setCurrentTrackIndex(nextIndex);
    };
  }

  const prevTrack = () => {
    if (trackList.length > 0) {
      const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
      playTrack(trackList[prevIndex]);
      setCurrentTrackIndex(prevIndex);
    };
  }

  const toggleShuffle = () => {
    const shuffledList = [...trackList].sort(() => Math.random() - 0.5);
    setTrackListState(shuffledList);
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setRepeatMode((prevMode) => (prevMode + 1) % 3);
    console.log(repeatMode);
  };

  return (
    <PlaybackContext.Provider value={{
      currentTrack,
      currentTrackIndex,
      trackList,
      setTrackList,
      playTrack,
      playbackPosition,
      setPlaybackPosition,
      isPlaying,
      setIsPlaying,
      isShuffle,
      toggleShuffle,
      repeatMode,
      toggleRepeat,
      playPress,
      nextTrack,
      prevTrack,
    }}>
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
