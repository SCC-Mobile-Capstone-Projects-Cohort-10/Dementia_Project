import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Settings');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const handleLogout = () => {
    navigation.replace('Profile');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Navigation Bar */}
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
        <TouchableOpacity onPress={() => handleNavigation('Settings')}>
          <Icon name="settings" size={30} color={activeTab === 'Settings' ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8', // Light grey background for subtle contrast
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d8bfd8', 
    padding: 12,
    borderRadius: 25,
    width: '70%', 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    paddingVertical: 15, // Increased padding for better touchability
  },
});

export default SettingsScreen;
