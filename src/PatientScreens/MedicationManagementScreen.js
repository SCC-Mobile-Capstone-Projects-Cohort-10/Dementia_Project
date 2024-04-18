import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const MedicationManagementScreen = ({ navigation }) => {
  
  const medications = [
    { name: 'Fabutaz Tab', time: '8:00 AM', taken: true },
    { name: 'Thyroxin Sodium Tab', time: '8:00 AM', taken: true },
    { name: 'Thyroxin Sodium Tab', time: '10:00 AM', taken: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Medication Schedule</Text>
      </View>
      {medications.map((med, index) => (
        <TouchableOpacity
          key={index}
          style={styles.medicationItem}
          onPress={() => console.log(`Selected ${med.name}`)}
        >
          <Text style={styles.medicationName}>{med.name}</Text>
          <Text style={styles.medicationTime}>{med.time}</Text>
          <Text style={styles.medicationStatus}>{med.taken ? 'Taken' : 'Not Taken'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  medicationName: {
    fontSize: 16,
  },
  medicationTime: {
    fontSize: 14,
    color: '#888888',
  },
  medicationStatus: {
    fontSize: 14,
    color: '#009688',
  },
});

export default MedicationManagementScreen;


