import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const ParentDashbaord = () => {
    const [activeTab, setActiveTab] = useState('announcements');

    // Sample announcement data
    const announcements = [
        {
            id: 1,
            title: 'Parent-Teacher meeting',
            description: 'Annual parent-teacher conference to discuss student progress.',
            date: '25/01/2025'
        },
        {
            id: 2,
            title: 'School Holiday',
            description: 'School will be closed for Republic Day celebration.',
            date: '25/01/2025'
        }
    ];

    const quickActions = [
        {
            id: "1",
            title: "Attendance",
            icon: <Ionicons name="calendar-outline" size={32} color="#666" />,
        },
        {
            id: "2",
            title: "Performance",
            icon: <MaterialIcons name="bar-chart" size={32} color="#666" />,
        },
        {
            id: "3",
            title: "Teachers",
            icon: <Ionicons name="people-outline" size={32} color="#666" />,
        },
        {
            id: "4",
            title: "Reports",
            icon: <FontAwesome5 name="file-alt" size={28} color="#666" />,
        },
    ];

    const QuickActionCard = ({ action }) => (
        <TouchableOpacity
            style={styles.actionCard}
            onPress={() => console.log("Clicked:", action.title)}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>{action.icon}</View>
            <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
    );

    const TabButton = ({ id, label, isActive, onPress }) => (
        <TouchableOpacity
            style={[styles.tabButton, isActive ? styles.activeTab : styles.inactiveTab]}
            onPress={() => onPress(id)}
        >
            <Text style={[styles.tabButtonText, isActive && styles.activeTabText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const AnnouncementCard = ({ announcement }) => (
        <View style={styles.announcementCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                <Text style={styles.announcementDate}>{announcement.date}</Text>
            </View>
            <Text style={styles.announcementDescription}>
                {announcement.description}
            </Text>
        </View>
    );

    const ProfileAvatar = ({ size = 40, name = "P" }) => (
        <View
            style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 },
            ]}
        >
            <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{name}</Text>
        </View>
    );

    const ContactButton = ({ icon, label, onPress }) => (
        <TouchableOpacity style={styles.contactButton} onPress={onPress}>
            <Ionicons name={icon} size={22} color="#2563EB" />
            <Text style={styles.contactLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const ProgressCard = ({ percentage, label, color }) => (
        <View style={styles.progressCard}>
            <Text style={[styles.progressPercentage, { color }]}>{percentage}</Text>
            <Text style={styles.progressLabel}>{label}</Text>
        </View>
    );

    // Render the Quick Actions section without FlatList
    const renderQuickActions = () => (
        <View style={styles.quickActionsContainer}>
            <View style={styles.headerSection}>
                <Text style={styles.mainTitle}>Quick actions</Text>
                <Text style={styles.subtitle}>Access common features quickly</Text>
            </View>

            <View style={styles.quickActionsGrid}>
                {quickActions.map((action) => (
                    <QuickActionCard key={action.id} action={action} />
                ))}
            </View>
        </View>
    );

    // Render the Announcements section
    const renderAnnouncements = () => (
        <>
            <Text style={styles.sectionTitle}>School Announcements</Text>
            <View style={styles.announcementsList}>
                {announcements.map((a) => (
                    <AnnouncementCard key={a.id} announcement={a} />
                ))}
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Welcome Header */}
                <View style={styles.welcomeHeader}>
                    <Text style={styles.welcomeTitle}>Welcome back, Pranav</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Stay updated with your child's academic progress
                    </Text>
                </View>

                {/* Student Profile */}
                <View style={styles.profileCard}>
                    <View style={styles.profileInfo}>
                        <ProfileAvatar size={48} name="P" />
                        <View style={styles.profileText}>
                            <Text style={styles.studentName}>Pranav Bhujbal</Text>
                            <Text style={styles.parentLabel}>Parent account</Text>
                        </View>
                    </View>
                    <View style={styles.childrenBadge}>
                        <Ionicons name='people-outline' size={16} color='#666666' />
                        <Text style={styles.childrenText}>1 Children</Text>
                    </View>
                </View>

                {/* Contact School */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact school</Text>
                    <View style={styles.contactButtons}>
                        <ContactButton icon="chatbubble-ellipses-outline" label="Message" onPress={() => { }} />
                        <ContactButton icon="call-outline" label="Call" onPress={() => { }} />
                        <ContactButton icon="mail-outline" label="Email" onPress={() => { }} />
                        <ContactButton icon="calendar-outline" label="Schedule" onPress={() => { }} />
                    </View>
                </View>

                {/* Student Progress */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <View style={styles.progressInfo}>
                            <ProfileAvatar size={32} name="P" />
                            <View style={styles.progressText}>
                                <Text style={styles.progressName}>Pranav Bhujbal</Text>
                                <Text style={styles.progressClass}>Class V-A</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.viewDetailsButton}>
                            <Text style={styles.viewDetailsText}>View details</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.progressStats}>
                        <ProgressCard
                            percentage="33%"
                            label="Attendance"
                            color="#2563EB"
                        />
                        <ProgressCard
                            percentage="0"
                            label="Upcoming events"
                            color="#2563EB"
                        />
                        <ProgressCard
                            percentage="02%"
                            label="Recent results"
                            color="#2563EB"
                        />
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <TabButton
                        id="announcements"
                        label="Announcements"
                        isActive={activeTab === "announcements"}
                        onPress={setActiveTab}
                    />
                    <TabButton
                        id="quickactions"
                        label="Quick Actions"
                        isActive={activeTab === "quickactions"}
                        onPress={setActiveTab}
                    />
                </View>

                {/* Tab Content */}
                <View style={styles.contentContainer}>
                    {activeTab === "announcements" ? renderAnnouncements() : renderQuickActions()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
        padding: 20,
    },
    welcomeHeader: {
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: "#666666",
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    profileText: {
        flexDirection: "column",
    },
    studentName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    parentLabel: {
        fontSize: 13,
        color: "#666666",
    },
    childrenBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
    },
    childrenIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    childrenText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#666",
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 16,
    },
    contactButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    contactButton: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        color: '#2563EB',
        gap: 4,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        width: "47%",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#2563EB",
    },
    contactIcon: {
        fontSize: 20,
        marginBottom: 8,
        color: '#2563EB',
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: '#2563EB',
    },
    progressSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    progressInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    progressText: {
        flexDirection: "column",
    },
    progressName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    progressClass: {
        fontSize: 13,
        color: "#666",
    },
    viewDetailsButton: {
        backgroundColor: "#4285f4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    viewDetailsText: {
        fontSize: 13,
        fontWeight: "500",
        color: "#fff",
    },
    progressStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    progressCard: {
        flex: 1,
        alignItems: "center",
    },
    progressPercentage: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
    },
    progressValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    progressLabel: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
    avatar: {
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontWeight: "600",
        color: "#666",
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#DDDDDD",
        padding: 2,
        borderRadius: 8,
        marginVertical: 16,
        gap: 8,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: "center",
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
    },
    activeTab: {
        backgroundColor: "#fff",
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    inactiveTab: {
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    activeTabText: {
        color: "#333",
    },
    contentContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 20,
    },
    announcementsList: {
        gap: 16,
    },
    announcementCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    announcementTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        flex: 1,
        marginRight: 10,
    },
    announcementDate: {
        fontSize: 14,
        color: "#666",
    },
    announcementDescription: {
        fontSize: 14,
        color: "#555",
    },
    emptyState: {
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    emptyStateText: {
        fontSize: 16,
        color: "#888",
        fontStyle: "italic",
    },
    quickActionsContainer: {
        width: "100%",
    },
    headerSection: {
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    actionCard: {
        width: "48%",
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginBottom: 16,
    },
    iconContainer: {
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#495057",
        textAlign: "center",
    },
});

export default ParentDashbaord;