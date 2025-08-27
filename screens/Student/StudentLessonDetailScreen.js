// StudentLessonDetailScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from "expo-av";
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from '../../api/authapi';
const { width } = Dimensions.get('window');

const StudentLessonDetailScreen = () => {
    const route = useRoute();
    const { lesson } = route.params || {};   // ✅ lesson passed from SelectLessonScreen

    const videoRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [lastTap, setLastTap] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [videoUri, setVideoUri] = useState(lesson?.videoUrl || ""); // ✅ dynamic

    // Double-tap forward/backward
    const handleDoubleTap = async (event) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        const tapX = event.nativeEvent.locationX;

        if (now - lastTap < DOUBLE_TAP_DELAY) {
            const status = await videoRef.current.getStatusAsync();
            if (!status.isLoaded) return;

            let newPosition = status.positionMillis;

            if (tapX < width / 2) {
                newPosition = Math.max(0, status.positionMillis - 10000);
                setFeedback("backward");
            } else {
                newPosition = Math.min(status.durationMillis, status.positionMillis + 10000);
                setFeedback("forward");
            }

            await videoRef.current.setPositionAsync(newPosition);
        }
        setLastTap(now);
    };

    const formatTime = (millis) => {
        if (!millis) return "0:00";
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handlePlaybackStatus = (status) => {
        if (status.isLoaded) {
            setCurrentTime(formatTime(status.positionMillis));
            setDuration(formatTime(status.durationMillis));
            if (status.didJustFinish) {
                setIsPlaying(false);
                setShowOverlay(true);
            } else {
                setIsPlaying(status.isPlaying);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Video Player */}
            <View style={styles.flagContainer}>
                <TouchableWithoutFeedback
                    onPressIn={(event) => {
                        setShowOverlay(!showOverlay);
                        handleDoubleTap(event);
                    }}
                >
                    <Video
                        ref={videoRef}
                       source={{ uri: `${BASE_URL}${lesson?.videoUrl}` }}
                        style={styles.videoPlayer}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping={true}
                        onPlaybackStatusUpdate={handlePlaybackStatus}
                         posterSource={{ uri: `${BASE_URL}${lesson?.thumbnailUrl}` }}
                        usePoster={!!lesson?.thumbnailUrl}
                    />
                </TouchableWithoutFeedback>

                {showOverlay && (
                    <>
                        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
                            <Ionicons
                                name={isPlaying ? "pause" : "play"}
                                size={28}
                                color="#fff"
                            />
                        </TouchableOpacity>

                        <View style={styles.durationBadge}>
                            <Text style={styles.durationBadgeText}>
                                {currentTime} / {duration}
                            </Text>
                        </View>
                    </>
                )}
            </View>

            {/* Lesson Info */}
            <View style={styles.content}>
                <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>{lesson?.title || "Lesson Title"}</Text>
                    <View style={styles.subjectInfo}>
                        <Text style={styles.subjectText}>
                            {lesson?.subjectName || "Subject"} - {lesson?.lessonNumber || ""}
                        </Text>
                        <View style={styles.viewCount}>
                            <Ionicons name="eye-outline" size={14} color="#666" />
                            <Text style={styles.countText}>{lesson?.views || 0}</Text>
                        </View>
                    </View>

                    <View style={styles.teacherInfo}>
                        <Ionicons name="person-outline" size={16} color="#333" />
                        <Text style={styles.teacherText}>{lesson?.teacherName || "Teacher"}</Text>
                    </View>

                    <Text style={styles.description}>
                        {lesson?.description || "No description available."}
                    </Text>
                </View>

                {/* Topics Section (optional if your API has subtopics) */}
                {lesson?.topics && lesson.topics.length > 0 && (
                    <View style={styles.topicsSection}>
                        <Text style={styles.topicsSectionTitle}>Topics</Text>
                        {lesson.topics.map((topic, index) => (
                            <View key={topic.id || index} style={styles.topicCard}>
                                <Text style={styles.topicNumber}>
                                    {String(index + 1).padStart(2, "0")}
                                </Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.topicName}>{topic.title}</Text>
                                    {topic.duration && (
                                        <Text style={styles.durationText}>{topic.duration}</Text>
                                    )}
                                </View>
                                <TouchableOpacity
                                    style={styles.topicButton}
                                   onPress={() => setVideoUri(`${BASE_URL}${topic.videoUrl}`)}
                                >
                                    <Text style={styles.topicButtonText}>Play Topic</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },

    flagContainer: {
        width: "100%",
        height: 240,
        backgroundColor: "#000", // fallback color
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
        // backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
    },
    playButton: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 14,
        borderRadius: 50,
    },
    videoText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    durationBadge: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "rgba(0,0,0,0.7)",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    durationBadgeText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "500",
    },
    feedbackOverlay: {
        position: "absolute",
        top: "40%",
        left: "40%",
        right: "40%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
    },
    feedbackText: { fontSize: 28, color: "#fff", fontWeight: "bold", zIndex: 999 },
    topicInfo: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    topicTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 8 },
    subjectInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    subjectText: { fontSize: 14, color: '#666' },
    viewCount: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    countText: { fontSize: 12, color: '#666' },
    teacherInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    teacherText: { fontSize: 14, color: '#333', marginLeft: 6 },
    description: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 6 },
    readMore: { fontSize: 14, color: '#2563EB', fontWeight: '500' },

    // Topics Section
    topicsSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    topicsSectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },

    // Topic Item
    topicCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 10,
    },
    topicContent: { flex: 1 },
    topicHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    topicNumber: { fontSize: 16, fontWeight: '600', color: '#2563EB', marginRight: 10 },
    topicName: { fontSize: 16, fontWeight: '500', color: '#333' },
    topicMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    durationText: { fontSize: 12, color: '#666', marginLeft: 4 },
    topicAction: { marginLeft: 10 },

    // Buttons
    playVideoButton: { flexDirection: 'row', alignItems: 'center' },
    playVideoText: { fontSize: 14, fontWeight: '500', marginLeft: 4 },
    quizButton: { backgroundColor: '#2563EB', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 6 },
    quizButtonText: { color: '#fff', fontSize: 14, fontWeight: '500' },
    topicButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#007BFF",
        borderRadius: 6,
    },
    topicButtonActive: {
        backgroundColor: "#28a745", // green for "Playing"
    },
    topicButtonText: { color: "#fff", fontSize: 12 },
});

export default StudentLessonDetailScreen;