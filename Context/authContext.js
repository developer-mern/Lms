// Context/authContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create context
export const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Load user info from storage when app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('token');
        const storedRole = await AsyncStorage.getItem('userRole');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRole(storedRole);
        }
      } catch (error) {
        console.log('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // 4. Login function
  const loginUser = async (loginResult) => {
    try {
      setUser(loginResult.user);
      setToken(loginResult.token);
      setRole(loginResult.user.role);

      await AsyncStorage.setItem('userData', JSON.stringify(loginResult.user));
      await AsyncStorage.setItem('token', loginResult.token);
      await AsyncStorage.setItem('userRole', loginResult.user.role);
    } catch (error) {
      console.log('Error storing login data', error);
    }
  };

  // 5. Logout function
  const logoutUser = async () => {
    try {
      setUser(null);
      setToken(null);
      setRole(null);

      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userRole');
    } catch (error) {
      console.log('Error clearing login data', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Custom hook for easier use
export const useAuth = () => useContext(AuthContext);
