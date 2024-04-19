import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const CaregiverNotificationScreen = ({ navigation }) => {
  // Function to send location
  const sendLocation = () => {
    // Placeholder for location data
    const location = "123 Patient St, Caregiver City";

    // Navigate to CaregiverScreen with location data
    navigation.navigate('CaregiverScreen', { location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Location Notification</Text>
      <Button title="Send Location to Caregiver" onPress={sendLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default CaregiverNotificationScreen;
