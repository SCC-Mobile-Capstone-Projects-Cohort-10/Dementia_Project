import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './onboardingScreens/SplashScreen';
import GetStarted from './onboardingScreens/GetStarted';
import PatientDashboard from './PatientScreens/PatientDashboard';
import CalendarScreen from './PatientScreens/Calendar';
import ReminderScreen from './PatientScreens/ReminderScreen';
import SudokuScreen from './PatientScreens/MindGames/SudokuScreen';
import MindGamesScreen from './PatientScreens/MindGame';
import MedicationManagementScreen from './PatientScreens/MedicationManagementScreen';
import PatientLocation from './PatientScreens/PatientLocation';
import NotificationScreen from './PatientScreens/NotificationScreen';
import EmergencyCall from './PatientScreens/EmergencyCall';
import CaregiverCalendar from './CareGiverScreens/CaregiverCalendar';
import CaregiverEmergency from './CareGiverScreens/CaregiverEmergency';
import GalleryScreen from './PatientScreens/GalleryScreen';
import EducationScreen from './CareGiverScreens/EducationScreen';
import MemoryGameScreen from './PatientScreens/MindGames/MemoryGame';
import CaregiverDashboard from './CareGiverScreens/CaregiverDashboardScreen';
import BrainTeaserScreen from './PatientScreens/MindGames/BrainTeaserScreen';
import RecordingScreen from './PatientScreens/RecordingScreen';
import Profile from './onboardingScreens/Profile';
import SettingsScreen from './PatientScreens/Settings';
import { useState } from 'react';
import SharedStateContext from './SharedStateProvider';
import CountryPickerTextInput from './onboardingScreens/phone';
import VerificationCodeInput from './onboardingScreens/verify';
import { ThemeProviderMode } from './themecontext';
import ReminderListScreen from './PatientScreens/ReminderListScreen';




const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  const [sharedState, setSharedState] = useState([0,1,2,3]);
  return(
    
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>        
      <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="GetStarted" component={GetStarted}  options={{headerShown: false}}/>
     <Stack.Screen name="CalendarScreen" component={CalendarScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="ReminderScreen" component={ReminderScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="MindGameScreen" component={MindGamesScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="SudokuScreen" component={SudokuScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="BrainTeaserScreen" component={BrainTeaserScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="MedicationManagementScreen" component={MedicationManagementScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="CaregiverDashboard" component={CaregiverDashboard}  options={{headerShown: false}}/>
     <Stack.Screen name="NotificationScreen" component={NotificationScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="PatientDashboard" component={PatientDashboard}  options={{headerShown: false}}/>
     <Stack.Screen name="EmergencyCall" component={EmergencyCall}  options={{headerShown: false}}/>
     <Stack.Screen name="CaregiverCalendar" component={CaregiverCalendar}  options={{headerShown: false}}/>
     <Stack.Screen name="CaregiverEmergency" component={CaregiverEmergency}  options={{headerShown: false}}/>
     <Stack.Screen name="PatientLocation" component={PatientLocation}  options={{headerShown: false}}/>
     <Stack.Screen name="GalleryScreen" component={GalleryScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="EducationScreen" component={EducationScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="Profile" component={Profile}  options={{headerShown: false}}/>
     <Stack.Screen name="Settings" component={SettingsScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="RecordingScreen" component={RecordingScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="ReminderListScreen" component={ReminderListScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="VerificationCodeInput " component={VerificationCodeInput }  options={{headerShown: false}}/>
     <Stack.Screen name="CountryPickerTextInput" component={CountryPickerTextInput}  options={{headerShown: false}}/>
     </Stack.Navigator>
     </SharedStateContext.Provider>
     
 )
}

