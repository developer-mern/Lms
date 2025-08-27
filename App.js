// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './Context/authContext';

// Screens
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';

// Teacher Screens
import Dashboard from './screens/Teacher/HomeScreen';
import ClassScreen from './screens/Teacher/ClassScreen';
import TimetableScreen from './screens/Teacher/TimetableScreen';
import ChatScreen from './screens/Teacher/ChatScreen';
import SettingScreen from './screens/Teacher/SettingsScreen';
import TeachingScreen from './screens/Teacher/TeachingScreen';
import MyClassScreen from './screens/Teacher/MyClassScreen';
import ExamScreen from './screens/Teacher/ExamScreen';
import LessonScreen from './screens/Teacher/LessonsScreen';
import TeacherLessonDetailScreen from './screens/Teacher/TeacherLessonDetailScreen';
import ReportScreen from './screens/Teacher/ReportScreen';
import GradeScreen from './screens/Teacher/GradeScreen';

// Parent Screens
import ParentDashboard from './screens/Parent/Dashboard';
import AttendaceTracking from './screens/Parent/AttendanceTracking';
import PerformanceScreen from './screens/Parent/PerformanceScreen';
import AcademicTabsScreen from './screens/Parent/AcademicTabsScreen';
import ParentTeacherScreen from './screens/Parent/ParentTeachersScreen';
import ProfileScreen from './screens/Parent/ProfileScreen';
import FeesScreen from './screens/Parent/FeesScreen';

// Student Screens
import StudentDashboard from './screens/Student/Dashboard';
import AcademicScreen from './screens/Student/AcademicScreen';
import StudentScreen from './screens/Student/StudentScreen';
import ExamReport from './screens/Student/ExamReport';
import SelectSubjectScreen from './screens/Student/SelectSubjectScreen';
import studentLessonDetailScreen from './screens/Student/StudentLessonDetailScreen';
import SelectLessonScreen from './screens/Student/SelectLessonScreen';
import StudentProfile from './screens/Student/StudentProfile';
import studentTimetableScreen from './screens/Student/StudentTimetableScreen';

// Bottom Navbars
import TeacherBottomnavbar from './Navigation/TeacherBottomnavbar';
import ParentBottomnavbar from './Navigation/ParentBotoomnavbar';
import StudentBottomnavbar from './Navigation/StudentBottomnavbar';
// import SelectLessonScreen from './screens/Student/SelectLessonScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD
// Loading Screen
=======
// Teacher Tab Navigator
function TeacherTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TeacherBottomnavbar {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Teaching" component={TeachingScreen} />
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
      screenOptions={{ headerShown: true }}
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
      screenOptions={{ headerShown: true }}
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
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!userRole ? (
          // Auth Stack - No user role (not logged in)
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : userRole === 'Teacher' ? (
          // Teacher Stack
          <>
            <Stack.Screen name="MainTabs" component={TeacherTabs} options={{headerShown : false}}/>
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
>>>>>>> 6b3b6aeff879c4ab78df396c1f965e7fa1665e63
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading application...</Text>
    </View>
  );
}

// Teacher Tab Navigator
function TeacherTabs() {
  return (
    <Tab.Navigator tabBar={props => <TeacherBottomnavbar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Teaching" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
      <Tab.Screen name="Attendance" component={AttendaceTracking} />
    </Tab.Navigator>
  );
}

// Parent Tab Navigator
function ParentTabs() {
  return (
    <Tab.Navigator tabBar={props => <ParentBottomnavbar {...props} />}>
      <Tab.Screen name="Home" component={ParentDashboard} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Teaching" component={TeachingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={SettingScreen} />
      <Tab.Screen name="Attendance" component={AttendaceTracking} />
    </Tab.Navigator>
  );
}

// Student Tab Navigator
function StudentTabs() {
  return (
    <Tab.Navigator tabBar={props => <StudentBottomnavbar {...props} />}>
      <Tab.Screen name="Home" component={StudentDashboard} />
      <Tab.Screen name="Timetable" component={studentTimetableScreen} />
      <Tab.Screen name="Academic" component={StudentScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="More" component={StudentProfile} />
    </Tab.Navigator>
  );
}

// Main Navigator with Role-Based Routing
function AppNavigator() {
  const { role, loading } = useAuth(); // 🔹 Get role from context

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!role ? (
          // Auth Stack - not logged in
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : role === 'teacher' ? (
          // Teacher Stack
          <>
            <Stack.Screen name="TeacherTabs" component={TeacherTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Class" component={ClassScreen} />
            <Stack.Screen name="MyClass" component={MyClassScreen} />
            <Stack.Screen name="Exam" component={ExamScreen} />
            <Stack.Screen name="Lessons" component={LessonScreen} />
            <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetailScreen} />
            <Stack.Screen name="ReportScreen" component={ReportScreen} />
            <Stack.Screen name="GradeScreen" component={GradeScreen} />
            <Stack.Screen name="AttendanceTracker" component={AttendaceTracking} />
          </>
        ) : role === 'parent' ? (
          // Parent Stack
          <>
            <Stack.Screen name="ParentTabs" component={ParentTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Attendance Tracking" component={AttendaceTracking} />
            <Stack.Screen name="Teacher Screen" component={ParentTeacherScreen} />
            <Stack.Screen name="Fees" component={FeesScreen} />
          </>
        ) : role === 'student' ? (
          // Student Stack
          <>
            <Stack.Screen name="StudentTabs" component={StudentTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Report" component={AcademicScreen} />
            <Stack.Screen name="Exam" component={ExamReport} />
            <Stack.Screen name="Select Subject" component={SelectSubjectScreen} />
            <Stack.Screen name="Select Lesson" component={SelectLessonScreen} />
            <Stack.Screen name="LessonDetails" component={studentLessonDetailScreen} />
          </>
        ) : (
          // Default fallback
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// App Component
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
