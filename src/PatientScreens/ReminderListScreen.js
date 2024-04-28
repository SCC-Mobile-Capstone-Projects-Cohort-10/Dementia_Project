import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons

const ReminderListScreen = ({ route, navigation }) => {
  const { reminders } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Reminders</Text>
      </View>
      {Object.keys(reminders).map(key => (
        <View key={key} style={styles.reminderContainer}>
          <Text style={styles.dateText}>{key}</Text>
          <Text style={styles.titleText}>{reminders[key].title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1, 
  },
  reminderContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  titleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default ReminderListScreen;
