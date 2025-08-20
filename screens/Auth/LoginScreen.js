import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../../Context/authContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login, isLoading } = useAuth();

    const roles = ['Student', 'Parent', 'Teacher'];

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!selectedRole) {
            Alert.alert('Error', 'Please select your role');
            return;
        }

        setIsLoggingIn(true);
        const result = await login(email, password, selectedRole);
        setIsLoggingIn(false);

        if (result.success) {
            Alert.alert('Success', `Welcome ${result.user.name}!`);
            // Navigation is handled automatically by AppNavigator based on role
        } else {
            Alert.alert('Login Failed', result.error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.title}>🔐 LMS Login</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Role Selection */}
                <Text style={styles.roleLabel}>Select Role</Text>
                <View style={styles.roleContainer}>
                    {roles.map((role) => (
                        <TouchableOpacity
                            key={role}
                            style={[
                                styles.roleButton,
                                selectedRole === role && styles.roleButtonSelected,
                            ]}
                            onPress={() => setSelectedRole(role)}
                        >
                            <Text
                                style={[
                                    styles.roleText,
                                    selectedRole === role && styles.roleTextSelected,
                                ]}
                            >
                                {role}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        (!email || !password || !selectedRole) && styles.loginButtonDisabled,
                    ]}
                    onPress={handleLogin}
                    disabled={isLoggingIn || !email || !password || !selectedRole}
                >
                    {isLoggingIn ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f3f4f6', // soft background
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: '700',
        color: '#111827',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 14,
        marginBottom: 16,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: '#f9fafb',
    },
    roleLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#374151',
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 10,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    roleButtonSelected: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    roleText: {
        color: '#6b7280',
        fontWeight: '500',
        fontSize: 15,
    },
    roleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonDisabled: {
        backgroundColor: '#9ca3af',
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});