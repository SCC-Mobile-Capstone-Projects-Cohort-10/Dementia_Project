import React from 'react';
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

const EmergencyCall = ({ navigation }) => {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const goBack = () => {
    navigation.goBack(); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>Emergency Contacts</Text>
        </View>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contact}
            onPress={() => handleCall(contact.phone)}>
            <Image style={styles.contactImage} source={contact.image} />
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
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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

export default EmergencyCall;
