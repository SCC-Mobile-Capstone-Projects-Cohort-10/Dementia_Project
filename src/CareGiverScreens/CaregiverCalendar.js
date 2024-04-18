import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons as Icon } from '@expo/vector-icons';




export default function CaregiverCalendar({ navigation }) {

  const [activeTab, setActiveTab] = useState('CaregiverCalendar');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };



  const [markedDates, setMarkedDates] = useState({});


  const [reminders, setReminders] = useState({
    "2024-04-24": { title: "Meeting" }
    // Initialize with existing reminders
  });

  useEffect(() => {
    // Mark dates with reminders
    const newMarkedDates = {};
    Object.keys(reminders).forEach(date => {
      newMarkedDates[date] = { marked: true, dotColor: 'red' };
    });
    setMarkedDates(newMarkedDates);
  }, [reminders]); // Update marked dates when reminders change


  const handleDayPress = (day) => {
    // Navigate to the ReminderScreen with the selected date
    navigation.navigate('ReminderScreen', {
      selectedDate: day.dateString,
      addReminder: handleAddReminder 
    });
  };

  const handleAddReminder = (date, title) => {
    const newMarkedDates = { ...markedDates, [date]: { marked: true, dotColor: 'red' } };
    setMarkedDates(newMarkedDates);
  
    // Also update your reminders state (if needed)
    const newReminders = { ...reminders, [date]: { title } };
    setReminders(newReminders);
  };
  

  return (
    <View style={styles.container}>
      <Text>Select a date:</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center', 
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#333',
  },
  input: {
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1,
    marginBottom: 20, 
    paddingHorizontal: 15, 
    borderRadius: 10, 
    fontSize: 16, 
    backgroundColor: '#fff', 
  },
  savedReminder: {
    fontSize: 16,
    color: '#28a745', 
    marginTop: 10, 
    textAlign: 'center', 
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8', 
    position: 'absolute',
    bottom: 0,
    width: '120%',
    padding: 10
  }
});