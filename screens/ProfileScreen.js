import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";

export default function LoginScreen() {
    const [role, setRole] = useState("Student");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const roles = ["Student", "Teacher", "Parent"];

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        // Example payload
        const payload = {
            username,
            password,
            role
        };

        console.log("Login Data:", payload);

        // Simulate backend call
        Alert.alert("Login Successful", `Role: ${role}\nUsername: ${username}`);
    };

    return (
        <View style={styles.container}>
            {/* Role Tabs */}
            <View style={styles.tabsContainer}>
                {roles.map((r) => (
                    <TouchableOpacity
                        key={r}
                        style={[styles.tab, role === r && styles.activeTab]}
                        onPress={() => setRole(r)}
                    >
                        <Text style={[styles.tabText, role === r && styles.activeTabText]}>
                            {r}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Username */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
            />

            {/* Password */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20
    },
    tabsContainer: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        overflow: "hidden"
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: "#f1f1f1"
    },
    activeTab: {
        backgroundColor: "#3b82f6"
    },
    tabText: {
        color: "#555",
        fontSize: 16,
        fontWeight: "500"
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "bold"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16
    },
    loginButton: {
        backgroundColor: "#3b82f6",
        paddingVertical: 14,
        borderRadius: 8
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    }
});
