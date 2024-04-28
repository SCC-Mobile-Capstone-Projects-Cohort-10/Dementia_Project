import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import { MainNavigation } from './src/navigation';
import { ThemeProviderIntoDarkMode } from './src/themecontext';

LogBox.ignoreAllLogs(true);


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <ThemeProviderIntoDarkMode>
    <NavigationContainer> 
    <MainNavigation/>
    </NavigationContainer>
    </ThemeProviderIntoDarkMode>
   
  );
}

export default StackNavigation;
