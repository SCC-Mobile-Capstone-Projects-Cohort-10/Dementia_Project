import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const contacts = [
  { name: 'Jesse Pinkman', role: 'Caregiver', phone: '0785617388', image: require('../img/female.jpg') },
  { name: 'Parkinson Park', role: 'Psychiatrist', phone: '0783431312', image: require('../img/man1.jpg') },
  { name: 'James', role: 'Son', phone: '0783431312', image: require('../img/man2.jpg') },
  { name: 'Alice', role: 'Sister', phone: '0783431312', image: require('../img/me.jpg') },
  { name: 'Jeremiah', role: 'Brother', phone: '0783431312', image: require('../img/jerry.jpg') },
  { name: 'Peterson', role: 'Psychiatrist', phone: '0783431312', image: require('../img/maledoctor.jpg') },
];

const CaregiverEmergency = ({navigation}) => {

  const [activeTab, setActiveTab] = useState('CaregiverEmergency');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };



  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} scrollEnabled={false}>
      <View style={styles.container}>
        <Text style={styles.header}>Emergency Contacts</Text>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contact}
            onPress={() => handleCall(contact.phone)}>
            <View style={styles.contactInfo}>
              <View style={styles.contactImageContainer}>
                <Image style={styles.contactImage} source={contact.image} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRole}>{contact.role}</Text>
              </View>
              <Icon name="phone" size={20} color="#d8bfd8" /> 
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
        <TouchableOpacity onPress={() => handleNavigation('Profile')}>
          <Icon name="person" size={30} color={activeTab === 'Profile' ? '#000' : '#fff'} />
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contact: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  contactImageContainer: {
    marginRight: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactRole: {
    fontSize: 16,
    color: '#666',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8', 
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,  
    // height: 20 
  }
});

export default CaregiverEmergency;
