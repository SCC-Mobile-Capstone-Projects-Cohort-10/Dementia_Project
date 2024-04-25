import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window'); 

export default function CaregiverCalendar({ navigation }) {
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={34} color="#000" />
        </TouchableOpacity>
        <Text style={styles.introTitle}>Let’s work together to organize your life</Text>
      </View>
      <Text style={styles.introText}>
        Whether it’s setting up appointments, planning dinner dates, or managing important events, we’ve got you covered 🌟📅
      </Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendar}
        />
      </View>
    </View>
  );
}

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
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
  },
  calendarContainer: {
    marginTop: 20,
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
    bottom: 0, 
  },
});
