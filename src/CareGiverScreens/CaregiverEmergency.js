import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const contacts = [
  { name: 'Jesse Pinkman', role: 'Caregiver', phone: '0785617388', image: require('../img/female.jpg') },
  { name: 'Parkinson Park', role: 'Psychiatrist', phone: '0783431312', image: require('../img/man1.jpg') },
  { name: 'Charles', role: 'Supervisor', phone: '0783431312', image: require('../img/man2.jpg') },
  { name: 'Alice', role: 'NanaSister', phone: '0783431312', image: require('../img/me.jpg') },
  { name: 'Jeremiah', role: 'NanaBrother', phone: '0783431312', image: require('../img/jerry.jpg') },
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
    backgroundColor: '#F9F9F9',  
    padding: 20,
  },
  header: {
    fontSize: 24,  
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#333',  
  },
  contact: {
    flexDirection: 'row',  
    alignItems: 'center',  
    backgroundColor: '#FFFFFF', 
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImageContainer: {
    marginRight: 15,
  },
  contactImage: {
    width: 60, 
    height: 60,
    borderRadius: 30,  
  },
  contactDetails: {
    flex: 1,
    marginRight: 10,  
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2, 
  },
  contactRole: {
    fontSize: 14,  
    color: '#555',  
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ececec',  
    borderTopWidth: 1, 
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,  
  }
});

export default CaregiverEmergency;
