import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from "../../Context/authContext"; // assuming you have auth context
import { togglePublishVideoLessonAPI, deleteVideoLessonAPI } from "../../api/authapi"; // API functions

export default function TeacherLessonDetailScreen({ navigation, route }) {
    const { token } = useAuth();
    const {
        lessonId,
        lessonTitle,
        subject,
        date,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        views,
        isPublished: initialPublished
    } = route.params;

    const [isPublished, setIsPublished] = useState(initialPublished);
    const [loading, setLoading] = useState(false);

    // Handle publish/unpublish
    const handleTogglePublish = async () => {
        setLoading(true);
        try {
            const res = await togglePublishVideoLessonAPI(token, lessonId, !isPublished);
            setIsPublished(res.lesson.isPublished);
        } catch (err) {
            Alert.alert("Error", "Failed to update publish status");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete
    const handleDeleteLesson = async () => {
        Alert.alert(
            "Delete Lesson",
            "Are you sure you want to delete this lesson?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteVideoLessonAPI(token, lessonId);
                            Alert.alert("Deleted", "Lesson deleted successfully");
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert("Error", "Failed to delete lesson");
                            console.error(err);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f4f6" }}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Lesson Content */}
                <Text style={{ color: "#111827", fontSize: 20, fontWeight: "700" }}>
                    {lessonTitle}
                </Text>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: -5
                }}>
                    <Text style={{ color: "#6B7280", fontSize: 14 }}>
                        {subject}
                    </Text>
                    <Text style={{ color: "#6B7280", fontSize: 14 }}>
                        {isPublished ? "Published" : "Unpublished"}
                    </Text>
                </View>

                {/* Image */}
                <Image
                    source={{ uri: thumbnailUrl }}
                    style={{
                        width: "100%",
                        height: 210,
                        borderRadius: 12,
                        marginTop: 14,
                        backgroundColor: "#111827"
                    }}
                    resizeMode="cover"
                />

                {/* Stats */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons name="access-time" color="#6B7280" size={20} />
                        <Text style={{ color: "#6B7280", marginLeft: 4, fontSize: 14 }}>{duration} min</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="eye-outline" size={20} color="#6B7280" />
                        <Text style={{ color: "#6B7280", marginLeft: 4, fontSize: 14 }}>{views} views</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons name="calendar-month" color="#6B7280" size={20} />
                        <Text style={{ color: "#6B7280", marginLeft: 4, fontSize: 14 }}>{date} 2025</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={{ marginTop: 16 }}>
                    <Text style={{ color: "#6B7280", fontWeight: "600", fontSize: 12 }}>Description</Text>
                    <Text style={{
                        color: "#111827",
                        marginTop: 4,
                        lineHeight: 20,
                        fontSize: 14
                    }}>
                        {description}
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: "row", marginTop: 22 }}>
                    {/* Toggle Publish Button */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#2563eb",
                            paddingVertical: 14,
                            borderRadius: 10,
                            marginRight: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                        onPress={handleTogglePublish}
                        disabled={loading}
                    >
                        {isPublished ? (
                            <MaterialCommunityIcons
                                name="eye-off-outline"
                                size={24}
                                color="white"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="eye-outline"
                                size={24}
                                color="white"
                            />
                        )}
                        <Text style={{
                            color: "white",
                            fontWeight: "700",
                            marginLeft: 10
                        }}>
                            {isPublished ? "Unpublish" : "Publish"}
                        </Text>
                    </TouchableOpacity>

                    {/* Delete Button */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#f43f5e",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                        onPress={handleDeleteLesson}
                        disabled={loading}
                    >
                        <MaterialIcons
                            name="delete-outline"
                            color="#f43f5e"
                            size={24}
                        />
                        <Text style={{
                            color: "#f43f5e",
                            fontWeight: "700",
                            marginLeft: 10
                        }}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
