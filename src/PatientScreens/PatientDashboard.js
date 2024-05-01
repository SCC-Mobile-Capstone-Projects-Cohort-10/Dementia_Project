import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { ChangeIntoDarkMode } from '../themecontext';




const MindGameCard = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={game.image} style={styles.gameImage} />
      <Text style={styles.gameName}>{game.name}</Text>
    </TouchableOpacity>
  );
};

const PatientDashboard = ({ navigation }) => {


  const [activeTab, setActiveTab] = useState('PatientDashboard');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };
  const { dark } = useContext(ChangeIntoDarkMode)



  const mindGamesData = [
    { id: '1', name: 'Sudoku', image: require('../img/sudoku.png') },
    { id: '2', name: 'BrainTeaser', image: require('../img/puzzle.png') },
    { id: '3', name: 'Memory Game', image: require('../img/mindgame.jpg') },
  ];

  const memoriesData = [
    { id: '1', name: 'Hannah', image: require('../img/me.jpg') },
    { id: '2', name: 'GrandMa & Kids', image: require('../img/family.jpg') },
    { id: '3', name: 'James Birthday', image: require('../img/birthday.jpg') },
    { id: '4', name: 'Nana', image: require('../img/mother.jpg') },
    { id: '5', name: 'Hannah Graduation', image: require('../img/grad.jpg') },
    { id: '6', name: 'James & Nana 6', image: require('../img/son.jpg') },
    { id: '7', name: 'James', image: require('../img/man2.jpg') },
    { id: '8', name: 'Nana Attended Bible Study', image: require('../img/nanabiblestudy.jpg') },
    { id: '9', name: 'Nana take Selfie', image: require('../img/nanaselfie.jpg') },
    { id: '10', name: 'Nana make  Cinnamon  bread', image: require('../img/nanabread.jpg') },
    { id: '11', name: 'Nana Thesis defense day', image: require('../img/nanathesisday.jpg') },
  ];

  const medicationsData = [
    { id: '1', name: 'Aspirin', dosage: '1 tablet daily' },
    { id: '2', name: 'Lisinopril', dosage: '10 mg once a day' },
  ]


  const renderRoutineItem = ({ item }) => (
    <Text style={styles.routineText}>
      {item.time}: {item.task}
    </Text>
  );

  const renderGameItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigate('MindGame', { game: item })}>
      <Text style={styles.gameText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const onDayPress = () => {
    navigation.navigate('CalendarScreen');
  };

  const handleMindGamesPress = (gameName) => {
    navigation.navigate('MindGameScreen', { gameName });
  };

  const handleMedicationPress = () => {
    navigation.navigate('MedicationManagementScreen');
  };


  const handleGalleryPress = () => {
    navigation.navigate('GalleryScreen');
  };


  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: dark ? 'black' : 'white' }}>
      {/* Top Header with Icons */}
      <ScrollView>
      <View style={styles.topHeader}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: dark ? 'white' : 'black', }}>Hi, Welcome 👋</Text>
        <Icon name="notifications" size={30} onPress={() => { }} style={{ color: dark ? 'white' : 'black' }} />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <Text style={{ fontSize: 18, fontWeight: 'medium', marginTop: 20, paddingHorizontal: 20, color: dark ? "white" : 'black' }}>Multimedia Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => handleNavigation('CalendarScreen')}>
              <View style={styles.card}>
                <Text style={{ fontSize: 18, color: dark ? 'white' : 'black', fontWeight: 'bold', marginBottom: 5 }}>Calendar</Text>
                <Icon name="event" size={34} color="#6F4E37" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('RecordingScreen')}>
              <View style={styles.card}>
                <Text style={{ fontSize: 18, color: dark ? 'white' : 'black', fontWeight: 'bold', marginBottom: 5 }}>Recording</Text>
                <Icon name="mic" size={34} color="#6F4E37" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('EmergencyCall')}>
              <View style={styles.card}>
                <Text style={{ fontSize: 18, color: dark ? 'white' : 'black', fontWeight: 'bold', marginBottom: 5 }}>Make Call</Text>
                <Icon name="call" size={34} color="#6F4E37" />
              </View>
            </TouchableOpacity>
          </ScrollView>


          {/* Mind Games */}
          <Text style={{ fontSize: 18, fontWeight: 'medium', marginTop: 20, paddingHorizontal: 20, color: dark ? 'white' : 'dark' }}>Mind Stimulating Games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mindGamesData.map(game => (
              <MindGameCard
                key={game.id}
                game={game}
                onPress={() => handleMindGamesPress(game.name)}
              />
            ))}
          </ScrollView>

          {/* Medication Management */}
          <Text style={{ fontSize: 18, fontWeight: 'medium', marginTop: 20, paddingHorizontal: 20, color: dark ? 'white' : 'black' }}>Medication Management</Text>
          <View style={styles.medicationsCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {medicationsData.map((medication) => (
                <Text key={medication.name} style={styles.cardContent}>
                  {medication.name} – {medication.dosage}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.cardButton} onPress={handleMedicationPress}>
              <Text style={styles.buttonText}>Manage Medications</Text>
            </TouchableOpacity>
          </View>

          {/* Gallery Section */}
          <ScrollView contentContainerStyle={styles.galleryScrollView}>
            <Text style={{ fontSize: 18, fontWeight: 'medium', marginTop: 20, paddingHorizontal: 20, color: dark ? 'white' : 'black' }}>Your Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {memoriesData.map((memory) => (
                <TouchableOpacity key={memory.id} style={styles.cardContainer} onPress={handleGalleryPress}>
                  <Image source={memory.image} style={styles.gameImage} />
                  <Text style={styles.gameName}>{memory.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>
        </ScrollView>

        {/* Navigation Bar */}
        
      </SafeAreaView>
      </ScrollView>
      <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => handleNavigation('PatientDashboard')}>
            <Icon name="home" size={30} color={activeTab === 'PatientDashboard' ? '#000' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('EmergencyCall')}>
            <Icon name="call" size={30} color={activeTab === 'EmergencyCall' ? '#000' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('PatientLocation')}>
            <Icon name="location-on" size={30} color={activeTab === 'PatientLocation' ? '#000' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Settings')}>
            <Icon name="settings" size={30} color={activeTab === 'Settings' ? '#000' : '#fff'} />
          </TouchableOpacity>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scrollView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  card: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 15,
    marginTop:10,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'medium',
    marginBottom: 5,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingVertical: 19,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationsCard: {
    flex: 2,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    minHeight: 100,
    maxHeight: 140,
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  cardButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#800080',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 10,
  },
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  gameName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d8bfd8',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  galleryScrollView: {
    marginBottom: 30,
  }
});

export default PatientDashboard;