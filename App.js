import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/HomeScreen';
import ClassScreen from './screens/ClassScreen';
import Bottomnavbar from './Navigation/Bottomnavbar';
import TimetableScreen from './screens/TimetableScreen';
import ChatScreen from './screens/ChatScreen'
import SettingScreen from './screens/SettingsScreen'
import LoginScreen from './screens/ProfileScreen';
import TeachingScreen from './screens/TeachingScreen';
import MyClassScreen from './screens/MyClassScreen';
import ExamScreen from './screens/ExamScreen'
import LessonScreen from './screens/LessonsScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import ReportScreen from './screens/ReportScreen';
import GradeScreen from './screens/GradeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create your tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <Bottomnavbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="teaching" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          {/* Main app with tabs */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Class"
            component={ClassScreen}
          />
          <Stack.Screen
            name="My Class"
            component={MyClassScreen}
          />
          <Stack.Screen
            name="Exam"
            component={ExamScreen}
          />
          <Stack.Screen
            name="Lessons"
            component={LessonScreen}
          />
          <Stack.Screen
            name="Lessons Detail"
            component={LessonDetailScreen}
          />
          <Stack.Screen
            name="Report Screen"
            component={ReportScreen}
          />
          <Stack.Screen
            name="Grade Screen"
            component={GradeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}