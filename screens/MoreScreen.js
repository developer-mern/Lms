import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MoreScreen() {
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB', // Light grey background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827', // Dark text
        marginTop: 20,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280', // Gray text
        maxWidth: 300,
        fontWeight: '400',
    },
});
