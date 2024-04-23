// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';
// import TrackPlayer from 'react-native-track-player';
// import Slider from '@react-native-community/slider';

// const MusicScreen = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [audioPath, setAudioPath] = useState(null);
//     const [sound, setSound] = useState(null);
  
//     useEffect(() => {
//       // Initialize TrackPlayer
//       TrackPlayer.setupPlayer();
  
//       // Add a track (replace with your own audio file)
//       TrackPlayer.add({
//         id: 'myTrack',
//         url: 'https://example.com/my-audio.mp3',
//         title: 'My Song',
//         artist: 'Artist Name',
//       });
//     }, []);
  
//     const togglePlayPause = async () => {
//       if (isPlaying) {
//         await TrackPlayer.pause();
//       } else {
//         await TrackPlayer.play();
//       }
//       setIsPlaying(!isPlaying);
//     };
  
//     const onSliderValueChange = (value) => {
//       TrackPlayer.seekTo(value);
//     };
  
//     return (
//       <View style={styles.container}>
//         <Text>Music Player</Text>
//         <TouchableOpacity onPress={togglePlayPause}>
//           <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
//         </TouchableOpacity>
//         <Slider
//           value={0} // Set initial value
//           minimumValue={0}
//           maximumValue={100}
//           onValueChange={onSliderValueChange}
//         />
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
// });

// export default MusicScreen;
