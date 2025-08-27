import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '../../Context/authContext';
import { getchildrenvideolessons } from '../../api/authapi';

const SelectSubjectScreen = () => {
    const { token } = useAuth();

    const navigation = useNavigation();

    // State
    const [subjects, setSubjects] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch subjects from API
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setLoading(true);

                const res = await getchildrenvideolessons(token);

                if (res?.success && res?.data) {
                    // group by subject
                    const groupedSubjects = res.data.reduce((acc, lesson) => {
                        const key = lesson.subjectName || "Unknown";
                        if (!acc[key]) {
                            acc[key] = {
                                id: lesson.subjectId,
                                name: lesson.subjectName,
                                teacher: lesson.teacherName || "Unknown Teacher",
                            };
                        }
                        return acc;
                    }, {});
                    setSubjects(Object.values(groupedSubjects));
                }
            } catch (err) {
                console.error("Failed to load subjects", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [token]);

    // Filter subjects based on search input
    const filteredSubjects = subjects.filter(
        (subject) =>
            subject.name.toLowerCase().includes(searchText.toLowerCase()) ||
            subject.teacher.toLowerCase().includes(searchText.toLowerCase())
    );

    // Icon Components
    const SubjectIcon = () => (
        <View style={styles.iconContainer}>
            <View style={styles.icon}>
                <View style={styles.iconInner} />
            </View>
        </View>
    );

    const ChevronRight = () => (
        <View style={styles.chevronContainer}>
            <View style={styles.chevron} />
        </View>
    );

    // Render subject row
    const renderSubjectItem = (subject) => (
        <TouchableOpacity
            key={subject.id}
            style={styles.subjectContainer}
            activeOpacity={0.7}
            onPress={() =>
                navigation.navigate("Select Lesson", {
                    subjectId: subject.id,
                    subjectName: subject.name,
                    teacherName: subject.teacher,
                })
            }
        >
            <View style={styles.subjectItem}>
                <SubjectIcon />
                <View style={styles.textContainer}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.teacherName}>{subject.teacher}</Text>
                </View>
                <ChevronRight />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Select Subject</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#888" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search subjects or teachers..."
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#aaa"
                />
            </View>

            {/* Subject List */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>
                <View style={styles.listContainer}>
                    {loading ? (
                        <Text style={styles.noResults}>Loading...</Text>
                    ) : filteredSubjects.length > 0 ? (
                        filteredSubjects.map(renderSubjectItem)
                    ) : (
                        <Text style={styles.noResults}>No subjects found</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F6',
    },
    header: {
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 2,
        borderRadius: 25,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    scrollContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 8,
    },
    subjectContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: 16
    },
    subjectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
    },
    iconContainer: {
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        backgroundColor: '#4285f4',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconInner: {
        width: 12,
        height: 12,
        backgroundColor: '#ffffff',
        borderRadius: 2,
    },
    textContainer: {
        flex: 1,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 2,
    },
    teacherName: {
        fontSize: 14,
        color: '#888888',
        fontWeight: '400',
    },
    chevronContainer: {
        marginLeft: 16,
    },
    chevron: {
        width: 8,
        height: 8,
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: '#cccccc',
        transform: [{ rotate: '45deg' }],
    },
});

export default SelectSubjectScreen;