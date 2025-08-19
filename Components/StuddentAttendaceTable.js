import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StudentAttendanceTable = () => {
    const studentsData = [
        {
            name: 'Rugved Sharma',
            class: 'X-A',
            present: '50%',
            absent: '50%',
            late: '0%',
            excused: '0%'
        },
        {
            name: 'Carl Johnson',
            class: 'X-A',
            present: '50%',
            absent: '50%',
            late: '0%',
            excused: '0%'
        },
        {
            name: 'Ryder Sharma',
            class: 'X-A',
            present: '50%',
            absent: '0%',
            late: '0%',
            excused: '50%'
        },
        {
            name: 'Will Wilson',
            class: 'X-A',
            present: '0%',
            absent: '0%',
            late: '0%',
            excused: '100%'
        }
    ];

    const getPercentageColor = (percentage, type) => {
        switch (type) {
            case 'present':
                return '#4CAF50'; // Green
            case 'absent':
                return '#F44336'; // Red
            case 'late':
                return '#FF9800'; // Orange
            case 'excused':
                return '#2196F3'; // Blue
            default:
                return '#666';
        }
    };

    const TableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.studentColumn]}>Student</Text>
            <Text style={[styles.headerText, styles.classColumn]}>Class</Text>
            <Text style={[styles.headerText, styles.percentColumn]}>Present %</Text>
            <Text style={[styles.headerText, styles.percentColumn]}>Absent %</Text>
            <Text style={[styles.headerText, styles.percentColumn]}>Late %</Text>
            <Text style={[styles.headerText, styles.percentColumn]}>Excused %</Text>
        </View>
    );

    const TableRow = ({ student, index }) => (
        <View style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
            <Text style={[styles.cellText, styles.studentColumn, styles.studentName]}>
                {student.name}
            </Text>
            <Text style={[styles.cellText, styles.classColumn]}>
                {student.class}
            </Text>
            <Text style={[
                styles.cellText,
                styles.percentColumn,
                { color: getPercentageColor(student.present, 'present') }
            ]}>
                {student.present}
            </Text>
            <Text style={[
                styles.cellText,
                styles.percentColumn,
                { color: getPercentageColor(student.absent, 'absent') }
            ]}>
                {student.absent}
            </Text>
            <Text style={[
                styles.cellText,
                styles.percentColumn,
                { color: getPercentageColor(student.late, 'late') }
            ]}>
                {student.late}
            </Text>
            <Text style={[
                styles.cellText,
                styles.percentColumn,
                { color: getPercentageColor(student.excused, 'excused') }
            ]}>
                {student.excused}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Student Attendance</Text>
                <Text style={styles.subtitle}>Individual student attendance records</Text>
            </View>

            {/* Table */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    <TableHeader />
                    {studentsData.map((student, index) => (
                        <TableRow key={index} student={student} index={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
    },
    table: {
        minWidth: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    evenRow: {
        backgroundColor: '#fafafa',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        textAlign: 'left',
    },
    cellText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'left',
    },
    studentName: {
        fontWeight: '500',
        color: '#333',
    },
    studentColumn: {
        width: 140,
        paddingRight: 16,
    },
    classColumn: {
        width: 80,
        paddingRight: 16,
        textAlign: 'center',
    },
    percentColumn: {
        width: 80,
        paddingRight: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default StudentAttendanceTable;