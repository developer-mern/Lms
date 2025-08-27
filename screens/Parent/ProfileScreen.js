import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../Context/authContext';


const ProfileScreen = () => {
    const { logout } = useAuth();
    const [teacherExpanded, setTeacherExpanded] = useState(true);
    const [parentExpanded, setParentExpanded] = useState(false);

    const parentData = {
        name: "Parent Name",
        role: "Parent",
        avatar: "https://via.placeholder.com/60x60/cccccc/666666?text=P",
    };

    const subjects = [
        {
            id: 1,
            name: "English",
            school: "New english school, Pune",
            avatar: "https://via.placeholder.com/40x40/e8f5e8/4caf50?text=E",
        },
        {
            id: 2,
            name: "Geography",
            institute: "NA",
            avatar: "https://via.placeholder.com/40x40/e3f2fd/2196f3?text=G",
        },
        {
            id: 3,
            name: "Geography",
            institute: "NA",
            avatar: "https://via.placeholder.com/40x40/e3f2fd/2196f3?text=G",
        },
    ];

    const children = [
        {
            id: 1,
            name: "Child Name",
            class: "X-A",
            school: "New English School, Pune",
            avatar: "https://via.placeholder.com/40x40/e8f5e8/4caf50?text=C",
        },
        {
            id: 2,
            name: "Child Name",
            class: "X-A",
            tuition: "NA",
            avatar: "https://via.placeholder.com/40x40/e3f2fd/2196f3?text=C",
        },
        {
            id: 3,
            name: "Child Name",
            class: "X-A",
            tuition: "NA",
            avatar: "https://via.placeholder.com/40x40/fff3e0/ff9800?text=C",
        },
    ];

    const menuItems = [
        {
            id: 1,
            title: 'Children management',
            icon: <Ionicons name="people-outline" size={22} color="#4285f4" />,
            color: '#4285f4',
            onPress: () => console.log('Children management pressed'),
        },
        {
            id: 2,
            title: 'Account & security',
            icon: <Ionicons name="shield-checkmark-outline" size={22} color="#4285f4" />,
            color: '#4285f4',
            onPress: () => console.log('Account & security pressed'),
        },
        {
            id: 3,
            title: 'App preferences',
            icon: <Ionicons name="settings-outline" size={22} color="#4285f4" />,
            color: '#4285f4',
            onPress: () => console.log('App preferences pressed'),
        },
        {
            id: 4,
            title: 'Help & support',
            icon: <Ionicons name="help-circle-outline" size={22} color="#4285f4" />,
            color: '#4285f4',
            onPress: () => console.log('Help & support pressed'),
        },
        {
            id: 5,
            title: 'Logout',
            icon: <MaterialIcons name="logout" size={22} color="#ff4444" />,
            color: '#ff4444',
            onPress: logout,
        },
    ];

    const ChevronRight = () => (
        <Ionicons name="chevron-forward" size={20} color="#999" />
    );

    const MenuItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    {item.icon}
                </View>
                <Text style={[
                    styles.menuTitle,
                    item.id === 5 && styles.logoutTitle
                ]}>
                    {item.title}
                </Text>
            </View>
            <ChevronRight />
        </TouchableOpacity>
    );

    const ProfileAvatar = ({ src, size = 60, fallback = "?" }) => (
        <View
            style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 },
            ]}
        >
            {src ? (
                <Image
                    source={{ uri: src }}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                />
            ) : (
                <Text style={{ fontSize: size * 0.4, color: "#666", fontWeight: "600" }}>
                    {fallback}
                </Text>
            )}
        </View>
    );

    const ChevronDown = ({ expanded }) => (
        <View
            style={[
                styles.chevron,
                { transform: [{ rotate: expanded ? "180deg" : "0deg" }] },
            ]}
        >
            <View style={styles.chevronLine} />
        </View>
    );

    const SubjectItem = ({ subject }) => (
        <View style={styles.subjectItem}>
            <View style={styles.extradiv}>
                <ProfileAvatar
                    src={subject.avatar}
                    size={40}
                    fallback={subject.name.charAt(0)}
                />
                <View style={styles.subjectInfo}>
                    <View style={styles.subjectDetail}>
                        <Text style={styles.subjectLabel}>Subject name: </Text>
                        <Text style={styles.subjectValue}>{subject.name}</Text>
                    </View>
                    <View style={styles.subjectDetail}>
                        <Text style={styles.subjectLabel}>
                            {subject.school ? "School name: " : "Institute name: "}
                        </Text>
                        <Text style={styles.subjectValue}>
                            {subject.school || subject.institute}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    // Fixed ChildItem component with proper React Native syntax
    const ChildItem = ({ child }) => (
        <View style={styles.subjectItem}>
            <View style={styles.extradiv}>
                <ProfileAvatar src={child.avatar} size={40} fallback="C" />
                <View style={styles.subjectInfo}>
                    <View style={styles.subjectDetail}>
                        <Text style={styles.subjectLabel}>Child name: </Text>
                        <Text style={styles.subjectValue}>{child.name}</Text>
                    </View>
                    <View style={styles.subjectDetail}>
                        <Text style={styles.subjectLabel}>Class: </Text>
                        <Text style={styles.subjectValue}>{child.class}</Text>
                    </View>
                    {child.school && (
                        <View style={styles.subjectDetail}>
                            <Text style={styles.subjectLabel}>School name: </Text>
                            <Text style={styles.subjectValue}>{child.school}</Text>
                        </View>
                    )}
                    {child.tuition && (
                        <View style={styles.subjectDetail}>
                            <Text style={styles.subjectLabel}>Tuition name: </Text>
                            <Text style={styles.subjectValue}>{child.tuition}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>

            <View style={styles.card}>
                {/* Parent Profile */}
                <View style={styles.cards}>
                    <View style={styles.profileHeader}>
                        <ProfileAvatar src={parentData.avatar} size={60} fallback="P" />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{parentData.name}</Text>
                            <Text style={styles.profileRole}>{parentData.role}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.viewProfileButton}>
                        <Text style={styles.eyeIcon}><MaterialIcons name="visibility" size={16} color='#2563EB'/></Text>
                        <Text style={styles.viewProfileText}>View Profile Details</Text>
                    </TouchableOpacity>
                </View>
                {/* Teacher Section */}
                <View style={styles.cards}>
                    <View style={styles.TeacherCard}
                    >
                        <View style={teacherExpanded && styles.datatable}>
                            <TouchableOpacity
                                style={[
                                    styles.teacherHeader,
                                    teacherExpanded && styles.TeacherCardExpanded, // Apply when open
                                ]}
                                onPress={() => setTeacherExpanded(!teacherExpanded)}
                            >
                                <View style={styles.teacherInfo}>
                                    <ProfileAvatar
                                        src="https://via.placeholder.com/40x40/f3e5f5/9c27b0?text=T"
                                        size={40}
                                        fallback="T"
                                    />
                                    <Text style={styles.teacherTitle}>Teacher</Text>
                                </View>
                                <ChevronDown expanded={teacherExpanded} />
                            </TouchableOpacity>

                            {teacherExpanded && (
                                <View style={styles.subjectsList}>
                                    {subjects.map((subject) => (
                                        <SubjectItem key={subject.id} subject={subject} />
                                    ))}
                                </View>
                            )}
                        </View>
                        {teacherExpanded && (
                            <TouchableOpacity style={styles.viewProfileButton} onPress={logout}>
                                <Text style={styles.eyeIcon}>+</Text>
                                <Text style={styles.viewProfileText}>Add account</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Parent Section - Fixed */}
                <View style={styles.cards}>
                    <View style={styles.TeacherCard}>
                        <View style={parentExpanded && styles.datatable}>
                            <TouchableOpacity
                                style={[
                                    styles.teacherHeader,
                                    parentExpanded && styles.TeacherCardExpanded, // Apply when open
                                ]}
                                onPress={() => setParentExpanded(!parentExpanded)}
                            >
                                <View style={styles.teacherInfo}>
                                    <ProfileAvatar
                                        src="https://via.placeholder.com/40x40/f3e5f5/9c27b0?text=P"
                                        size={40}
                                        fallback="P"
                                    />
                                    <Text style={styles.teacherTitle}>Parent</Text>
                                </View>
                                <ChevronDown expanded={parentExpanded} />
                            </TouchableOpacity>

                            {parentExpanded && (
                                <View style={styles.subjectsList}>
                                    {children.map((child) => (
                                        <ChildItem key={child.id} child={child} />
                                    ))}
                                </View>
                            )}
                        </View>
                        {parentExpanded && (
                            <TouchableOpacity style={styles.viewProfileButton} onPress={logout}>
                                <Text style={styles.eyeIcon}>+</Text>
                                <Text style={styles.viewProfileText}>Add account</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

            </View>

            <View style={styles.menuContainer}>
                {menuItems.map(item => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
        padding: 16,
    },
    cards: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 12
    },
    profileName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    profileRole: {
        fontSize: 14,
        color: "#666"
    },
    viewProfileButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#4285f4",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    eyeIcon: {
        fontSize: 16,
        marginRight: 6
    },
    viewProfileText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#2563EB"
    },

    datatable: {
        borderLeftWidth: 1,
        borderLeftColor: '#E5E7EB',
        borderRightColor: '#E5E7EB',
        borderRightWidth: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },

    TeacherCardExpanded: {
        backgroundColor: '#E0F2FE', // light blue background
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },

    teacherHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    teacherInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    teacherTitle: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "500",
        color: "#1a1a1a",
    },

    subjectsList: {
        gap: 16,
        TextShrink: 1
    },

    subjectItem: {
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        marginBottom: 12,
    },
    extradiv: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
    },
    subjectInfo: {
        flex: 1,
        marginLeft: 12
    },
    subjectDetail: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 4,
    },
    subjectLabel: {
        fontSize: 14,
        color: "#666"
    },
    subjectValue: {
        fontSize: 14,
        color: "#1a1a1a",
        fontWeight: "500",
        TextShrink: 1
    },

    // New styles for children
    childrenList: {
        gap: 16,
    },
    childItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    childInfo: {
        flex: 1,
        marginLeft: 12,
    },
    childDetail: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 4,
    },
    childLabel: {
        fontSize: 14,
        color: "#666",
    },
    childValue: {
        fontSize: 14,
        color: "#1a1a1a",
        fontWeight: "500",
    },

    addAccountButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#4285f4",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    plusIcon: {
        fontSize: 18,
        color: "#4285f4",
        marginRight: 6
    },
    addAccountText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4285f4"
    },

    avatar: {
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    chevron: {
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    chevronLine: {
        width: 8,
        height: 8,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: "#666",
        transform: [{ rotate: "45deg" }],
        marginTop: -2,
    },

    menuContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 40
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#ffffff',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        flex: 1,
    },
    logoutTitle: {
        color: '#ff4444',
    },
});

export default ProfileScreen;