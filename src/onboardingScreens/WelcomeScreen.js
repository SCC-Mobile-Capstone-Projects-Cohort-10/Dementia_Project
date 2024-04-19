import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

    const handleOnPressCaregiverDashboard = () => {
        navigation.navigate('CaregiverDashboard');
      };
    

  const waveAnim = useRef(new Animated.Value(0)).current;

   const waveRotation = waveAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });



    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0, 
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: -1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0, 
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, [waveAnim]);
  
   


  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Welcome!!!
      </Text>
      <Animated.Text
        style={[ 
          styles.wavingHand, 
          { transform: [{ rotate: waveRotation }] },
        ]}>
        👋
      </Animated.Text>
      <Text style={styles.additionalText}>We now need to set up a profile. Please select an option which best describes you:</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleOnPressCaregiverDashboard }>
          <Image source={require('../img/caregiver.jpg')} style={styles.image} />
          <Text style={styles.optionText}>I am a caregiver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('PatientDashboard')}>
          <Image source={require('../img/patient.jpg')} style={styles.image} />
          <Text style={styles.optionText}>I am a patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8bfd8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  additionalText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40, 
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  optionButton: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  optionText: {
    color: 'black',
    fontSize: 18,
  },
  wavingHand: {
    fontSize: 24,
    marginRight: 5,
  },
});

export default WelcomeScreen;
