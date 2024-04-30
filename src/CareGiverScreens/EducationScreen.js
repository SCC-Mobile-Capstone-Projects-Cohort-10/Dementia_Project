import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Video } from 'expo-av'; 
import { ChangeIntoDarkMode } from '../themecontext';

const EducationScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const {dark} = useContext(ChangeIntoDarkMode)
   
   
    const [activeTab, setActiveTab] = useState('EducationScreen');

    const handleNavigation = (tab) => {
      setActiveTab(tab);
      navigation.navigate(tab);
    };
  


  
  const resources = [
    {
      title: 'Understanding Dementia',
      content:
        'Learn about the different types of dementia, symptoms, and stages of progression: \n\n' +
        'Types of Dementia:\n'+
        '*Alzheimer’s disease\n'+
        '*Vascular dementia\n'+
        '*Lewy body dementia\n'+
        '*Frontotemporal dementia\n'+
        '*Mixed dementia\n'+
        'Symptoms:\n'+
        '-Memory loss\n'+
        '-Communication difficulties\n'+
        '-Behavioral changes\n'+
        '-Cognitive decline\n'+
        'Stages of Progression\n'+
        '*Early stage\n'+
        '*Middle stage\n'+
        '*Late stage',
        image: require('../img/Boredom-blog-banner.jpg'),
    },

    {
      title: 'Communication Strategies',
      content:
      'When caring for individuals with dementia, effective communication strategies are essential. Here are some practical tips for caregivers:\n\n' +
      '- Speak slowly and clearly.\n' +
      '- Be patient and reassuring.\n' +
      '- Use simple language.\n' +
      '- Pay attention to nonverbal cues.\n' +
      '- Create a supportive environment.\n' +
      '- Avoid arguments and corrections.\n' +
      '- Use positive reinforcement.',
      image: require('../img/dementiapatient.jpg'),
    },
    {
      title: 'Creating a Safe Environment',
      content:
        'Creating a safe environment for individuals with dementia is crucial to prevent accidents and prom:\n\n' +
        'Floor Safety:\n' +
        '- Ensure that floors are not slippery. Remove loose rugs or mats.\n' +
        '- Use non-slip flooring materials.\n' +
        '- Keep the floor clear of clutter to prevent tripping hazards.\n' +
        'Lighting:\n' +
        '*Maintain good lighting throughout the house.\n' +
        '*Install sensor lights or lights with built-in timers if the person wanders at night.\n' +
        '*Eliminate shadows, glare, and reflections that may be frightening.\n' +
        'Bathroom Safety:\n' +
        '-Install grab rails securely in the bathroom.\n' +
        '-Use a hand-held showerhead for easier assistance during showers\n' +
        '-Keep the bathroom warm, inviting, and well-lit.\n' +
        'Door Safety:\n' +
        'Keep doors open to ensure unobstructed sight.\n' +
        'Ensure that doors are unlockable from the outside in case of emergencies\n' +
        'Furniture and Fixtures:\n' +
        'Remove sharp corners or edges from furniture.\n' +
        'Use furniture with rounded edges.\n' +
        'Secure heavy furniture to prevent tipping.\n' +
        'Kitchen Safety:\n' +
        'Label cupboards and drawers to help with memory loss.\n' +
        'Avoid clutter in the kitchen.\n' +
        'Ensure that appliances are safe and easy to use.',
        image: require('../img/dementiapuzzle.jpg'),
    },
  
      {
        type: 'video',
        title: 'Dementia Care Techniques',
        videoUri: 'https://youtu.be/q_sWiwI3yP0',
        image: require('../img/dementia-care-at-home.jpg'),
      }
      
  ];

  const handleResourceClick = (resource) => {
    setCurrentResource(resource);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentResource(null);
  };

 

  return (
    <View style={{ flex: 1,padding: 16,backgroundColor:dark?'black':'white'}}>
    <ScrollView>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceContainer}
          onPress={() => handleResourceClick(resource)}>
          <Image source={resource.image} style={styles.resourceImage} />
          <Text style={styles.title}>{resource.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{currentResource?.title}</Text>
          <ScrollView style={styles.modalContentContainer}>
            <Text style={styles.modalContent}>{currentResource?.content}</Text>
          </ScrollView>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',  
},
  resourceContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',  
    padding: 20,
    borderRadius: 10,  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  resourceImage: {
    width: '100%',
    height: 200,  
    borderRadius: 10,  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',  
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#d8bfd8', 
    width: '117%', 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  
  },
  modalView: {
    width: '90%',  
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#2C3E50',  
  },
  modalContentContainer: {
    maxHeight: '80%', 
  },
  modalContent: {
    fontSize: 16,
    color: '#4A4A4A',  
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D35400',  
  },
  video: {
    width: '100%',
    height: 200,    
    marginTop: 20,
   }
   
});

export default EducationScreen;
