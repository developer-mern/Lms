import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../Context/authContext'; // adjust path if needed

export default function MoreScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            {/* Rocket Icon */}
            <MaterialIcons name="rocket-launch" size={66} color="#3B82F6" />

            {/* Title */}
            <Text style={styles.title}>Coming Soon</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
                You’ll soon be able to manage and view students directly here.
            </Text>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginTop: 20,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280',
        maxWidth: 300,
        fontWeight: '400',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#EF4444', // red
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
