import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

export default function ExamScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("Upcoming");

    const tabs = ["Upcoming", "Today", "Past", "All"];
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const classOptions = [
        { label: 'All classes', value: 'all' },
        { label: 'Class 1', value: '1' },
        { label: 'Class 2', value: '2' },
    ];

    const subjectOptions = [
        { label: 'All subjects', value: 'all' },
        { label: 'Math', value: 'math' },
        { label: 'Science', value: 'science' },
    ];
    const Allexams = [
        {
            title: "Final Exam",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Science",
            status: "Scheduled",
            statusColor: "#FFC107",
            buttons: ["Grade", "Report"],
            disable : true
        },
        {
            title: "Final Exam",
            date: "August 21, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Science",
            status: "Completed",
            statusColor: "#4CAF50",
            buttons: ["Grade"]
        },
        {
            title: "Final Exam",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Science",
            status: "Published",
            statusColor: "#2196F3",
            buttons: ["Grade", "Report"]
        },
        {
            title: "Final Exam",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Science",
            status: "Ongoing",
            statusColor: "#FF9800",
            buttons: ["Grade"],
            disable : true
        },
        {
            title: "Final Exam",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Science",
            status: "Cancelled",
            statusColor: "#F44336",
            buttons: ["Grade", "Report"]
        }
    ];

    const UpcomingExams = [
        {
            title: "Mid-Term Exam",
            date: "August 25, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Mathematics",
            status: "Scheduled",
            statusColor: "#FFC107",
            buttons: ["Grade", "Report"]
        },
        {
            title: "Unit Test",
            date: "August 30, 2025",
            access: "Class Teacher",
            grade: "Class 9",
            subject: "Physics",
            status: "Scheduled",
            statusColor: "#FFC107",
            buttons: ["Grade"]
        },
        {
            title: "Practical Exam",
            date: "September 5, 2025",
            access: "Lab Instructor",
            grade: "Class 11",
            subject: "Chemistry",
            status: "Scheduled",
            statusColor: "#FFC107",
            buttons: ["Report"]
        }
    ];

    const TodaysExams = [
        {
            title: "Science Quiz",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 8",
            subject: "Science",
            status: "Ongoing",
            statusColor: "#FF9800",
            buttons: ["Grade"]
        },
        {
            title: "English Test",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 12",
            subject: "English",
            status: "Scheduled",
            statusColor: "#FFC107",
            buttons: ["Grade", "Report"]
        },
        {
            title: "History Exam",
            date: "August 20, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "History",
            status: "Published",
            statusColor: "#2196F3",
            buttons: ["Report"]
        }
    ];

    const PastExams = [
        {
            title: "First Term Exam",
            date: "July 15, 2025",
            access: "Class Teacher",
            grade: "Class 10",
            subject: "Biology",
            status: "Completed",
            statusColor: "#4CAF50",
            buttons: ["Grade", "Report"]
        },
        {
            title: "Monthly Test",
            date: "July 30, 2025",
            access: "Class Teacher",
            grade: "Class 9",
            subject: "Geography",
            status: "Completed",
            statusColor: "#4CAF50",
            buttons: ["Grade"]
        },
        {
            title: "Practical Exam",
            date: "August 5, 2025",
            access: "Lab Instructor",
            grade: "Class 11",
            subject: "Computer Science",
            status: "Cancelled",
            statusColor: "#F44336",
            buttons: ["Report"]
        }
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Icon name="search" size={24} color="#999" />
                    <TextInput
                        placeholder="Search Exams"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                </View>

                {/* Class & Subject Dropdowns */}
                <View style={styles.row}>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>Class</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectedText}
                            data={classOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="All classes"
                            value={selectedClass}
                            onChange={item => setSelectedClass(item.value)}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>Subject</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectedText}
                            data={subjectOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="All subjects"
                            value={selectedSubject}
                            onChange={item => setSelectedSubject(item.value)}
                        />
                    </View>
                </View>
                <View style={styles.container1}>
                    {tabs.map((tab, index) => (
                        <React.Fragment key={tab}>
                            {/* Left separator - only show if not first tab AND not adjacent to active tab */}
                            {index > 0 && !(
                                (activeTab === tab) ||
                                (tabs[index - 1] === activeTab)
                            ) && (
                                    <View style={styles.separator} />
                                )}

                            {/* Tab Button */}
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === tab && styles.activeTab
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab && styles.activeTabText
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>

                            {/* Right separator - only show if not last tab AND not adjacent to active tab */}
                            {index < tabs.length - 1 && !(
                                (activeTab === tab) ||
                                (tabs[index + 1] === activeTab)
                            ) && (
                                    <View style={styles.separator} />
                                )}
                        </React.Fragment>
                    ))}
                </View>

                <View style={styles.container2}>
                    <Text style={styles.examlist}>Exam List</Text>
                    {activeTab === 'Upcoming' &&
                        <View>
                            {UpcomingExams.map((exam, idx) => (
                                <View key={idx} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.examTitle}>{exam.title}</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: `${exam.statusColor}20` }
                                            ]}
                                        >
                                            <Text
                                                style={[styles.statusText, { color: exam.statusColor }]}
                                            >
                                                {exam.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <Text style={styles.final}>{exam.title}</Text>
                                        <Text style={styles.date}>{exam.date}</Text>
                                    </View>

                                    <View style={styles.metaRow1}>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Access:</Text>
                                            <Text style={styles.classteacher}>{exam.access}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Grade: </Text>
                                            <Text style={styles.classteacher}>{exam.grade}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Subject: </Text>
                                            <Text style={styles.classteacher}>{exam.subject}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        {exam.buttons.map((btn, i) => (
                                            const isDisabled = btn.
                                            <TouchableOpacity key={i} style={styles.button} onPress={() => {
                                                if (btn === "Report") {
                                                    navigation.navigate('Report Screen', { examData: exam });
                                                }
                                                else if (btn === "Grade") {
                                                    navigation.navigate('Grade Screen', { examData: exam })
                                                }
                                                // For "Grade" button, you can add other actions or leave empty
                                            }}>
                                                <Icon
                                                    name={btn === "Grade" ? "grading" : "bar-chart"}
                                                    size={18}
                                                    color="#1976D2"
                                                />
                                                <Text style={styles.buttonText}>{btn}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    }
                    {activeTab === 'Today' &&
                        <View>
                            {TodaysExams.map((exam, idx) => (
                                <View key={idx} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.examTitle}>{exam.title}</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: `${exam.statusColor}20` }
                                            ]}
                                        >
                                            <Text
                                                style={[styles.statusText, { color: exam.statusColor }]}
                                            >
                                                {exam.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <Text style={styles.final}>{exam.title}</Text>
                                        <Text style={styles.date}>{exam.date}</Text>
                                    </View>

                                    <View style={styles.metaRow1}>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Access:</Text>
                                            <Text style={styles.classteacher}>{exam.access}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Grade: </Text>
                                            <Text style={styles.classteacher}>{exam.grade}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Subject: </Text>
                                            <Text style={styles.classteacher}>{exam.subject}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        {exam.buttons.map((btn, i) => (
                                            <TouchableOpacity key={i} style={styles.button} onPress={() => {
                                                if (btn === "Report") {
                                                    navigation.navigate('Report Screen', { examData: exam });
                                                }
                                                else if (btn === "Grade") {
                                                    navigation.navigate('Grade Screen', { examData: exam })
                                                }
                                                // For "Grade" button, you can add other actions or leave empty
                                            }}>
                                                <Icon
                                                    name={btn === "Grade" ? "grading" : "bar-chart"}
                                                    size={18}
                                                    color="#1976D2"
                                                />
                                                <Text style={styles.buttonText}>{btn}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    }
                    {activeTab === 'Past' &&
                        <View>
                            {PastExams.map((exam, idx) => (
                                <View key={idx} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.examTitle}>{exam.title}</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: `${exam.statusColor}20` }
                                            ]}
                                        >
                                            <Text
                                                style={[styles.statusText, { color: exam.statusColor }]}
                                            >
                                                {exam.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <Text style={styles.final}>{exam.title}</Text>
                                        <Text style={styles.date}>{exam.date}</Text>
                                    </View>

                                    <View style={styles.metaRow1}>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Access:</Text>
                                            <Text style={styles.classteacher}>{exam.access}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Grade: </Text>
                                            <Text style={styles.classteacher}>{exam.grade}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Subject: </Text>
                                            <Text style={styles.classteacher}>{exam.subject}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        {exam.buttons.map((btn, i) => (
                                            <TouchableOpacity key={i} style={styles.button} onPress={() => {
                                                if (btn === "Report") {
                                                    navigation.navigate('Report Screen', { examData: exam });
                                                }
                                                else if (btn === "Grade") {
                                                    navigation.navigate('Grade Screen', { examData: exam })
                                                }
                                                // For "Grade" button, you can add other actions or leave empty
                                            }}>
                                                <Icon
                                                    name={btn === "Grade" ? "grading" : "bar-chart"}
                                                    size={18}
                                                    color="#1976D2"
                                                />
                                                <Text style={styles.buttonText}>{btn}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    }
                    {activeTab === 'All' &&
                        <View>
                            {Allexams.map((exam, idx) => (
                                <View key={idx} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.examTitle}>{exam.title}</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: `${exam.statusColor}20` }
                                            ]}
                                        >
                                            <Text
                                                style={[styles.statusText, { color: exam.statusColor }]}
                                            >
                                                {exam.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <Text style={styles.final}>{exam.title}</Text>
                                        <Text style={styles.date}>{exam.date}</Text>
                                    </View>

                                    <View style={styles.metaRow1}>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Access:</Text>
                                            <Text style={styles.classteacher}>{exam.access}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Grade: </Text>
                                            <Text style={styles.classteacher}>{exam.grade}</Text>
                                        </View>
                                        <View style={styles.metacol}>
                                            <Text style={styles.access}>Subject: </Text>
                                            <Text style={styles.classteacher}>{exam.subject}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        {exam.buttons.map((btn, i) => (
                                            <TouchableOpacity key={i} style={styles.button} onPress={() => {
                                                if (btn === "Report") {
                                                    navigation.navigate('Report Screen', { examData: exam });
                                                }
                                                else if (btn === "Grade") {
                                                    navigation.navigate('Grade Screen', { examData: exam })
                                                }
                                                // For "Grade" button, you can add other actions or leave empty
                                            }}>
                                                <Icon
                                                    name={btn === "Grade" ? "grading" : "bar-chart"}
                                                    size={18}
                                                    color="#1976D2"
                                                />
                                                <Text style={styles.buttonText}>{btn}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    }
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F6',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 40,
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    dropdownContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    dropdown: {
        height: 45,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    placeholder: {
        fontSize: 16,
        color: '#999',
    },
    selectedText: {
        fontSize: 16,
        color: '#333',
    },
    container1: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 16,
    },
    tabButton: {
        paddingVertical: 10,
        // paddingHorizontal: 15,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        margin: 2,
    },
    tabText: {
        color: '#0A0A0A',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#000',
    },
    separator: {
        width: 0.65,
        height: '40%',
        backgroundColor: '#aaa',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 6,
    },
    examlist: {
        marginTop: 16,
        fontSize: 20,
        fontWeight: '500',
        color: "#111827"
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    examTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#111827'
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12
    },
    statusText: {
        fontSize: 14,
        fontWeight: '400'
    },
    metaRow: {
        width: '92%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        justifyContent: "space-between"
    },
    date: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },
    access: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7280',
    },
    classteacher: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827'
    },
    metaRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 46,
    },

    final: {
        backgroundColor: '#E5E7EB',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 16,
        width: '100%',

    },
    button: {
        flex: 1, // Full width
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centers icon + text
        borderWidth: 1,
        borderColor: '#2563EB',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    buttonText: {
        marginLeft: 6, // Small gap between icon and text
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center', // Ensures text aligns if wrapped
    },

});
