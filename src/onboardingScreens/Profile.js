import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput, Button, Menu, Provider, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { FIRESTORE_DB, storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ChangeIntoDarkMode } from '../themecontext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg');
  const [role, setRole] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const { dark, changeIntoDark } = useContext(ChangeIntoDarkMode);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    closeMenu();
  };

  const handleAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'Profile'), {
        Name: name,
        Address: address,
        Role: role,
        Image: image
      });
      console.log('Document written with ID: ', docRef.id);
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

  return (
    <Provider>
      <View style={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}>
        <View style={{ height: 20 }}></View>
        <View style={styles.modeContainer}>
          <MaterialIcons name='dark-mode' size={20} onPress={changeIntoDark} style={{ color: dark ? 'white' : 'black' }} />
          <Text style={{ color: dark ? 'white' : 'black' }}>Mode</Text>
        </View>
        <Text style={[styles.headerText, { color: dark ? 'white' : 'black' }]}>Please fill in your profile details:</Text>
        <Pressable onPress={handleChangeProfile} style={styles.profileImagePressable}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Feather name='camera' size={24} color="white" style={styles.cameraIcon} />
        </Pressable>
        <TextInput label='Name' value={name} onChangeText={setName} style={styles.input} />
        <TextInput label='Address' value={address} onChangeText={setAddress} style={styles.input} />
        <View style={styles.spacing} />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableRipple onPress={openMenu} style={styles.menuButton}>
              <Text style={styles.menuButtonText}>{role || "Select Role"}</Text>
            </TouchableRipple>
          }
        >
          <Menu.Item onPress={() => selectRole('Patient')} title="Patient" />
          <Menu.Item onPress={() => selectRole('Caregiver')} title="Caregiver" />
        </Menu>

        <Button mode="contained" onPress={handleAddDoc} style={styles.button}>
          <Text style={styles.textStyle}>Submit Profile</Text>
        </Button>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profileImagePressable: {
    alignItems: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
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
    backgroundColor: 'white',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#d8bfd8',
  },
  textStyle: {
    fontSize: 16,
  },
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 319,
  },
  menuButtonText: {
    fontSize: 16,
  },
  spacing: {
    height: 20,
  },
});
