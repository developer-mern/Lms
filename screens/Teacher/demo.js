
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../Context/authContext';
import { getExamsByClassApi, getMyTeacherClassesApi } from '../../api/authapi';

export default function ExamScreen() {
    const { token } = useAuth();
    const navigation = useNavigation();
    
    const [activeTab, setActiveTab] = useState("Upcoming");
    const [classesTeacher, setTeacherClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedClass, setSelectedClass] = useState("all");
    const [selectedSubject, setSelectedSubject] = useState("all");
    const [exams, setExams] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const tabs = ["Upcoming", "Today", "Past", "All"];

    const getFilteredExams = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return exams
            .filter(exam => {
                const examDate = new Date(exam.examDate);
                examDate.setHours(0, 0, 0, 0);

                // Filter by search query
                if (searchQuery && !exam.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }

                // Filter by selected class
                if (selectedClass && selectedClass !== "all") {
                    const examClassId = exam.grade?.id || exam.classId;
                    if (examClassId != selectedClass) {
                        return false;
                    }
                }

                // Filter by selected subject
                if (selectedSubject && selectedSubject !== "all") {
                    const examSubject = typeof exam.subject === "string" ? exam.subject : exam.subject?.name;
                    if (!examSubject || examSubject.toLowerCase() !== selectedSubject.toLowerCase()) {
                        return false;
                    }
                }

                // Filter by active tab
                if (activeTab === "Upcoming") return examDate > today && exam.status !== "CANCELLED";
                if (activeTab === "Today") return examDate.getTime() === today.getTime() && exam.status !== "CANCELLED";
                if (activeTab === "Past") return examDate < today || exam.status === "CANCELLED";
                return true; // "All"
            })
            .map(exam => {
                // Map to display format
                let statusColor = "#4CAF50"; // Default green
                if (exam.status === "SCHEDULED") statusColor = "#FFC107";
                else if (exam.status === "PUBLISHED") statusColor = "#2196F3";
                else if (exam.status === "CANCELLED") statusColor = "#F44336";
                else if (exam.status === "ONGOING") statusColor = "#FF9800";

                return {
                    ...exam,
                    grade: exam.grade?.name || "",
                    subject: typeof exam.subject === "string" ? exam.subject : exam.subject?.name || "",
                    date: new Date(exam.examDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }),
                    access: "Class Teacher",
                    statusColor,
                    buttons: ["Grade"],
                };
            });
    };

    useEffect(() => {
        if (selectedClass && selectedClass !== "all") {
            fetchExams(selectedClass);
        } else if (selectedClass === "all") {
            // Fetch exams for all classes
            fetchAllExams();
        }
    }, [selectedClass]);

    useEffect(() => {
        fetchMyTeacherClasses();
    }, [token]);

    const fetchExams = async (classId) => {
        if (!classId || classId === "all") return;
        
        setLoading(true);
        try {
            const data = await getExamsByClassApi(classId, token);
            setExams(data || []);
        } catch (err) {
            console.error("Error fetching exams:", err);
            setError("Failed to load exams");
            setExams([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllExams = async () => {
        if (classesTeacher.length === 0) return;
        
        setLoading(true);
        try {
            const allExamsPromises = classesTeacher.map(cls => 
                getExamsByClassApi(cls.id, token).catch(err => {
                    console.error(`Error fetching exams for class ${cls.id}:`, err);
                    return [];
                })
            );
            const allExamsArrays = await Promise.all(allExamsPromises);
            const allExams = allExamsArrays.flat();
            setExams(allExams);
        } catch (err) {
            console.error("Error fetching all exams:", err);
            setError("Failed to load exams");
            setExams([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyTeacherClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const classesData = await getMyTeacherClassesApi(token);
            setTeacherClasses(classesData || []);
        } catch (err) {
            console.error("Error fetching teacher classes:", err);
            setError("Failed to load classes");
            setTeacherClasses([]);
        } finally {
            setLoading(false);
        }
    };

    const classOptions = [
        { label: "All Classes", value: "all" },
        ...classesTeacher.map(cls => ({
            label: `${cls.name} (${cls.gradeName})`,
            value: cls.id
        }))
    ];

    const allSubjects = classesTeacher
        .flatMap(cls => cls.subjects || [])
        .filter((subject, index, array) => array.indexOf(subject) === index);

    const subjectOptions = [
        { label: "All Subjects", value: "all" },
        ...allSubjects.map(subj => ({
            label: subj,
            value: subj.toLowerCase()
        }))
    ];

    const displayedExams = getFilteredExams();

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton} 
                    onPress={() => {
                        setError(null);
                        fetchMyTeacherClasses();
                    }}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Icon name="search" size={24} color="#999" />
                    <TextInput
                        placeholder="Search Exams"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
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

                {/* Tab Navigation */}
                <View style={styles.container1}>
                    {tabs.map((tab, index) => (
                        <React.Fragment key={tab}>
                            {/* Left separator */}
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

                            {/* Right separator */}
                            {index < tabs.length - 1 && !(
                                (activeTab === tab) ||
                                (tabs[index + 1] === activeTab)
                            ) && (
                                <View style={styles.separator} />
                            )}
                        </React.Fragment>
                    ))}
                </View>

                {/* Exam List */}
                <View style={styles.container2}>
                    <Text style={styles.examlist}>Exam List</Text>

                    {loading && <Text style={styles.loadingText}>Loading exams...</Text>}

                    {!loading && displayedExams.map((exam, idx) => (
                        <View key={`${exam.id || idx}-${idx}`} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.examTitle}>{exam.title}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: `${exam.statusColor}20` }]}>
                                    <Text style={[styles.statusText, { color: exam.statusColor }]}>
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
                                    <Text style={styles.access}>Grade:</Text>
                                    <Text style={styles.classteacher}>{exam.grade}</Text>
                                </View>
                                <View style={styles.metacol}>
                                    <Text style={styles.access}>Subject:</Text>
                                    <Text style={styles.classteacher}>{exam.subject}</Text>
                                </View>
                            </View>

                            <View style={styles.buttonRow}>
                                {exam.buttons.map((btn, i) => {
                                    const isDisabled =
                                        (btn === "Grade" && (exam.status === "SCHEDULED" || exam.status === "ONGOING")) ||
                                        (btn === "Report" && exam.status !== "COMPLETED" && exam.status !== "PUBLISHED");

                                    return (
                                        <TouchableOpacity
                                            key={`${btn}-${i}`}
                                            style={[styles.button, isDisabled && styles.buttonDisabled]}
                                            onPress={() => {
                                                if (isDisabled) return;
                                                if (btn === "Report") {
                                                    navigation.navigate('Report Screen', { examData: exam });
                                                } else if (btn === "Grade") {
                                                    navigation.navigate('Grade Screen', { examData: exam });
                                                }
                                            }}
                                            disabled={isDisabled}
                                        >
                                            <Icon 
                                                name={btn === "Grade" ? "grading" : "bar-chart"} 
                                                size={18} 
                                                color={isDisabled ? "#ddd" : "#1976D2"} 
                                            />
                                            <Text style={[styles.buttonText, isDisabled && styles.buttonTextDisabled]}>
                                                {btn}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))}

                    {!loading && displayedExams.length === 0 && (
                        <Text style={styles.noDataText}>No exams found</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
        paddingVertical: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    dropdownContainer: {
        flex: 0.48,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    dropdown: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 4,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: '#1976D2',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    activeTabText: {
        color: 'white',
    },
    separator: {
        width: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
    },
    container2: {
        flex: 1,
    },
    examlist: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    examTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    final: {
        fontSize: 14,
        color: '#666',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    metaRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    metacol: {
        flex: 1,
    },
    access: {
        fontSize: 12,
        color: '#999',
    },
    classteacher: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 8,
        backgroundColor: '#f0f0f0',
    },
    buttonDisabled: {
        backgroundColor: '#f5f5f5',
    },
    buttonText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#1976D2',
        fontWeight: '500',
    },
    buttonTextDisabled: {
        color: '#ddd',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#F44336',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#1976D2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});