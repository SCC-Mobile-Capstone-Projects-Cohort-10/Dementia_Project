import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { FIRESTORE_DB, storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [role, setRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const handleAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'Profile'), {
        Name: name,
        Address: address,
        Role: role
      });
      console.log('Document written with ID: ', docRef.id);
      // Close the modal if it's open
      if (modalVisible) {
        setModalVisible(false);
      }
      // Navigate to the correct dashboard
      navigation.navigate(role === 'Patient' ? 'PatientDashboard' : 'CaregiverDashboard');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save profile. Please check your data and try again.");
    }
  };
  
  const handleChangeProfile = async () => {
    try {
      await requestMediaLibraryPermissionsAsync();
      const result = await launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
        allowsEditing: false,
        allowsMultipleSelection: true  
      });
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          setImage(result.assets[0].uri);  
          saveToStorage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const saveToStorage = async (imgUri) => {
    try {
      if (!imgUri) {
        alert("Please select an image");
      } else {
        const timeSaved = Date.now();
        const photo = await fetch(imgUri);
        const blobbedPhoto = await photo.blob();
        const path = `profilePictures/${timeSaved}`;
        const metaData = { contentType: 'image/jpeg' };
        const imagRef = ref(storage, path);
        const upload = await uploadBytes(imagRef, blobbedPhoto, metaData);
        console.log(upload);
        const hostedlink = await getDownloadURL(imagRef);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveTheme(newMode);
  };

  const saveTheme = async (newMode) => {
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const loadTheme = async () => {
    try {
      const themePreference = await AsyncStorage.getItem('isDarkMode');
      setIsDarkMode(themePreference === 'true');
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    console.log("Role selected:", selectedRole);
    setModalVisible(false);
};


  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
        Please fill in your profile details:
      </Text>
      <Pressable onPress={handleChangeProfile} style={styles.profileImagePressable}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <Feather name='camera' size={24} color="white" style={styles.cameraIcon} />
      </Pressable>
      <TextInput label='Name' value={name} onChangeText={setName} style={[styles.input, isDarkMode && styles.darkInput]} />
      <TextInput label='Address' value={address} onChangeText={setAddress} style={[styles.input, isDarkMode && styles.darkInput]} />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, isDarkMode && styles.darkInput]}>
        <Text style={styles.textStyle}>{role || "Select Role"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.button} onPress={() => selectRole('Patient')}>
              <Text style={styles.textStyle}>Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectRole('Caregiver')}>
              <Text style={styles.textStyle}>Caregiver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleAddDoc} style={styles.button}>
  <Text style={styles.textStyle}>Submit Profile</Text>
</TouchableOpacity>
      <View style={styles.toggleButtonView}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
          <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkText: {
    color: '#FFFFFF',
  },
  profileImagePressable: {
    alignItems: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  darkInput: {
    color: '#FFFFFF',
    backgroundColor: '#333333',
  },
  button: {
    backgroundColor: '#d8bfd8',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 14,
  },
  toggleButtonView: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleButton: {
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#c7b2b1",
  },
});
