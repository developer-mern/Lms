import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AttendanceTracking() {
    const [selectedChild, setSelectedChild] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const ChildOption = [
        { label: 'Pranav Bhujbal X-A', value: '1' },
        { label: 'Pranav Bhujbal X-B', value: '2' },
        { label: 'Pranav Bhujbal X-C', value: '3' },
    ];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false); // close modal after selection
        setDate(currentDate);
    };

    const attendanceData = [
        { id: 1, date: 'Aug 18, 2025', status: 'Absent', notes: '-' },
        { id: 2, date: 'Aug 19, 2025', status: 'Present', notes: '-' },
        { id: 3, date: 'Aug 20, 2025', status: 'Absent', notes: '-' },
        { id: 4, date: 'Aug 21, 2025', status: 'Present', notes: '-' },
        { id: 5, date: 'Aug 22, 2025', status: 'Present', notes: '-' },
        { id: 6, date: 'Aug 23, 2025', status: 'Absent', notes: '-' },
    ];

    const getStatusColor = (status) => {
        return status === 'Present' ? '#10B981' : '#EF4444';
    };

    const getStatusIcon = (status) => {
        return status === 'Present' ? '✓' : '✗';
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    returnKeyType="search"
                    clearButtonMode="while-editing"  // iOS only
                />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View>
                    <Text style={styles.sectionTitle}>Attendance Tracking</Text>
                    <Text style={styles.sectionSubTitle}>Monitor your attendance and performance</Text>
                </View>

                {/* Export Button */}
                <TouchableOpacity style={styles.ExportButton}>
                    <Icon name="file-download" size={16} color='#2563EB' style={styles.ExportIcon} />
                    <Text style={styles.ExportText}>Export</Text>
                </TouchableOpacity>

                {/* Student Dropdown */}
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Class</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={ChildOption}
                        labelField="label"
                        valueField="value"
                        placeholder="Student"
                        value={selectedChild}
                        onChange={item => setSelectedChild(item.value)}
                    />
                </View>

                {/* Date Picker */}
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={styles.dateText}>{date.toDateString()}</Text>
                        <Icon name="calendar-today" size={20} color="#2563EB" />
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={styles.DaysCards}>
                    <View style={styles.card}>
                        <Text style={styles.Daystext}>07</Text>
                        <Text style={styles.InfoText}>Total Days</Text>
                    </View>
                    <View style={styles.card}>
                        {/* Percentage */}
                        <Text style={styles.Daystext}>85%</Text>

                        {/* Progress Bar */}
                        <View style={styles.progressBarBackground}>
                            <View
                                style={[styles.progressBarFill, { width: `${85}%` }]}
                            />
                        </View>

                        {/* Label */}
                        <Text style={styles.label}>Attendance Rate</Text>
                    </View>
                </View>
                <View style={styles.DaysCards}>
                    <View style={styles.PresentCard}>
                        <Text>80</Text>
                        <Text>Present</Text>
                    </View>
                    <View style={styles.AbsentCard}>
                        <Text>20</Text>
                        <Text>Absent</Text>
                    </View>
                    <View style={styles.LateCard}>
                        <Text>23</Text>
                        <Text>Late/ Excused</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.Tablecontainer}>
                    <Text style={styles.header}>Attendance Records</Text>
                    <Text style={styles.subheader}>Daily attendance for Pranav Bhujbal</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, styles.dateColumn]}>Date</Text>
                        <Text style={[styles.headerCell, styles.statusColumn]}>Status</Text>
                        <Text style={[styles.headerCell, styles.notesColumn]}>Notes</Text>
                    </View>

                    {/* Table Rows */}
                    <ScrollView style={styles.tableContainer}>
                        {attendanceData.map((record) => (
                            <View key={record.id} style={styles.tableRow}>
                                <Text style={[styles.cell, styles.dateColumn]}>{record.date}</Text>

                                <View style={[styles.cell, styles.statusColumn]}>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
                                        <Text style={styles.statusText}>
                                            {getStatusIcon(record.status)} {record.status}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={[styles.cell, styles.notesColumn]}>{record.notes}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F2F4F6'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#6B7280',
    },
    content: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
    },
    sectionSubTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#6B7280'
    },
    ExportButton: {
        width: '40%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8,
        borderWidth: 1,
        borderColor: '#2563EB',
        marginTop: 16,
    },
    ExportText: {
        fontSize: 12,
        fontWeight: '500'
    },
    dropdownContainer: {
        marginTop: 16
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 8,
        color: "#111827"
    },
    dropdown: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E5E7EB',
    },
    placeholder: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '400'
    },
    dateButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#3B82F6",
        borderRadius: 12,
        backgroundColor: "#fff"
    },
    dateText: {
        fontSize: 16,
        color: "#3B82F6",
    },
    DaysCards: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16
    },
    card: {
        padding: 8,
        width: '45%',
        backgroundColor: '#10B9810D',
        borderRadius: 8
    },
    PresentCard: {
        padding: 8,
        width : '25%',
        backgroundColor: '#10B9810D',
        borderRadius: 8
    },
    AbsentCard: {
        padding: 8,
        width : '25%',
        backgroundColor: '#EF44440D',
        borderRadius: 8
    },
    LateCard: {
        padding: 8,
        width : '35%',
        backgroundColor: '#10B9810D',
        borderRadius: 8
    },
    Daystext: {
        fontSize: 20,
        color: '#111827',
        fontWeight: '600'
    },
    InfoText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500'
    },
    InfoText: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '500'
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 4,
        marginTop: 8,
        marginBottom: 8,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#10B981", // green
        borderRadius: 4,
    },
    Tablecontainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    subheader: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerCell: {
        fontWeight: '600',
        color: '#374151',
        fontSize: 14,
    },
    tableContainer: {
        maxHeight: 300, // Limit height for scroll
    },
    tableRow: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        alignItems: 'center',
    },
    cell: {
        fontSize: 14,
        color: '#374151',
    },
    dateColumn: {
        flex: 2, // 40% width
        textAlign: 'left',
    },
    statusColumn: {
        flex: 2, // 40% width
        textAlign: 'center',
    },
    notesColumn: {
        flex: 1, // 20% width
        textAlign: 'center',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'center',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
});
