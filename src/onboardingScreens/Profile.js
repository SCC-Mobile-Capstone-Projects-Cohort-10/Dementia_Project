import { StyleSheet, Text, View, Image,  TouchableOpacity, Pressable} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { launchCameraAsync, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { FIRESTORE_DB, storage } from '../../FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

//import { Icon } from 'react-native-elements';
//import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
export default function Profile({ navigation }) {


  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [patient, setPatient] = useState('');
  
  


  
  const handleAddDoc = async () => {
    try {
      const response = await addDoc(collection(FIRESTORE_DB, 'Profile'), {
        Name: name,
        Address: address,
        Role: patient
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  

  const [image, setImage] = useState('https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg')



  const handleChangeProfile = async () => {
    try {
      await requestMediaLibraryPermissionsAsync()
      const result = await launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
        allowsEditing: true,
        allowsMultipleSelection: true
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        saveToStorage(result.assets[0].uri)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const saveToStorage = async (imgUri) => {
    try {
      if (!imgUri) {
        alert("Please select an image")
      }
      else {
        const timeSaved = Date.now()

        const photo = await fetch(imgUri)
        const blobbedPhoto = await photo.blob()

        const path = `profilePictures/${timeSaved}`

        const metaData = {
          contentType: 'image/jpeg'
        };

        const imagRef = ref(storage, path)

        const upload = await uploadBytes(imagRef, blobbedPhoto, metaData)

        console.log(upload);


        var hostedlink = await getDownloadURL(imagRef)


      }

    } catch (error) {
      console.log(error)

    }

  }



  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the user's preferred theme from AsyncStorage on component mount
  useEffect(() => {
    loadTheme();
  }, []);

  // Function to toggle between light and dark mode
  const toggleDarkMode = async () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the state
    saveTheme(!isDarkMode); // Save the updated theme preference to AsyncStorage
  };

    // Function to save the theme preference to AsyncStorage
    const saveTheme = async (isDark) => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDark));
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    };

     // Function to load the theme preference from AsyncStorage
  const loadTheme = async () => {
    try {
      const themePreference = await AsyncStorage.getItem('isDarkMode');
      setIsDarkMode(themePreference === 'true');
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  


  return (
    
    <View style={[styles.containers, isDarkMode ? styles.darkContainer : null]}>
      <View style={{paddingTop:35}}>

        <Text style={[styles.profileTxt, isDarkMode && styles.darkText]}>GetStarted</Text>
        
        </View>
     
        <View>
        <Text style={[styles.profileText2, isDarkMode && styles.darkText]}>We now need to set up a Profile.please select option which best describes you:</Text>
     </View>
      <Pressable onPress={handleChangeProfile} style={{ alignItems: 'center', borderRadius: 99, width: 200, height: 200, alignSelf: 'center', marginTop: 15 }}>

        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 99 }} />
        <Feather name='camera' size={30} color="white" style={{ backgroundColor: "black", position: 'absolute', right: -2, top: 130 }} />

      </Pressable>
     
   

       <View style={{ paddingLeft: 50, paddingTop: 20, width: 350 }}>
      <TextInput
        placeholder='Name'
        value={name}
        onChangeText={setName}
        
        mode='flat'
        underlineColor='black'
        style={[styles.profileText, isDarkMode && styles.darkText]}   
      />
      </View>
      <View style={{ paddingLeft: 50, paddingTop: 10, width: 350 }}>
      <TextInput
        placeholder='Address'
        mode='flat'
        underlineColor='black'
        value={address}
        onChangeText={setAddress}
        
        style={[styles.profileText, isDarkMode && styles.darkText]}
      />
      </View>

      <View style={{ paddingLeft: 50, paddingTop: 10, width: 350 }}>
      <TextInput
        placeholder='Role'
        mode='flat'
        underlineColor='black'
        value={patient}
        onChangeText={setPatient}
        
        style={[styles.profileText, isDarkMode && styles.darkText]}
      />
      </View>

      
      
      
    
     
      <View style={{ paddingHorizontal: 20, paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 30, justifyContent: 'center', }}>

<TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
  <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
</TouchableOpacity>
</View>
   

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>{
          handleAddDoc();
          navigation.navigate('PatientDashboard')
        }}>
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{
          handleAddDoc();
          navigation.navigate('CaregiverDashboard')
        }}>
          <Text style={styles.buttonText}>Caregiver</Text>
        </TouchableOpacity>
      </View>




    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    
    
    alignItems: 'center',
    paddingTop: 30,
    display:'flex',
    flexDirection:'row',
    gap :10,
    paddingHorizontal:20,
  },
  button: {
    backgroundColor: '#d8bfd8',
    padding: 10,
    borderRadius: 5,
    width: 180,
    padding: 20,
    height: 60,
    alignItems: 'center'
  },
  buttonText: {
    height: 30,
    textAlign: 'center',


    fontSize: 16,
  },

  darkText: {
    fontSize: 18,
    color: '#FFFFFF', // Dark mode text color
  },

  profileText: {
    
    borderBottomWidth:1,
    marginBottom:10,
    fontSize:18,
    backgroundColor:'white',
    color: '#000000', // Light mode text color
  },

  containers: {
    flex: 1,

    backgroundColor: '#FFFFFF', // Light mode background color
  },
  darkContainer: {
    backgroundColor: '#000000', // Dark mode background color
  },
  toggleButtonText: {

    fontSize: 16,
    fontWeight: 'bold',
    fontSize: 20,
    color: "#c7b2b1"
  },
  profileTxt: {
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },

  profileText2:{
    fontSize:18,
    paddingHorizontal:20

  }


 
 
});

 