
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../Context/authContext';
import { getEventsAndAssignments, getTeacherDashboard, getTeacherTimetable } from '../../api/authapi';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Dashboard = () => {
    const navigation = useNavigation();

    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        totalClasses: 0,
        totalStudents: 0,
        totalAssignments: 0,
        totalSubjects: 0
    });
    const [schedule, setSchedule] = useState([]);

    const formatTimeToAMPM = (timeString) => {
        if (!timeString) return "Unknown";
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTeacherTimetable(token);

            const today = new Date().toLocaleDateString("en-US", { weekday: "long" }); // e.g. "Saturday"

            // Adjust mapping based on backend response
            const formatted = data
                .filter((item) => item.day === today) // only today's schedule
                .map((item) => ({
                    subject: item.subject || item.subjectName || "Unknown",
                    room: item.room || item.classRoom || "Unknown",
                    startTime: formatTimeToAMPM(item.startTime), // convert here
                    endTime: formatTimeToAMPM(item.endTime),
                    status: getStatus(item.startTime, item.endTime),
                    color: "#3b82f6",
                    textColor: "#10B981",
                }));

            setSchedule(formatted);
        };

        fetchData();
    }, [token]);

    // Helper functions
    const formatTime = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const getStatus = (start, end) => {
        const now = new Date();
        const startTime = new Date(start);
        const endTime = new Date(end);

        if (now < startTime) return "Upcoming";
        if (now > endTime) return "Completed";
        return "Ongoing";
    };
    useEffect(() => {
        if (token) {
            fetchDashboard();
            fetchEventsAndAssignments();
        }
    }, [token]);

    const fetchDashboard = async () => {
        const res = await getTeacherDashboard(token);
        if (res.success && res.data) {
            setDashboardData({
                totalClasses: res.data.totalClasses,
                totalStudents: res.data.totalStudents,
                totalAssignments: res.data.totalAssignments,
                totalSubjects: res.data.totalSubjects
            });
        }
    };

    const fetchEventsAndAssignments = async () => {
        const res = await getEventsAndAssignments(token);

        // Map events to UI format
        const mappedEvents = (res.events || []).map(event => {
            // Split "d/m/yyyy" into parts
            const [day, month, year] = event.startDate.split('/').map(Number);

            const start = new Date(year, month - 1, day);

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            return {
                month: monthNames[start.getMonth()],
                date: start.getDate(),
                title: event.title,
                time: event.startTime
            };
        });
        const mappedAssignment = (res.assignments || []).map(assigment => {
            // Split "d/m/yyyy" into parts
            const [day, month, year] = assigment.startDate.split('/').map(Number);

            const start = new Date(year, month - 1, day);

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            return {
                month: monthNames[start.getMonth()],
                date: start.getDate(),
                title: assigment.title,
                description: assigment.description,
                start: assigment.startTime,
                end: assigment.endTime,
            };
        });
        setEvents(mappedEvents);
        setAssignments(mappedAssignment);
    };

    const cards = [
        { number: dashboardData.totalClasses, label: 'My Classes' },
        { number: dashboardData.totalStudents, label: 'Total Students' },
        { number: dashboardData.totalSubjects, label: 'Subjects' },
        { number: dashboardData.totalAssignments, label: 'Assignments' },
    ];
    const handleCardPress = (label) => {
        switch (label) {
            case 'My Classes':
                navigation.navigate('Class'); // Replace with your screen name
                break;
            case 'Total Students':
                navigation.navigate('Student'); // Replace with your screen name
                break;
            case 'Assignments':
                navigation.navigate('AssignmentsScreen'); // Replace with your screen name
                break;
            default:
                break;
        }
    };


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#999" />
                <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
            </View>

            {/* Greeting and date */}
            <Text style={styles.greeting}>Hello, {user?.username || 'Teacher'}!</Text>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })}</Text>

            {/* Horizontal cards */}
            <FlatList
                data={cards}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.label)}>
                        <Text style={styles.cardNumber}>{item.number}</Text>
                        <View style={styles.cardLabelRow}>
                            <Text style={styles.cardLabel}>{item.label}</Text>
                            <Icon name="chevron-right" size={14} color="#666" />
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Today's Schedule */}
            <View style={styles.section}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Today’s Schedule</Text>
                    <TouchableOpacity style={styles.seeAllRow}>
                        <Text style={styles.seeAll}>See all</Text>
                        <Icon name="chevron-right" size={16} color="#3b82f6" />
                    </TouchableOpacity>
                </View>

                {schedule.length > 0 ? (
                    schedule.map((item, index) => (
                        <View key={index} style={styles.card1}>
                            <View style={styles.left}>
                                <View
                                    style={[styles.colorBar, { backgroundColor: item.color }]}
                                />
                                <View>
                                    <Text style={styles.subject}>{item.subject}</Text>
                                    <Text style={styles.room}>{item.room}</Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.time}>{item.startTime} - {item.endTime} </Text>
                                <Text style={[styles.status, { color: item.textColor }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ marginTop: 10, color: "#666" }}>
                        No schedule for today
                    </Text>
                )}
            </View>

            {/* Upcoming Events */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    <TouchableOpacity style={styles.seeAllRow}>
                        <Text style={styles.seeAll}>See all</Text>
                        <Icon name="chevron-right" size={16} color="#3b82f6" />
                    </TouchableOpacity>
                </View>
                {events.length > 0 ? events.map((event, index) => (
                    <View key={index} style={styles.eventCard}>
                        <View style={styles.dateBox}>
                            <Text style={styles.month}>{event.month}</Text>
                            <Text style={styles.date}>{event.date}</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventTime}>{event.time}</Text>
                        </View>
                    </View>
                )) : (
                    <Text style={{ textAlign: 'center', color: '#6b7280' }}>No Upcoming Events</Text>
                )}

            </View>

            {/* Active Assignments */}
            <View style={styles.section}>

                <View >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Active Assignment</Text>
                        <TouchableOpacity style={styles.seeAllRow}>
                            <Text style={styles.seeAll}>See all</Text>
                            <Icon name="chevron-right" size={16} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>

                    {assignments.length > 0 ? assignments.map((a, index) => (
                        <View key={index} style={styles.eventCard}>
                            <View style={styles.dateBox}>
                                <Text style={styles.month}>{a.month}</Text>
                                <Text style={styles.date}>{a.date}</Text>
                            </View>
                            <View style={styles.eventInfo}>
                                <Text style={styles.eventTitle}>{a.title}</Text>
                                <Text style={styles.eventTime}>{a.time}</Text>
                            </View>
                        </View>
                    )) : (
                        <Text style={{ textAlign: 'center', color: '#6b7280' }}>No Pending Assignments</Text>
                    )}
                </View>
            </View>




        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', paddingTop: 40, paddingHorizontal: 16 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 24, paddingHorizontal: 12, height: 40, marginBottom: 8, borderColor: "#E5E7EB", borderWidth: 1 },
    searchInput: { flex: 1, fontSize: 16, color: '#6B7280', fontWeight: '400' },
    greeting: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 4 },
    dateText: { fontSize: 14, color: '#6B7280' },
    cardsContainer: { paddingVertical: 16, },
    card: { height: 80, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 16, paddingHorizontal: 16, marginRight: 16, shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6 },
    cardNumber: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#111827', textAlign: 'center' },
    cardLabelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardLabel: { fontSize: 12, color: '#111827', fontWeight: '500' },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    headerTitle: { fontSize: 16, fontWeight: "500", color: "#111827" },
    seeAll: { fontSize: 14, color: "#3B82F6", borderBottomColor: "#3b82f6", borderBottomWidth: 1 },
    card1: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 19, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, marginBottom: 12, },
    left: { flexDirection: "row", alignItems: "center" },
    colorBar: { width: 4, height: 48, borderRadius: 4, marginRight: 12 },
    subject: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
    room: { fontSize: 10, color: "#6B7280", fontWeight: '400' },
    right: { alignItems: "flex-end" },
    time: { fontSize: 12, fontWeight: "500", marginBottom: 4, color: '#111827' },
    status: { fontSize: 10, fontWeight: '400' },
    section: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
    section1: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 145, justifyContent: 'center', alignItems: 'center' },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '500', color: '#111827', textAlign: 'center' },
    seeAllRow: { flexDirection: 'row', alignItems: 'center', },
    eventCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 8, marginBottom: 8 },
    dateBox: { width: 50, height: 50, backgroundColor: '#f5f9ffff', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
    month: { fontSize: 12, color: '#3b82f6', fontWeight: '500' },
    date: { fontSize: 16, fontWeight: '700', color: '#3b82f6' },
    eventInfo: { flex: 1 },
    eventTitle: { fontSize: 14, fontWeight: '400', color: '#111827', marginBottom: 4 },
    eventTime: { fontSize: 10, color: '#6B7280', fontWeight: '400' },
    assignmentBox: { alignItems: 'center', paddingVertical: 16 },
    assignmentText: { marginTop: 6, fontSize: 14, color: '#6b7280', fontWeight: '400' },
});

export default Dashboard;
