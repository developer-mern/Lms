import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Dashboard = () => {
    const schedule = [
        { subject: "Science", room: "Room 101", time: "08:30-09:30", status: "Ongoing", color: "#10B981", textColor: "#10B981" },
        { subject: "Mathematics", room: "Room 101", time: "10:00-11:00", status: "Upcoming", color: "#3b82f6", textColor: "#3b82f6" },
        { subject: "Physics", room: "Room 101", time: "13:00-14:00", status: "Upcoming", color: "#3b82f6", textColor: "#3b82f6" }
    ];

    const events = [
        { date: '15', month: 'May', title: 'Science Fair', time: '10:00' },
        { date: '20', month: 'May', title: 'Parent-teacher Meeting', time: '10:00' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}>
            {/* Search bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#999" />
                <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
            </View>

            {/* Greeting and date */}
            <Text style={styles.greeting}>Hello, Teacher</Text>
            <Text style={styles.dateText}>Friday, August 8, 2025</Text>

            {/* Horizontal cards */}
            <FlatList
                data={[
                    { number: '05', label: 'My Classes' },
                    { number: '92%', label: 'Total Students' },
                    { number: '92%', label: 'Assignments' },
                ]}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
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
                {schedule.map((item, index) => (
                    <View key={index} style={styles.card1}>
                        <View style={styles.left}>
                            <View style={[styles.colorBar, { backgroundColor: item.color }]} />
                            <View>
                                <Text style={styles.subject}>{item.subject}</Text>
                                <Text style={styles.room}>{item.room}</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.time}>{item.time}</Text>
                            <Text style={[styles.status, { color: item.textColor }]}>{item.status}</Text>
                        </View>
                    </View>
                ))}
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
                {events.map((event, index) => (
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
                ))}
            </View>

            {/* Active Assignments */}
            <View style={styles.section1}>
                <Icon name="task-alt" size={28} color="#10B981" />

                <View style={styles.assignmentBox}>
                    <Text style={styles.sectionTitle}>Active Assignments</Text>

                    <Text style={styles.assignmentText}>No Pending Assignments</Text>
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
