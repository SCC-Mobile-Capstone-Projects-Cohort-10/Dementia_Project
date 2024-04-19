import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

const SplashScreen = ({ navigation }) => {

    const handleGetStarted = () => {
        navigation.navigate('GetStarted');
      };
    
      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('GetStarted')
        }, 3000)
    
        return () => clearTimeout(timer)
      }, [navigation])



      
  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Dementia Care App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8bfd8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    color: 'black', 
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;
