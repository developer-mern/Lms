// Context/authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing login on app start
    useEffect(() => {
        checkExistingLogin();
    }, []);

    const checkExistingLogin = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('userData');
            const storedRole = await AsyncStorage.getItem('userRole');

            if (storedUser && storedRole) {
                setUser(JSON.parse(storedUser));
                setUserRole(storedRole);
            }
        } catch (error) {
            console.error('Error loading auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password, role) => {
        try {
            // Create user data object (no API call needed)
            const userData = {
                email,
                name: email.split('@')[0], // Simple name from email
                role
            };

            // Store in state
            setUser(userData);
            setUserRole(role);

            // Persist to storage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('userRole', role);

            return { success: true, user: userData };
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, error: 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setUserRole(null);
            await AsyncStorage.multiRemove(['userData', 'userRole']);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        userRole,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};