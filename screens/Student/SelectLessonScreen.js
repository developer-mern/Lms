import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../Context/authContext';
import { getchildrenvideolessons } from '../../api/authapi';
const { width } = Dimensions.get("window");

const SelectLessonScreen = () => {
    const { token } = useAuth();

    const navigation = useNavigation();
    const route = useRoute();
    const { subjectId, subjectName, teacherName } = route.params || {}; // ✅ get subject data

    const [searchText, setSearchText] = useState("");
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch lessons for this subject
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                const res = await getchildrenvideolessons(token);

                if (res?.success && res?.data) {
                    // filter by selected subjectId
                    const subjectLessons = res.data.filter(
                        (lesson) => lesson.subjectId === subjectId
                    );

                    // Map lessons into your UI shape (number + name + description)
                    const mapped = subjectLessons.map((lesson, idx) => ({
                        id: lesson._id,
                        number: String(idx + 1).padStart(2, "0"),
                        name: lesson.title,
                        description: lesson.description,
                        fullData: lesson, // keep original for next screen
                    }));

                    setLessons(mapped);
                }
            } catch (err) {
                console.error("Failed to load lessons", err);
            } finally {
                setLoading(false);
            }
        };

        if (subjectId) {
            fetchLessons();
        }
    }, [subjectId]);

    // Filter lessons based on search text
    const filteredLessons = lessons.filter(
        (lesson) =>
            lesson.name.toLowerCase().includes(searchText.toLowerCase()) ||
            lesson.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleLessonPress = (lesson) => {
        navigation.navigate("LessonDetails", { lesson });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {subjectName ? subjectName : "Selected Lesson"}
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search lessons..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText("")}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Lessons List */}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <Text style={styles.noResults}>Loading...</Text>
                ) : filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson) => (
                        <TouchableOpacity
                            key={lesson.id}
                            style={styles.lessonCard}
                            activeOpacity={0.7}
                            onPress={() => handleLessonPress(lesson)}
                        >
                            <View style={styles.contentContainer}>
                                <View style={styles.lessonHeader}>
                                    <Text style={styles.lessonNumber}>{lesson.number}</Text>
                                    <Text style={styles.lessonName}>{lesson.name}</Text>
                                </View>
                                <Text style={styles.lessonDescription}>
                                    {lesson.description}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noResults}>No lessons found</Text>
                )}
            </ScrollView>
        </View>
    );
};
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e0e0e0",
    },
    headerTitle: {
        fontSize: width * 0.05, // responsive font size
        fontWeight: "600",
        color: "#333",
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
        padding: 16,
        gap: 12,
    },
    lessonCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
    },
    contentContainer: {
        flex: 1,
        paddingRight: 12,
    },
    lessonHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    lessonNumber: {
        fontSize: width * 0.04,
        fontWeight: "600",
        color: "#4285f4",
        marginRight: 12,
        minWidth: 28,
    },
    lessonName: {
        fontSize: width * 0.045,
        fontWeight: "600",
        color: "#333",
        flexShrink: 1,
    },
    lessonDescription: {
        fontSize: width * 0.038,
        color: "#666",
        lineHeight: 20,
    },
});

export default SelectLessonScreen;
