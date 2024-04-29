import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MedicationManagementScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Fabutaz Tab', time: new Date(), taken: false },
    { id: 2, name: 'Thyroxin Sodium Tab', time: new Date(), taken: false },
  ]);
  const [newMedication, setNewMedication] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMedicationIndex, setSelectedMedicationIndex] = useState(-1);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      settings = await Notifications.requestPermissionsAsync();
    }
    console.log('Notification permissions status:', settings.status);
  };

  const scheduleNotification = async (medication) => {
    console.log(`Attempting to schedule notification for ${medication.name} at ${medication.time}`);
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to take medication",
        body: `It's time to take your ${medication.name}`,
        data: { id: medication.id },
      },
      trigger: {
        hour: medication.time.getHours(),
        minute: medication.time.getMinutes(),
        repeats: true,
      },
    });
    console.log(`Scheduled with identifier: ${identifier}`);
  };

  const handleTimeSelect = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate && selectedMedicationIndex !== -1) {
      const updatedMedications = medications.map((med, index) =>
        index === selectedMedicationIndex ? { ...med, time: selectedDate, taken: false } : med
      );
      setMedications(updatedMedications);
      scheduleNotification(updatedMedications[selectedMedicationIndex]);
    }
  };

  const addMedication = () => {
    const newId = medications.length ? medications[medications.length - 1].id + 1 : 1;
    const newMed = { id: newId, name: newMedication, time: new Date(), taken: false };
    setMedications(prev => [...prev, newMed]);
    scheduleNotification(newMed);
    setNewMedication('');
  };

  const deleteMedication = (index) => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this medication?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => {
        Notifications.cancelScheduledNotificationAsync(medications[index].id.toString());
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Medication Schedule</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add new medication"
        value={newMedication}
        onChangeText={setNewMedication}
        placeholderTextColor="#555"
        clearButtonMode="while-editing"
      />
      <Button title="Add Medication" color="#007BFF" onPress={addMedication} />
      {medications.map((med, index) => (
        <View key={index} style={styles.medicationItem}>
          <TouchableOpacity onPress={() => {
            setShowPicker(true);
            setSelectedMedicationIndex(index);
          }}>
            <Text style={styles.medicationName}>{med.name}</Text>
            <Text style={styles.medicationTime}>{med.time.toLocaleTimeString()}</Text>
            <Text style={styles.medicationStatus}>{med.taken ? 'Taken' : 'Not Taken'}</Text>
          </TouchableOpacity>
          <Button title="Delete" color="#FF6347" onPress={() => deleteMedication(index)} />
        </View>
      ))}
      {showPicker && (
        <DateTimePicker
          value={medications[selectedMedicationIndex]?.time || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeSelect}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginVertical: 5,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationTime: {
    fontSize: 16,
    color: '#555',
  },
  medicationStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#009688',
  },
});

export default MedicationManagementScreen;
