
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UploadLessonModal from "../Components/UploadLesson";
export default function LessonScreen({ navigation }) {
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Sample lesson data
    const lessons = [
        {
            id: 1,
            title: "Introduction to Algebra",
            subject: "Mathematics (10th)",
            date: "15 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "45 min",
            teacher: "Mr. Sharma",
            views: 124,
            description: "Learn basic algebraic concepts including variables, expressions, and simple equations."
        },
        {
            id: 2,
            title: "Chemical Reactions",
            subject: "Chemistry (10th)",
            date: "16 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "52 min",
            teacher: "Dr. Patel",
            views: 87,
            description: "Understanding exothermic and endothermic reactions with practical examples."
        },
        {
            id: 3,
            title: "The French Revolution",
            subject: "History (10th)",
            date: "17 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "38 min",
            teacher: "Ms. Desai",
            views: 156,
            description: "Detailed analysis of causes and consequences of the French Revolution (1789-1799)."
        },
        {
            id: 4,
            title: "Photosynthesis Process",
            subject: "Biology (10th)",
            date: "18 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "41 min",
            teacher: "Mrs. Gupta",
            views: 92,
            description: "Step-by-step breakdown of light-dependent and light-independent reactions."
        },
        {
            id: 5,
            title: "Trigonometry Basics",
            subject: "Mathematics (10th)",
            date: "19 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "49 min",
            teacher: "Mr. Sharma",
            views: 108,
            description: "Introduction to sine, cosine and tangent functions with practical applications."
        },
        {
            id: 6,
            title: "Electric Circuits",
            subject: "Physics (10th)",
            date: "20 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "55 min",
            teacher: "Dr. Joshi",
            views: 76,
            description: "Understanding series and parallel circuits with Ohm's Law demonstrations."
        },
        {
            id: 7,
            title: "Shakespeare's Sonnets",
            subject: "English Literature (10th)",
            date: "21 Aug 25",
            image: require("../assets/Krishna.jpg"),
            duration: "44 min",
            teacher: "Ms. Chatterjee",
            views: 132,
            description: "Analysis of poetic devices and themes in selected sonnets by William Shakespeare."
        }
    ];

    const filteredLessons = lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
        lesson.subject.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Back Arrow and Lesson Title */}
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
                        style={{
                            flex: 1,
                            marginLeft: 8,
                            // paddingTop:6,
                            color: "#111827",
                            fontSize: 14
                        }}
                    />
                </View>

                {/* Lesson List */}
                {filteredLessons.map((lesson) => (
                    <TouchableOpacity
                        key={lesson.id}
                        style={{
                            flexDirection: "row",
                            padding: 8,
                            // marginBottom: 12,
                            alignItems: "center",
                            shadowColor: "none",
                            borderBottomColor: '#E5E7EB',
                            borderBottomWidth: 1,
                        }}
                        onPress={() => navigation.navigate("Lessons Detail", {
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            subject: lesson.subject,
                            date: lesson.date,
                            description : lesson.description
                        })}>
                        {/* Lesson Image */}
                        <Image
                            source={lesson.image}
                            style={{
                                width: 60,
                                height: 40,
                                borderRadius: 2,
                                backgroundColor: "#f3f4f6"
                            }}
                            resizeMode="cover"
                        />

                        {/* Lesson Details */}
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{
                                color: "#111827",
                                fontSize: 16,
                                fontWeight: "500",
                                marginBottom: -1
                            }}>
                                {lesson.title}
                            </Text>
                            <Text style={{
                                color: "#6B7280",
                                fontWeight: "400",
                                fontSize: 14,
                                // opacity: 0.7
                            }}>
                                {lesson.subject}
                            </Text>
                        </View>

                        {/* Date and Arrow */}
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{
                                color: "#6B7280",
                                fontSize: 12,
                                marginBottom: 8,
                                // opacity: 0.6
                            }}>
                                {lesson.date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* No results message */}
                {filteredLessons.length === 0 && searchText.length > 0 && (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 40
                    }}>
                        <MaterialIcons name="search-off" size={48} color="#111827" />
                        <Text style={{
                            color: "#111827",
                            fontSize: 16,
                            marginTop: 12,
                            textAlign: "center"
                        }}>
                            No lessons found for "{searchText}"
                        </Text>
                    </View>


                )}
                {/* Floating Add Button */}
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: -200,
                        right: 20,
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
                        elevation: 5
                    }}
                    onPress={() => setIsModalVisible(true)}
                >
                    <MaterialIcons name="add-circle-outline" size={30} color="white" />
                </TouchableOpacity>

                {/* Upload Lesson Modal */}
                <UploadLessonModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

