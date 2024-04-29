import React, { useState, useEffect, useContext }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { ChangeIntoDarkMode } from '../themecontext';
import { AntDesign } from '@expo/vector-icons';


const contacts = [
  { name: 'Jesse Pinkman', role: 'Caregiver', phone: '0785617388', image: require('../img/female.jpg') },
  { name: 'Parkinson Park', role: 'Psychiatrist', phone: '0783431312', image: require('../img/man1.jpg') },
  { name: 'James', role: 'Son', phone: '0783431312', image: require('../img/man2.jpg') },
  { name: 'Alice', role: 'Sister', phone: '0783431312', image: require('../img/me.jpg') },
  { name: 'Jeremiah', role: 'Brother', phone: '0783431312', image: require('../img/jerry.jpg') },
  { name: 'Peterson', role: 'Psychiatrist', phone: '0783431312', image: require('../img/maledoctor.jpg') },
];

const CaregiverEmergency = ({ navigation }) => {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const {dark} = useContext(ChangeIntoDarkMode)

  const goBack = () => {
    navigation.goBack();  
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} scrollEnabled={false}>
    <View style={{backgroundColor:dark?'black':'white',padding:20,flex:1}}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="arrowleft" 
          size={44} 
          color="#000" 
          onPress={() => navigation.goBack()} 
          style={{marginRight:20,color:dark?'white':'black',fontSize:30}} 
        />
        <Text style={{fontSize:20,fontWeight:'bold',color:dark?'white':'black'}}>Emergency Contacts</Text>
      </View>
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
              <Icon name="phone" size={24} color="#5a5a5a" style={styles.phoneIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#eef2f3',
  },
  headerContainer: {
    flexDirection: 'row',   
    alignItems: 'center',   
    marginBottom: 20,       
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
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  phoneIcon: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default CaregiverEmergency;
