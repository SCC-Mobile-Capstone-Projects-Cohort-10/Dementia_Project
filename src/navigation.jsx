import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './onboardingScreens/SplashScreen';
import GetStarted from './onboardingScreens/GetStarted';
import WelcomeScreen from './onboardingScreens/WelcomeScreen';
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
import CaregiverNotificationScreen from './CareGiverScreens/CaregiverNotificationScreen';
import MemoryGameScreen from './PatientScreens/MindGames/MemoryGame';
import CaregiverDashboard from './CareGiverScreens/CaregiverDashboardScreen';
import BrainTeaserScreen from './PatientScreens/MindGames/BrainTeaserScreen';


const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return(

  <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{headerShown: false}}/>
     <Stack.Screen name="GetStarted" component={GetStarted}  options={{headerShown: false}}/>
     <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{headerShown: false}}/>
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
     <Stack.Screen name="CaregiverNotificationScreen" component={CaregiverNotificationScreen}  options={{headerShown: false}}/>
     </Stack.Navigator>
 )
}

