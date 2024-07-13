import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RepeatButton: React.FC = () => {
  const [state, setState] = useState(0);

  const handlePress = async () => {
    const nextState = (state + 1) % 3;
    console.log("상태: "+nextState);
    setState(nextState);
    console.log("바뀐상태:"+ state);
  };

  useEffect(() => {
    console.log("현재 상태: " + state);
    const changeRepeatMode = async () => { // Off: 큐 반복 x, track: 한곡만 재생, Queue 전체 목록 반복 재생
      if (state === 0) { //반복 x
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        console.log("큐 반복x");
        const mode = await TrackPlayer.getRepeatMode();
        console.log("모드: "+ mode); //0
      } else if( state === 1) { // 전체 반복
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        console.log("전체 반복");
        const mode = await TrackPlayer.getRepeatMode();
          console.log("모드: "+ mode); //2
      } else if (state === 2) { // 한 곡 반복
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        console.log("한곡 반복");
        const mode = await TrackPlayer.getRepeatMode();
      }
    };
    changeRepeatMode();
  }, [state]);

  // const setRepeatMode = async () => { // Off: 큐 반복 x, track: 한곡만 재생, Queue 전체 목록 반복 재생
  //   if (state === 0) { //반복 x
  //     await TrackPlayer.setRepeatMode(RepeatMode.Off); //0
  //     console.log("큐 반복x");
  //     const mode = await TrackPlayer.getRepeatMode();
  //       console.log("모드: "+ mode);
  //   } else if( state === 1) { // 전체 반복
  //     await TrackPlayer.setRepeatMode(RepeatMode.Queue); //2
  //     console.log("전체 반복");
  //     const mode = await TrackPlayer.getRepeatMode();
  //       console.log("모드: "+ mode);
  //   } else if (state === 2) { // 한 곡 반복
  //     await TrackPlayer.setRepeatMode(RepeatMode.Track); //1
  //     console.log("한곡 반복");
  //     const mode = await TrackPlayer.getRepeatMode();
  //       console.log("모드: "+ mode);
  //   }
  // };

  return (
    <TouchableOpacity onPress={handlePress}>
      {(() => {
        if (state === 0) return <MCIcon name="repeat" size={30} color="#D9D9D9" />;
        else if (state === 1) return <MCIcon name="repeat" size={30} color="#283882" />;
        else if (state === 2) return <MCIcon name="repeat-once"size={30} color="#283882" />;
      })()}
    </TouchableOpacity>
  );
};

export default RepeatButton;
