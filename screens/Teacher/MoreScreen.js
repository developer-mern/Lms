import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../Context/authContext'; // adjust path if needed

export default function MoreScreen({ navigation }) {
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Yes', 
                    onPress: async () => {
                        await logoutUser();
                        navigation.replace('Login'); // send user to login screen
                    } 
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#EF4444', // red
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
