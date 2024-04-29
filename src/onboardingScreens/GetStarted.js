import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChangeIntoDarkMode } from '../themecontext';


const GetStarted = ({ navigation }) => {
  const handleOnPressLetsGo = () => {
    navigation.navigate('CountryPickerTextInput');
  };
  const {dark} = useContext(ChangeIntoDarkMode)

  return (
    <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor:dark?'black':'white'}}>
      <Image source={require('../img/dementiam.jpg')} style={styles.topImage} />
      <Text style={{fontSize: 18,marginBottom: 20,color:dark?'white':'black'}}>Welcome</Text>
      <Text style={{fontSize: 22,textAlign: 'center',marginHorizontal: 40,marginBottom: 10,color:dark?'white':'black'}}>
        Your personalized Dementia Care App Rwanda
      </Text>
      <Text style={{fontSize: 16,textAlign: 'center',marginHorizontal: 40,marginBottom: 30,color:dark?'white':'black'}}>
        We're here to support you in managing your daily routines, medication schedules, appointments, and memory enhancement activities.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleOnPressLetsGo}>
        <Text style={styles.buttonText}>Let's get started!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  topImage: {
    width: '100%',
    height: '30%', 
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 12,
    marginBottom: 20,
  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#d8bfd8',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    // color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStarted;
