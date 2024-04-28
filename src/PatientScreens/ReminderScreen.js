import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ReminderScreen({ route, navigation }) {
  const { selectedDate, addReminder } = route.params;
  const [reminderTitle, setReminderTitle] = useState('');
  const [savedReminder, setSavedReminder] = useState(null);

  const handleSaveReminder = () => {
    if (reminderTitle.trim()) {
      addReminder(selectedDate, reminderTitle);
      setSavedReminder(reminderTitle);
      setReminderTitle('');
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a Reminder for {selectedDate}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your reminder here"
        value={reminderTitle}
        onChangeText={setReminderTitle}
        clearButtonMode="while-editing"
        returnKeyType="done"
        placeholderTextColor="#aaa"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
        <Text style={styles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>

      {savedReminder && (
        <Text style={styles.savedReminder}>
          Reminder for {selectedDate}: {savedReminder}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a5a5a',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#d8bfd8',
    borderWidth: 2,
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#333',
    alignSelf: 'center', 
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#d8bfd8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center', 
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  savedReminder: {
    fontSize: 18,
    color: '#d8bfd8',
    marginTop: 20,
    alignSelf: 'center', 
  },
});
