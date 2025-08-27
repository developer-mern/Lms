
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getMyClassesApi } from "../../api/authapi"; // <-- import here
import { useAuth } from "../../Context/authContext"; // Assuming you have token stored here

export default function MyClassScreen() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const { token } = useAuth(); // get token from context

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            const data = await getMyClassesApi(token);
            setClasses(data);
            setLoading(false);
        };
        fetchClasses();
    }, [token]);

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (loading) return <ActivityIndicator size="large" color="#3B82F6" style={{ flex: 1, justifyContent: "center" }} />;

    return (
        <View style={styles.mainBackground}>
            <SafeAreaView>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Subheading */}
                    <View style={styles.container1}>
                        <MaterialIcons name="school" size={24} color="#666666" style={styles.icon1} />
                        <View>
                            <Text style={styles.subHeading}>Supervised Classes</Text>
                            <Text style={styles.subDescription}>Classes where you are the class teacher</Text>
                        </View>
                    </View>

                    {/* Search Box */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color="#6B7280" style={{ marginLeft: 16, top: 3 }} />
                        <TextInput
                            placeholder="Search classes"
                            placeholderTextColor="#9CA3AF"
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>

                    {/* Class Cards */}
                    {filteredClasses.map((cls) => (
                        <View key={cls._id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.leftSection}>
                                    <Text style={styles.className}>{cls.name}</Text>
                                    <View style={styles.roleTag}>
                                        <Text style={styles.roleText}>Class Teacher</Text>
                                    </View>
                                </View>
                                <View style={styles.studentCount}>
                                    <MaterialIcons name="groups" size={24} color="#4B5563" />
                                    <Text style={styles.countText}>{cls.studentCount}</Text>
                                </View>
                            </View>

                            <View style={styles.gradeRow}>
                                <Text style={styles.gradeText}>{cls.grade?.name || "Grade N/A"}</Text>
                            </View>

                            {/* Subjects */}
                            <View style={styles.subjectsRow}>
                                {cls.subjects.map((sub, index) => (
                                    <View key={index} style={styles.subjectTag}>
                                        <Text style={styles.subjectText}>{sub.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBackground: {
        flex: 1,
        backgroundColor: "#F2F4F6",
    },
    Classcontainer: {
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 8,
        color: "#111827",
    },
    container1: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    icon1: {
        marginRight: 8,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 16,
    },
    subDescription: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 16,
        fontWeight: "400",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingVertical: 6,
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#666666",
        fontWeight: "400",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    className: {
        fontSize: 16,
        fontWeight: "500",
        marginRight: 16,
        color: "#000",
    },
    roleTag: {
        backgroundColor: "#E0F2FE",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 50,
    },
    roleText: {
        fontSize: 12,
        color: "#3B82F6",
        fontWeight: "500",
    },
    gradeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingTop: 8,
    },
    gradeText: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "500",
    },
    studentCount: {
        flexDirection: "row",
        alignItems: "center",
    },
    countText: {
        fontSize: 12,
        color: "#6B7280",
        marginLeft: 8,
    },
    subjectsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 16,
    },
    subjectTag: {
        backgroundColor: "#E5E7EB",
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8,
        height: 26,
    },

    subjectText: {
        fontSize: 12,
        color: "#111827",
        fontWeight: "500",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    outlineButton: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#2563EB",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },
    outlineButtonText: {
        color: "#3B82F6",
        fontWeight: "500",
        fontSize: 14,
    },
});
