import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UploadLessonModal from "../../Components/UploadLesson";
import { useAuth } from "../../Context/authContext";
import { getMyTeacherVideoLessons } from "../../api/authapi";

export default function LessonScreen({ navigation }) {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await getMyTeacherVideoLessons(token);
                if (data.success) setLessons(data.lessons);
            } catch (err) {
                console.error("Error fetching lessons:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [token]);

    const filteredLessons = lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (lesson.subjectId?.toString() || "").toLowerCase().includes(searchText.toLowerCase())
    );

    if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
            {/* Search Bar */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 250,
                height: 40,
                paddingHorizontal: 20,
                paddingTop: 3,
                borderColor: '#E5E7EB',
                borderWidth: 1,
                marginBottom: 20
            }}>
                <MaterialIcons name="search" size={24} color="#6B7280" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#6B7280"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={{ flex: 1, marginLeft: 8, color: "#111827", fontSize: 14 }}
                />
            </View>

            {/* Lesson List */}
            <FlatList
                data={filteredLessons}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item: lesson }) => (
                    <TouchableOpacity
                        key={lesson._id}
                        style={{
                            flexDirection: "row",
                            padding: 8,
                            alignItems: "center",
                            borderBottomColor: '#E5E7EB',
                            borderBottomWidth: 1,
                        }}
                        onPress={() =>
                            navigation.navigate("TeacherLessonDetail", {
                                lessonId: lesson._id,
                                lessonTitle: lesson.title,
                                subject: lesson.subjectId,
                                date: new Date(lesson.createdAt).toLocaleDateString(),
                                description: lesson.description,
                                videoUrl: lesson.videoUrl,
                                thumbnailUrl: lesson.thumbnailUrl,
                                duration: lesson.duration,
                                teacherName: lesson.teacherId,
                                views: lesson.views,
                                isPublished: lesson.isPublished
                            })
                        }
                    >
                        <Image
                            source={{ uri: lesson.thumbnailUrl }}
                            style={{ width: 60, height: 40, borderRadius: 2, backgroundColor: "#f3f4f6" }}
                            resizeMode="cover"
                        />

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ color: "#111827", fontSize: 16, fontWeight: "500", marginBottom: -1 }}>
                                {lesson.title}
                            </Text>
                            <Text style={{ color: "#6B7280", fontWeight: "400", fontSize: 14 }}>
                                Subject ID: {lesson.subjectId}
                            </Text>
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ color: "#6B7280", fontSize: 12, marginBottom: 8 }}>
                                {new Date(lesson.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() =>
                    searchText.length > 0 ? (
                        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 40 }}>
                            <MaterialIcons name="search-off" size={48} color="#111827" />
                            <Text style={{ color: "#111827", fontSize: 16, marginTop: 12, textAlign: "center" }}>
                                No lessons found for "{searchText}"
                            </Text>
                        </View>
                    ) : null
                }
            />

            {/* Floating Add Button */}
            <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={{
                    position: "absolute",
                    bottom: 60,
                    right: 40,
                    backgroundColor: "#2563EB",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >
                <MaterialIcons name="add-circle-outline" size={30} color="white" />
            </TouchableOpacity>

            {/* Upload Lesson Modal */}
            <UploadLessonModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </SafeAreaView>
    );
}
