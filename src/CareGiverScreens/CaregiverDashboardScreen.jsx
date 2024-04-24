import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons as Icon } from '@expo/vector-icons';



const mapStyle = [
 {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
 }
];

const CaregiverDashboard = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('CaregiverDashboard');
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

    const [patientLocation, setPatientLocation] = useState({
        latitude: 0, 
        longitude: 0, 
      });
      useEffect(() => {
        requestLocationPermission();
      }, []);
    
      const requestLocationPermission = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            console.log('Location permission granted');
            getPatientLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (error) {
          console.error('Error requesting location permission:', error);
        }
      };
    
      const getPatientLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          console.log('Patient location:', latitude, longitude);
          setPatientLocation({ latitude, longitude });
        } catch (error) {
          console.error('Error getting patient location:', error);
        }
      };
    
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome Sarah  👋</Text>
      <TouchableOpacity 
      style={styles.notificationIcon}
      onPress={() => navigation.navigate('CaregiverNotificationScreen')}  
    >
      <Icon name="notifications" size={24} color="#fff" />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>3</Text>  
      </View>
    </TouchableOpacity>
    </View>
      <MapView
        style={styles.map}
        region={
            patientLocation
              ? {
                  latitude: patientLocation.latitude,
                  longitude: patientLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : null
       }
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        apiKey={"AIzaSyA_cKyR2OAgoQSzTUfCq-vqFe9WOeQ1rjs"} 
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: patientLocation.latitude,
              longitude: patientLocation.longitude,
             }}
          title="Patient's Location"
        />
      </MapView>
      <Button
        title="View Patient's Location"
        onPress={() => console.log('Viewing patient location')}
      />
       <View style={styles.bottomContainer}>
       <TouchableOpacity onPress={() => handleNavigation('CaregiverDashboard')}>
        <Icon name="home" size={30} color={activeTab === 'CaregiverDashboard' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('CaregiverEmergency')}>
        <Icon name="call" size={30} color={activeTab === 'CaregiverEmergency' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('CaregiverCalendar')}>
        <Icon name="event" size={30} color={activeTab === 'CaregiverCalendar' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('EducationScreen')}>
        <Icon name="school" size={30} color={activeTab === 'EducationScreen' ? '#000' : '#fff'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Settings')}>
        <Icon name="settings" size={30} color={activeTab === 'Settings' ? '#000' : '#fff'} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'  
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d8bfd8',
    paddingHorizontal: 15,
    paddingVertical: 20,  
    height: 60,  
  },
  headerText: {
    fontSize: 20,
    color: '#fff',  
    fontWeight: 'bold' 
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  map: {
    flex: 1
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10
  }
});
export default CaregiverDashboard;

