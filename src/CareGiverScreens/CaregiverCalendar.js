import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const { width: screenWidth } = Dimensions.get('window');

export default function CaregiverCalendar({ navigation }) {
  const [activeTab, setActiveTab] = useState('CalendarScreen');
  const [markedDates, setMarkedDates] = useState({});
  const [reminders, setReminders] = useState({
    "2024-04-24": { title: "Meeting" }
  });

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };


  useEffect(() => {
    registerForPushNotificationsAsync();
    const newMarkedDates = {};
    Object.keys(reminders).forEach(date => {
      newMarkedDates[date] = { marked: true, dotColor: '#FF6347', selected: true, selectedColor: '#FFD700' };
    });
    setMarkedDates(newMarkedDates);
  }, [reminders]);

  async function registerForPushNotificationsAsync() {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    }
  }

  async function scheduleNotification(date, title) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: title,
        data: { data: 'goes here' },
      },
      trigger: new Date(date + 'T09:00:00')
    });
  }

  const handleDayPress = (day) => {
    navigation.navigate('ReminderScreen', {
      selectedDate: day.dateString,
      addReminder: handleAddReminder
    });
  };

  const handleAddReminder = (date, title) => {
    const newMarkedDates = { ...markedDates, [date]: { marked: true, dotColor: '#FF6347', selected: true, selectedColor: '#FFD700' } };
    setMarkedDates(newMarkedDates);
    const newReminders = { ...reminders, [date]: { title } };
    setReminders(newReminders);
    scheduleNotification(date, title); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introTitle}>Let’s Organize Your Days!</Text>
      <Text style={styles.introText}>
        Click on a date to view or add reminders.
      </Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            textDayFontSize: 18,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16
          }}
          style={styles.calendar}
        />
      </View>
      <View style={styles.viewRemindersButton}>
        <Button
          title="View All Reminders"
          onPress={() => navigation.navigate('ReminderListScreen', { reminders: reminders })}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => handleNavigation('CaregiverDashboard')}>
          <Icon name="home" size={26} color={activeTab === 'CaregiverDashboard' ? '#000' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('CaregiverEmergency')}>
          <Icon name="call" size={26} color={activeTab === 'CaregiverEmergency' ? '#000' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('CaregiverCalendar')}>
          <Icon name="event" size={26} color={activeTab === 'CaregiverCalendar' ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginVertical: 10,
  },
  calendarContainer: {
    marginTop: 20,
    width: '90%',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    width: screenWidth,
    padding: 10, 
    borderTopWidth: 1,
    borderColor: '#ddd',
    height: 50, 
    position: 'absolute',
    bottom: 0,
  },
  
  viewRemindersButton: {
    marginBottom: 20, 
  },
});
