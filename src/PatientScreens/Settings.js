import React,  { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native';

import { MaterialIcons as Icon } from '@expo/vector-icons';



const SettingsScreen = ({navigation}) => {

 
  const [activeTab, setActiveTab] = useState('Settings');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const handleLogout = () => {
    
    navigation.replace('Profile');
    
  }

  return (
    <View style={styles.container}>
     <View style={styles.containers}>
        <TouchableOpacity style={styles.button} onPress={handleLogout} >
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
      </View>
      {/* Navgation Bar */}
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
    </View>
  );
};

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#d8bfd8',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 16,
      },

      container: {
        flex: 1,
        flexDirection: 'column', 
      },
      containers: {
        flex: 1,
        
        alignItems: 'center',
        paddingTop: 440,
      },
      button: {
        backgroundColor: '#d8bfd8',
        padding: 10,
        borderRadius: 5,
        width: 180,
        padding: 20,
        height: 60,
        alignItems: 'center'
      },
      buttonText: {
        height: 30,
        textAlign: 'center',
    
    
        fontSize: 16,
      },

});

export default SettingsScreen;