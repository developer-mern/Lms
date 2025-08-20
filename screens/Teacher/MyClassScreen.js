import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";

export default function MyClassScreen() {
    const subjects = ["Maths", "Science", "English", "History", "Art", "Physics"];

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
                        <MaterialIcons
                            name="school"
                            size={24}
                            color="#666666"
                            style={styles.icon1}
                        />
                        <View>
                            <Text style={styles.subHeading}>Supervised Classes</Text>
                            <Text style={styles.subDescription}>
                                Classes where you are the class teacher
                            </Text>
                        </View>
                    </View>

                    {/* Search Box */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons
                            name="search"
                            size={24}
                            color="#6B7280"
                            style={{ marginLeft: 16, top: 3 }}
                        />
                        <TextInput
                            placeholder="Search classes"
                            placeholderTextColor="#9CA3AF"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Class Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            {/* Left side */}
                            <View style={styles.leftSection}>
                                <Text style={styles.className}>X-A</Text>
                                <View style={styles.roleTag}>
                                    <Text style={styles.roleText}>Class Teacher</Text>
                                </View>
                            </View>

                            {/* Right side */}
                            <View style={styles.studentCount}>
                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                    <Mask
                                        id="mask0_436_5764"
                                        maskUnits="userSpaceOnUse"
                                        x={0}
                                        y={0}
                                        width={24}
                                        height={24}
                                    >
                                        <Rect width={24} height={24} fill="#D9D9D9" />
                                    </Mask>
                                    <G mask="url(#mask0_436_5764)">
                                        <Path
                                            d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z"
                                            fill="#4B5563"
                                        />
                                    </G>
                                </Svg>
                                <Text style={styles.countText}>40</Text>
                            </View>
                        </View>

                        <View style={styles.gradeRow}>
                            <Text style={styles.gradeText}>Grade II</Text>
                        </View>

                        {/* Subjects */}
                        <View style={styles.subjectsRow}>
                            {subjects.map((sub, index) => (
                                <View key={index} style={styles.subjectTag}>
                                    <Text style={styles.subjectText}>{sub}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.outlineButton}>
                                <MaterialIcons
                                    name="visibility"
                                    size={24}
                                    color="#3B82F6"
                                    style={{ marginRight: 6 }}
                                />
                                <Text style={styles.outlineButtonText}>View Details</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.outlineButton}>
                                <Svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ marginRight: 6 }}
                                >
                                    <Mask
                                        id="mask0_436_5764"
                                        maskUnits="userSpaceOnUse"
                                        x={0}
                                        y={0}
                                        width={24}
                                        height={24}
                                    >
                                        <Rect width={24} height={24} fill="#D9D9D9" />
                                    </Mask>
                                    <G mask="url(#mask0_436_5764)">
                                        <Path
                                            d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z"
                                            fill="#3B82F6"
                                        />
                                    </G>
                                </Svg>
                                <Text style={styles.outlineButtonText}>View Students</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
