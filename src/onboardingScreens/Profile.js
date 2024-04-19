import { StyleSheet, Text, View, Image,  TouchableOpacity, Pressable, FlatList} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { launchCameraAsync, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { db, storage } from '../../FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';






export default function Profile({ navigation }) {

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [gender, setGender] = useState('');
  //const [modalVisible, setModalVisible] = useState(false);


  
  const handleAddDoc = async () => {
    try {
      const response = await addDoc(collection(db, 'Profile'), {
        Name: name,
        Date: date,
        Gender: gender
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



  return (
    
    <View>
     <View style={{paddingTop:35}}>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginBottom:10}}>GetStarted</Text>
        <Text style={{fontSize:18,paddingHorizontal:20}}>We now need to set up a Profile.please select option which best describes you:</Text>
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
        style={{borderBottomWidth:1,marginBottom:20,fontSize:18,backgroundColor:'white'}}
        mode='flat'
        underlineColor='black'
           
      />
      </View>
      <View style={{ paddingLeft: 50, paddingTop: 10, width: 350 }}>
      <TextInput
        placeholder='Address'
        mode='flat'
        underlineColor='black'
        value={date}
        onChangeText={setDate}
        style={{borderBottomWidth:1,marginBottom:20,fontSize:18,backgroundColor:'white'}}
      />
      </View>

      <View style={{ paddingLeft: 50, paddingTop: 10, width: 350 }}>
      <TextInput
        style={{borderBottomWidth:1,marginBottom:20,fontSize:18,backgroundColor:'white'}}
        placeholder="Select role"
        //left={<TextInput.Icon icon={'user'} type="material-community"/>}
        mode='flat'
        underlineColor='black'

        value={gender}
        onChangeText={setGender}
      />
      </View>
      
    
     
      
   

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>{
          handleAddDoc();
          navigation.navigate('PatientProfile')
        }}>
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>




    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    paddingTop: 60,
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
});