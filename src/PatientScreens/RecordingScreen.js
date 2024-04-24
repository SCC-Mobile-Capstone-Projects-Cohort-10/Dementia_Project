import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const RecordingScreen = ({navigation}) => {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState(null);

  const startRecording = async () => {
    console.log('Requesting permissions...');
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted to use microphone');
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await newRecording.startAsync();
    setRecording(newRecording);
    console.log('Recording started');
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordings(prevRecordings => [...prevRecordings, { uri }]);
    setRecording(null);
    console.log('Recording stopped and stored at', uri);
  };

  const playSound = async (uri) => {
    console.log('Loading Sound...');
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    console.log('Playing Sound...');
    await sound.playAsync();
  };

  const deleteRecording = (uri) => {
    console.log('Deleting recording...');
    setRecordings(prevRecordings => prevRecordings.filter(recording => recording.uri !== uri));
    console.log('Recording deleted successfully');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Recording Screen</Text>
      </View>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.button}>
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {recordings.map((recording, index) => (
          <View key={index} style={styles.recordingList}>
            <Text style={styles.paragraph}>Recording {index + 1}</Text>
            <TouchableOpacity onPress={() => playSound(recording.uri)} style={styles.smallButton}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteRecording(recording.uri)} style={[styles.smallButton, { backgroundColor: '#600060' }]}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f4f4f8', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
  },
  button: {
    backgroundColor: '#800080',
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8,
    minWidth: 200, 
    alignItems: 'center',
    justifyContent: 'center', 
    marginVertical: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18, 
    fontWeight: '600', 
  },
  scrollView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 20,
  },
  recordingList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '95%', 
  },
  smallButton: {
    backgroundColor:'#004080', 
    padding: 10,
    borderRadius: 5,
  },
  paragraph: {
    color: '#000',
    fontSize: 16, 
  },
  
});

export default RecordingScreen;
