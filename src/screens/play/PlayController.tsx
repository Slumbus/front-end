import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

interface TrackPlayerControlsOptions {
  waitforBuffer: boolean;
  stopWithApp: boolean;
  alwaysPauseOnInterruption: boolean;
  capabilities: Capability[];
  compactCapabilities: Capability[];
}

const TRACK_PLAYER_CONTROLS_OPTS: TrackPlayerControlsOptions = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
};

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

// export async function addTrack() {
// await TrackPlayer.add([
//   {
//     id: '1',
//     url: 'https://sample-music.netlify.app/death%20bed.mp3',
//     artwork: require('../../assets/images/google.png'),
//     title: 'Make a cup of coffe',
//     artist: 'Powfu',
//     duration: 40,
//   },
// ]);
// }


// export async function setupPlayer() {
//   let isSetup = false;
//   try {
//     await TrackPlayer.getCurrentTrack();
//     isSetup = true
//   } catch (error) {
//     await TrackPlayer.setupPlayer();
//     isSetup = true
//   } finally {
//     return isSetup;
//   }
// }
