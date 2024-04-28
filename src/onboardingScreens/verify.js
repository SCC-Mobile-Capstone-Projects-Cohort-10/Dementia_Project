import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SharedStateContext from '../SharedStateProvider';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const VerificationCodeInput = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const {sharedState, setSharedState} = useContext(SharedStateContext);
  const navigate = useNavigation()

  const handleChangeText = (text, index) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);


      if (text.length === 1 && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    console.log("Entered number", enteredCode);
    console.log("Shared state", sharedState);
    if (Number(enteredCode) === Number(sharedState.join(""))) {
      Alert.alert('Success', ' digit number is correct.');
      navigation.navigate('Profile')
    }else{
      Alert.alert('Error', 'Please enter a correct digit number.');
    }
  };
  useEffect(() => {
    // setCode(sharedState)
  }, [sharedState]);
  console.log("Shared state", sharedState)
  return (
    <SafeAreaView>
    <View style={{marginTop: moderateScale(40)}}>
        <View style={{height: verticalScale(30), width: scale(20)}}></View>
        <Text style={{textAlign:'center',color:'grey',fontSize:20}}>Verification</Text>
        <View style={{height: verticalScale(30)}}></View>
        <Text style={{textAlign:'center',fontSize:20}}>We send you an </Text>
        <Text style={{textAlign:'center',fontSize:20}}>SMS coded </Text>
        <Text style={{textAlign:'center',fontSize:20}}>{sharedState}</Text>
        <View style={{height: verticalScale(65)}}></View>
      <View style={styles.codeContainer}>
        {sharedState?.map((item, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChangeText(text, index)}
             value={item}
            defaultValue={item}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <View style={{height: verticalScale(60)}}></View>
      <View style={styles.buttonclick}>
        <TouchableOpacity onPress={handleVerify}>
      <Text style={{textAlign:'center',fontSize:22,color:'black'}}>Next</Text>
      </TouchableOpacity>
      </View>
      <View style={{height: verticalScale(55)}}></View>
      <Text style={{textAlign:'center'}}>Didn't receive code</Text>
      <View style={styles.textnow}>
      <TouchableOpacity>
      <Text style={{textAlign:'center',fontSize:18,color:'black'}}>Resend code</Text>
      </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textnow: {
    backgroundColor: '#d8bfd8',
    marginHorizontal: moderateScale(100),
    paddingBottom: moderateScale(20),
    paddingTop: moderateScale(15), 
    borderRadius: 14,
  },
  buttonclick: {
    backgroundColor: '#d8bfd8',
    marginHorizontal: moderateScale(60),
    paddingBottom: moderateScale(20),
    paddingTop: moderateScale(15),
    borderRadius: 14,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    height: verticalScale(40),
    width: scale(50),
    borderColor: '#DDDDDD',
    backgroundColor: '#DDDDDD',
    borderWidth: 1,
    marginHorizontal: moderateScale(12),
    textAlign: 'center',
  },
});

export default VerificationCodeInput;
