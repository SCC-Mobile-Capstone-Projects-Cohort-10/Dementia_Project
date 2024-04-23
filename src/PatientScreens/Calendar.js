import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

export default function CalendarScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('CalendarScreen');
  const [markedDates, setMarkedDates] = useState({});
  const [reminders, setReminders] = useState({
    "2024-04-24": { title: "Meeting" }
  });

  useEffect(() => {
    const newMarkedDates = {};
    Object.keys(reminders).forEach(date => {
      newMarkedDates[date] = { marked: true, dotColor: 'red' };
    });
    setMarkedDates(newMarkedDates);
  }, [reminders]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const handleDayPress = (day) => {
    navigation.navigate('ReminderScreen', {
      selectedDate: day.dateString,
      addReminder: handleAddReminder
    });
  };

  const handleAddReminder = (date, title) => {
    const newMarkedDates = { ...markedDates, [date]: { marked: true, dotColor: 'red' } };
    setMarkedDates(newMarkedDates);
    const newReminders = { ...reminders, [date]: { title } };
    setReminders(newReminders);
  };

  return (
    <View style={styles.container}>
     <Text style={styles.introTitle}> Let’s work together to organize your life</Text>
  <Text style={styles.introText}>
  Whether it’s setting up appointments, planning dinner dates, or managing important events, we’ve got you covered 🌟📅s
  </Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendar}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => handleNavigation('PatientDashboard')}>
          <Icon name="home" size={30} color={activeTab === 'PatientDashboard' ? '#000' : '#ddd'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('EmergencyCall')}>
          <Icon name="call" size={30} color={activeTab === 'EmergencyCall' ? '#000' : '#ddd'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('CalendarScreen')}>
          <Icon name="event" size={30} color={activeTab === 'CalendarScreen' ? '#000' : '#ddd'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center', 
  },
  introTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
   // marginTop: 20,
   marginBottom: 40,
  },
  introText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
  },
  calendarContainer: {
  marginTop:40,
  width: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    width: screenWidth,
    padding: 10,
    height: 45,
    position: 'absolute',
    bottom: 0, // Keeps it at the bottom
  },
});
