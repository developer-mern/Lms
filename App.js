import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './Context/authContext';

// Teacher Screens
import Dashboard from './screens/Teacher/HomeScreen';
import ClassScreen from './screens/Teacher/ClassScreen';
import Bottomnavbar from './Navigation/TeacherBottomnavbar';
import TimetableScreen from './screens/Teacher/TimetableScreen';
import ChatScreen from './screens/Teacher/ChatScreen';
import SettingScreen from './screens/Teacher/SettingsScreen';
import TeachingScreen from './screens/Teacher/TeachingScreen';
import MyClassScreen from './screens/Teacher/MyClassScreen';
import ExamScreen from './screens/Teacher/ExamScreen';
import LessonScreen from './screens/Teacher/LessonsScreen';
import LessonDetailScreen from './screens/Teacher/LessonDetailScreen';
import ReportScreen from './screens/Teacher/ReportScreen';
import GradeScreen from './screens/Teacher/GradeScreen';

// Parent Screens
import ParentDashboard from './screens/Parent/Dashboard';
import AttendaceTracking from './screens/Parent/AttendanceTracking';
// Import other parent screens as needed

// Student Screens
// Import student screens as needed
import StudentDashboard from './screens/Student/Dashboard';

// Auth Screens
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen'; // If you have this
import TeacherBottomnavbar from './Navigation/TeacherBottomnavbar';
import ParentBottomnavbar from './Navigation/ParentBotoomnavbar';
import StudentBottomnavbar from './Navigation/StudentBottomnavbar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Teacher Tab Navigator
function TeacherTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TeacherBottomnavbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="teaching" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
      <Tab.Screen name="Attendance" component={AttendaceTracking} />
    </Tab.Navigator>
  );
}

// Parent Tab Navigator (You'll need to create ParentBottomnavbar and screens)
function ParentTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <ParentBottomnavbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={ParentDashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="teaching" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
      <Tab.Screen name="Attendance" component={AttendaceTracking} />
    </Tab.Navigator>
  );
}

// Student Tab Navigator (You'll need to create StudentBottomnavbar and screens)
function StudentTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <StudentBottomnavbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={StudentDashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="academic" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
      <Tab.Screen name="Attendance" component={AttendaceTracking} />
    </Tab.Navigator>
  );
}

// Main App Navigator with Role-Based Routing
function AppNavigator() {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userRole ? (
          // Auth Stack - No user role (not logged in)
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : userRole === 'Teacher' ? (
          // Teacher Stack
          <>
            <Stack.Screen name="MainTabs" component={TeacherTabs} />
            <Stack.Screen name="Class" component={ClassScreen} />
            <Stack.Screen name="My Class" component={MyClassScreen} />
            <Stack.Screen name="Exam" component={ExamScreen} />
            <Stack.Screen name="Lessons" component={LessonScreen} />
            <Stack.Screen name="Lessons Detail" component={LessonDetailScreen} />
            <Stack.Screen name="Report Screen" component={ReportScreen} />
            <Stack.Screen name="Grade Screen" component={GradeScreen} />
            <Stack.Screen name="Attendance Tracker" component={AttendaceTracking} />
          </>
        ) : userRole === 'Parent' ? (
          // Parent Stack
          <>
            <Stack.Screen name="ParentTabs" component={ParentTabs} />
            {/* Add parent-specific screens here */}
          </>
        ) : (
          // Student Stack
          <>
            <Stack.Screen name="StudentTabs" component={StudentTabs} />
            {/* Add student-specific screens here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Loading Component
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading application...</Text>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});