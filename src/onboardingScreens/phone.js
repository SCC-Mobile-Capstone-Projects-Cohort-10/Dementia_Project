import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions, Button, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import SharedStateContext from '../SharedStateProvider';
import { firebaseaAuth } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

import { getAuth,signInWithPhoneNumber } from 'firebase/auth';

 

    
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const CountryPickerTextInput = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const {sharedState, setSharedState} = useContext(SharedStateContext);
    const [validNumber, setValidNumber] = useState(false)
    const [isloading,setIsloading] = useState(false)
    // const [verificationId, setVerificationId] = useState('');
    // const [verificationCode, setVerificationCode] = useState('');
    const auth=firebaseaAuth;
    const  navigate =useNavigation();
    const countries = [
        { name: 'USA', code: '+1' },
        { name: 'Canada', code: '+1' },
        { name: 'UK', code: '+44' },
        { name: 'Australia', code: '+61' },
        { name: 'Japan', code: '+81' },
        { name: 'Rw', code: '+250' },
        { name: 'Algeria', code: '+213' },
        { name: 'Angola', code: '+244' },
        { name: 'Argentina', code: '+54' },
        { name: 'Australia', code: '+61' },
        { name: 'Belgium', code: '+32' },
        { name: 'Benin', code: ' +229' },
        { name: 'Botswana', code: ' +267' },
        { name: 'Brazil', code: '+55' },
        { name: 'Burundi', code: '+257' },
        { name: 'Canada', code: '+1' },
        { name: 'Chad', code: '+235' },
        { name: 'China', code: '+86' },
        { name: 'Colombia', code: '+57' },
        { name: 'Congo', code: '+242' },
        { name: 'Egypt', code: '+20' },
        { name: 'Ethiopia', code: '+251' },
        { name: 'France', code: ' +33' },
        { name: 'Georgia', code: '+995' },
        { name: 'Ghana', code: '+233' },
        { name: 'Guinea', code: '+224' },
        { name: 'India', code: '+91' },
        { name: 'Ireland', code: '+353' },
        { name: 'Israel', code: '+972' },
        { name: 'Italy', code: '+39' },
        { name: 'Ivory Coast', code: '+225' },
        { name: 'Jamaica', code: '+1-876' },
        { name: 'Japan', code: '+81' },
        { name: 'Kenya', code: '+254' },
        { name: 'Liberia', code: '+231' },
        { name: 'Libya', code: '+218' },
        { name: 'Madagascar', code: '+261' },
        { name: 'Malawi', code: '+265' },
        { name: 'Mexico', code: '+52' },
        { name: 'Morocco', code: '+212' },
        { name: 'Mozambique', code: '+258' },
        { name: 'Nigeria', code: '+234' },
        { name: 'Norway', code: '+47' },
        { name: 'Poland', code: '+48' },
        { name: 'Russia', code: '+7' },
        { name: 'Senegal', code: '+221' },
        { name: 'Tanzania', code: '+255' },
        { name: 'Qatar', code: '+974' },

    ]; 

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setModalVisible(false);
    };


    const validatePhoneNumber = () => {
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
         
        if (phoneRegex.test(phoneNumber)) {
            Alert.alert('Success', 'Phone number is valid.');
            console.log('sucessfully')
            // navigation.navigate('VerificationCodeInput')
        } else {
            Alert.alert('Error', 'Please enter a valid phone number.');
            console.log('unsucessfully')
        }
        setValidNumber(true);
        
    };
    const handlesubmit = async () => {
        if (validatePhoneNumber()) {
            console.log('form submitted', phoneNumber)
    
            try {
                const response = await signInWithPhoneNumber(getAuth(),phoneNumber)
                console.log(response)
                console.log('your now signed in')
                showMessage({
                    message: 'phone-number successfully',
                    description: 'your now registered phone-number',
                    type: 'success',
                    icon: 'success',
                    duration: 3000
                })
                navigation.navigate('VerificationCodeInput')
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "fail to register your phone-number",
                    description: error.code.toString(),
                    type: 'danger',
                    icon: 'danger',
                    duration: 3000
                })
            } finally {
                setIsloading(false)
            }
    
        }
    }
    

    useEffect(() =>{
        if(validNumber){
            fetch('http://192.168.1.69:3000/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers here if needed
            },
            body: JSON.stringify({"to": phoneNumber.split('+')[1]}), // Convert data to JSON string
            })
            .then(response => response.json()) // Parse response as JSON
            .then(data => {
                if(data?.data){
                    const number = data.data.toString().split("").map(Number)
                    setSharedState(number)
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
        }
    },[validNumber])

    return (
        <SafeAreaView>
            <View style={{ marginTop: 60 }}>
                <Text style={{ color: "grey", textAlign: 'center', fontSize: 20, height: 40 }}>Welcome</Text>
                <View style={{ height: 90 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Enter your</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>mobile number</Text>
                </View>
                <View style={{ height: 60 }}>
                    <Text style={{ color: "grey", textAlign: 'center', fontSize: 20 }}>We will send you</Text>
                    <Text style={{ color: "grey", textAlign: 'center', fontSize: 20 }}>confirmation code</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
                        <AntDesign name="caretdown" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.countryCode}>{selectedCountry ? selectedCountry.code : 'Code'}</Text>
                    <Text style={styles.countryName}>{selectedCountry ? selectedCountry.name : 'Select Country'}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />

                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCountrySelect(item)} style={styles.countryItem}>
                                        <Text>{`${item.name} (${item.code})`}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
                <View style={{ height: 80 }}></View>
                <View style={styles.buttomtext}>
                    <TouchableOpacity onPress={handlesubmit} disabled={!selectedCountry || !phoneNumber}>
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttomtext: {
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#d8bfd8',
        height: 55,
        marginHorizontal: 50,
        paddingTop: 16,


    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 1,
        marginHorizontal: 15,
        height: 50
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    iconContainer: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    countryItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    countryCode: {
        fontSize: 16,
    },
    countryName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
});

export default CountryPickerTextInput;
