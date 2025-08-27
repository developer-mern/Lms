
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../Context/authContext'; // Adjust path as needed
import { getTeacherTimetable } from '../../api/authapi'; // Adjust path as needed

const { width } = Dimensions.get('window');

const ScheduleApp = () => {
  const [activeView, setActiveView] = useState('Weekly View');
  const [startDate, setStartDate] = useState(new Date()); // August 18, 2025
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // For daily view
  const [showExport, setShowExport] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth(); // Get token from AuthContext

  // Convert 24-hour format to 12-hour format
  const formatTimeTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const timeSlots = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const data = await getTeacherTimetable(token);

        // Transform API data to match the display format
        const transformedData = data.map(item => ({
          day: item.day,
          time: formatTimeTo12Hour(item.startTime),
          subject: item.subject,
          class: `Section ${item.sectionId}`,
          duration: `${formatTimeTo12Hour(item.startTime)} - ${formatTimeTo12Hour(item.endTime)}`,
          teacherName: item.teacherName,
          startTime: item.startTime,
          endTime: item.endTime
        }));

        setScheduleData(transformedData);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [token]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'long' }),
      shortName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      fullDate: date
    };
  });

  const currentWeekRange = () => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.getDate()} ${endDate.toLocaleDateString('en-US', { month: 'short' })}, ${startDate.getFullYear()}`;
  };

  const hasClass = (day, time) => {
    return scheduleData.find(item => {
      // Match day name (case insensitive) and start time
      const dayMatch = item.day.toLowerCase() === day.name.toLowerCase();
      const timeMatch = item.time === time;
      return dayMatch && timeMatch;
    });
  };

  const getClassesForDay = (dayName) => {
    return scheduleData
      .filter(item => item.day.toLowerCase() === dayName.toLowerCase())
      .sort((a, b) => {
        // Sort by start time
        const timeA = a.startTime.split(':').map(Number);
        const timeB = b.startTime.split(':').map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });
  };

  const ViewTabs = () => (
    <View style={styles.tabContainer}>
      {['Weekly View', 'Daily View', 'List View'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeView === tab && styles.activeTab
          ]}
          onPress={() => setActiveView(tab)}
        >
          <Text style={[
            styles.tabText,
            activeView === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const WeekNavigation = () => (
    <View style={styles.weekNavContainer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setStartDate(prev => new Date(prev.setDate(prev.getDate() - 7)))}
      >
        <Text style={styles.navButtonText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.weekText}>{currentWeekRange()}</Text>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setStartDate(prev => new Date(prev.setDate(prev.getDate() + 7)))}
      >
        <Text style={styles.navButtonText}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const DayNavigation = () => {
    const currentDay = days[currentDayIndex];
    return (
      <View style={styles.weekNavContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentDayIndex(prev => prev > 0 ? prev - 1 : 6)}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.weekText}>
          {currentDay.name}, {currentDay.fullDate.getDate()} {currentDay.fullDate.toLocaleDateString('en-US', { month: 'long' })} {currentDay.fullDate.getFullYear()}
        </Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentDayIndex(prev => prev < 6 ? prev + 1 : 0)}
        >
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DailyView = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading schedule...</Text>
        </View>
      );
    }

    const currentDay = days[currentDayIndex];
    const dayClasses = getClassesForDay(currentDay.name);

    return (
      <View style={styles.gridContainer}>
        <View style={styles.dailyHeader}>
          <MaterialIcons name="schedule" size={20} color="#000" style={styles.scheduleIcon} />
          <Text style={styles.scheduleTitle}>Today's Schedule</Text>
        </View>
        
        <ScrollView style={styles.dailyScrollContainer} showsVerticalScrollIndicator={false}>
          {dayClasses.length > 0 ? (
            dayClasses.map((classItem, index) => (
              <View key={index} style={styles.dailyClassCard}>
                <View style={styles.dailyTimeContainer}>
                  <Text style={styles.dailyStartTime}>{classItem.time.split(' ')[0]}</Text>
                  <Text style={styles.dailyTimePeriod}>{classItem.time.split(' ')[1]}</Text>
                  <Text style={styles.dailyToText}>to</Text>
                  <Text style={styles.dailyEndTime}>{formatTimeTo12Hour(classItem.endTime)}</Text>
                </View>
                <View style={styles.dailyClassInfo}>
                  <Text style={styles.dailySubject}>{classItem.subject}</Text>
                  <Text style={styles.dailyClass}>{classItem.class}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noClassesContainer}>
              <Text style={styles.noClassesText}>No classes scheduled for this day</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const ListView = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading schedule...</Text>
        </View>
      );
    }

    // Group classes by day
    const groupedClasses = days.reduce((acc, day) => {
      const dayClasses = getClassesForDay(day.name);
      if (dayClasses.length > 0) {
        acc[day.name] = dayClasses;
      }
      return acc;
    }, {});

    return (
      <View style={styles.gridContainer}>
        <View style={styles.listHeader}>
          <MaterialIcons name="view-list" size={20} color="#000" style={styles.scheduleIcon} />
          <Text style={styles.scheduleTitle}>All Classes</Text>
        </View>
        
        <ScrollView style={styles.listScrollContainer} showsVerticalScrollIndicator={false}>
          {Object.entries(groupedClasses).map(([dayName, classes]) => (
            <View key={dayName} style={styles.listDaySection}>
              <Text style={styles.listDayTitle}>{dayName}</Text>
              {classes.map((classItem, index) => (
                <View key={index} style={styles.listClassCard}>
                  <View style={styles.listTimeContainer}>
                    <Text style={styles.listTime}>
                      {classItem.time} - {formatTimeTo12Hour(classItem.endTime)}
                    </Text>
                    <Text style={styles.listClass}>{classItem.class}</Text>
                  </View>
                  <View style={styles.listSubjectContainer}>
                    <Text style={styles.listSubject}>{classItem.subject}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
          
          {Object.keys(groupedClasses).length === 0 && (
            <View style={styles.noClassesContainer}>
              <Text style={styles.noClassesText}>No classes scheduled for this week</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const ScheduleGrid = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading schedule...</Text>
        </View>
      );
    }

    return (
      <View style={styles.gridContainer}>
        <Text style={styles.scheduleTitle}>📅 Weekly Schedule</Text>

        {/* Main container that will scroll vertically */}
        <ScrollView
          style={styles.verticalScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tableContainer}>
            {/* Time Column */}
            <View style={styles.timeColumn}>
              <View style={[styles.cell, styles.timeHeaderCell]}>
                <Text style={styles.headerText}>Time</Text>
              </View>
              {timeSlots.map((time) => (
                <View key={time} style={[styles.cell, styles.timeCell]}>
                  <Text style={styles.timeText}>{time.split(' ')[0]}</Text>
                  <Text style={styles.timePeriod}>{time.split(' ')[1]}</Text>
                </View>
              ))}
            </View>

            {/* Days Scroll - Horizontal scrolling */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollContainer}
            >
              <View>
                {/* Header Row */}
                <View style={styles.daysHeader}>
                  {days.map((day) => (
                    <View key={day.name} style={[styles.cell, styles.dayHeaderCell]}>
                      <Text style={styles.dayName}>{day.name}</Text>
                      <Text style={styles.dayDate}>{day.date}</Text>
                    </View>
                  ))}
                </View>

                {/* Schedule Rows */}
                {timeSlots.map((time) => (
                  <View key={time} style={styles.scheduleRow}>
                    {days.map((day) => {
                      const classData = hasClass(day, time);
                      return (
                        <View key={`${day.name}-${time}`} style={[styles.cell, styles.scheduleCell]}>
                          {classData && (
                            <View style={styles.classContainer}>
                              <Text style={styles.classSubject}>{classData.subject}</Text>
                              <Text style={styles.classInfo}>{classData.class}</Text>
                              <View style={styles.classTimeContainer}>
                                <Text style={styles.classTime}>{classData.duration}</Text>
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Daily View':
        return DailyView();
      case 'List View':
        return ListView();
      default:
        return ScheduleGrid();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Schedule</Text>
        {showExport ? (
          <TouchableOpacity style={styles.exportButton} onPress={() => setShowExport(false)}>
            <Text style={styles.exportText}>🔓 Export Schedule</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowExport(true)}>
            <MaterialIcons name="more-vert" size={28} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <ViewTabs />
      
      {/* Navigation - different for each view */}
      {activeView === 'Daily View' ? <DayNavigation /> : <WeekNavigation />}
      
      {/* Content */}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  exportButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  exportText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#f3f4f6',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
  },
  weekNavContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  navButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  navButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  gridContainer: {
    flex: 1,
    padding: 10,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    paddingLeft: 10,
  },
  verticalScrollContainer: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timeColumn: {
    width: 80,
  },
  horizontalScrollContainer: {
    flex: 1,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeHeaderCell: {
    height: 60,
    backgroundColor: '#f0f0f0',
  },
  timeCell: {
    height: 80,
    backgroundColor: '#f9f9f9',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timePeriod: {
    fontSize: 12,
    color: '#666',
  },
  daysHeader: {
    flexDirection: 'row',
  },
  dayHeaderCell: {
    width: 120,
    height: 60,
    backgroundColor: '#f0f0f0',
  },
  dayName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dayDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleRow: {
    flexDirection: 'row',
  },
  scheduleCell: {
    width: 120,
    height: 80,
    backgroundColor: '#fff',
    padding: 4,
  },
  classContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
    padding: 6,
    justifyContent: 'space-between',
  },
  classSubject: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  classInfo: {
    fontSize: 12,
    color: '#424242',
  },
  classTimeContainer: {
    alignSelf: 'flex-start',
  },
  classTime: {
    fontSize: 10,
    color: '#616161',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  // Daily View Styles
  dailyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 10,
  },
  scheduleIcon: {
    marginRight: 8,
  },
  dailyScrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  dailyClassCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dailyTimeContainer: {
    alignItems: 'flex-start',
    marginRight: 20,
    minWidth: 80,
  },
  dailyStartTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dailyTimePeriod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dailyToText: {
    fontSize: 12,
    color: '#999',
    marginVertical: 2,
  },
  dailyEndTime: {
    fontSize: 14,
    color: '#666',
  },
  dailyClassInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  dailySubject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  dailyClass: {
    fontSize: 14,
    color: '#6b7280',
  },
  noClassesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noClassesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  // List View Styles
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 10,
  },
  listScrollContainer: {
    flex: 1,
  },
  listDaySection: {
    marginBottom: 25,
  },
  listDayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    paddingLeft: 5,
  },
  listClassCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listTimeContainer: {
    marginRight: 15,
    minWidth: 120,
  },
  listTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  listClass: {
    fontSize: 12,
    color: '#6b7280',
  },
  listSubjectContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

export default ScheduleApp;