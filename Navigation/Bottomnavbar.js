
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const BottomNavigation = ({ state, navigation }) => {
    const tabs = [
        { id: 'Home', label: 'Home', icon: 'home' },
        { id: 'Timetable', label: 'Timetable', icon: 'event-note' },

        { id: 'teaching', label: 'Teaching', icon: 'import-contacts' },

        { id: 'Chat', label: 'Chat', icon: 'chat-bubble-outline' },

        { id: 'More', label: 'More', icon: 'more-vert' },
    ];

    return (
        <SafeAreaView edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.tabBar}>
                    {tabs.map((tab, index) => {
                        const isActive = state.index === index;
                        return (
                            <TouchableOpacity
                                key={tab.id}
                                style={styles.tabButton}
                                onPress={() => navigation.navigate(tab.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.iconWrapper}>
                                    {isActive && <View style={styles.activeBackground} />}
                                    <Icon
                                        name={tab.icon}
                                        size={24}
                                        color={isActive ? '#fff' : '#666666'}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.tabLabel,
                                        { color: isActive ? '#2563EB' : '#333' },
                                        isActive && { marginTop: 18 },
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderRadius: 16,
        marginHorizontal: 20,
        // Top shadow properties (iOS only)
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -2, // Negative value for top shadow
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3, // Remove this line
        marginBottom : 16
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    activeBackground: {
        position: 'absolute',
        height: 55,
        width: 55,
        backgroundColor: '#2563EB',
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
        elevation: 5,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});

export default BottomNavigation;
