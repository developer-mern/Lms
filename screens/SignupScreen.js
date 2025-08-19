import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function SignupScreen({ navigation, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const res = await fetch('http://192.168.1.51:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert('Success', 'Account created!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Signup Failed', data.message || 'Account already exists');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to connect to server');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📝 Sign Up</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={handleSignup} />
            <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Already have an account? Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
    link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
