import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications'; 
import NotificationScreen from './NotificationScreen';
import { MaterialIcons as Icon } from '@expo/vector-icons';


const PatientLocation = ({navigation}) => {

  const [activeTab, setActiveTab] = useState('PatientLocation');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };


    const handleShareLocation = async () => {
        // Simulate sharing location
        // Replace this with your actual logic to share the location with caregivers
    
        // Trigger a notification
        await sendNotification();
      };
    
      const sendNotification = async () => {
        // Set up the notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Location Shared',
            body: 'The patient has shared their location.',
          },
          trigger: null, 
        });
      };



  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Location permission granted');
        getUserLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('User location:', latitude, longitude);
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={userLocation} title="Patient's Location" />
        </MapView>
      )}
      <TouchableOpacity style={styles.shareButton} onPress={() => console.log('Location shared')}>
        <Text style={styles.shareButtonText}>Share Location</Text>
      </TouchableOpacity>
       <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={() => handleNavigation('PatientDashboard')}>
        <Icon name="home" size={30} color={activeTab === 'PatientDashboard' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('EmergencyCall')}>
        <Icon name="call" size={30} color={activeTab === 'EmergencyCall' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('PatientLocation')}>
        <Icon name="location-on" size={30} color={activeTab === 'PatientLocation' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <Icon name="person" size={30} color={activeTab === 'Profile' ? '#000' : '#fff'} />
      </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 50, 
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    alignSelf: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  shareButton: {
    backgroundColor: '#800080',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    position: 'absolute',
    bottom: 0,
    width: '120%',
    padding: 10
  }
});

export default PatientLocation;
