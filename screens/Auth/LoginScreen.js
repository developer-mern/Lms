import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../../Context/authContext';
import { login } from '../../api/authapi';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { loginUser, isLoading } = useAuth();
    const roles = ['student', 'parent', 'teacher'];


    const handleLogin = async () => {
        if (!username || !password || !selectedRole) {
            Alert.alert('Error', 'Please fill all fields and select role');
            return;
        }

        setIsLoggingIn(true);

        try {
            const result = await login(username, password, selectedRole);
            setIsLoggingIn(false);

            if (result.token) {
                // Save login details to context
                loginUser(result);

                Alert.alert('Success', `Welcome ${result.user.id}!`);

                // Navigate based on role
                switch (selectedRole.toLowerCase()) {
                    case 'student':
                        navigation.replace('StudentDashboard');
                        break;
                    case 'teacher':
                        navigation.replace('TeacherDashboard');
                        break;
                    case 'parent':
                        navigation.replace('ParentDashboard');
                        break;
                    default:
                        navigation.replace('Home');
                }
            } else {
                Alert.alert('Login Failed', result.error || 'Something went wrong');
            }
        } catch (error) {
            setIsLoggingIn(false);
            Alert.alert('Login Failed', error.message || 'Something went wrong');
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
            <View style={styles.card}>
                <Text style={styles.title}>🔐 LMS Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

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

                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        (!username || !password || !selectedRole) && styles.loginButtonDisabled,
                    ]}
                    onPress={handleLogin}
                    disabled={isLoggingIn || !username || !password || !selectedRole}
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