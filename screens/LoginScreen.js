import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch('http://192.168.1.51:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsAuthenticated(true);
                Alert.alert('Success', 'Login successful!');
            } else {
                Alert.alert('Login Failed', data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to connect to server');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔐 Login</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>Don't have an account? Sign up</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
    link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
