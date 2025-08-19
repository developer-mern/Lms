import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ScheduleApp = () => {
  const [activeView, setActiveView] = useState('Weekly View');
  const [startDate, setStartDate] = useState(new Date(2025, 7, 18)); // August 18, 2025
  const [showExport, setShowExport] = useState(false);

  // Sample schedule data matching your image
  const scheduleData = [
    {
      day: 'Mon',
      time: '9:00 AM',
      subject: 'Maths',
      class: 'Class X-A',
      duration: '9:00 AM - 10:00 AM'
    }
  ];

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

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'long' }),
      shortName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    };
  });

  const currentWeekRange = () => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.getDate()} ${endDate.toLocaleDateString('en-US', { month: 'short' })}, ${startDate.getFullYear()}`;
  };

  const hasClass = (day, time) => {
    return scheduleData.find(item =>
      item.day === day.shortName && item.time === time
    );
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

  const ScheduleGrid = () => (
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
      <WeekNavigation />
      <ScheduleGrid />
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
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timeColumn: {
    width: 80,
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
});

export default ScheduleApp;