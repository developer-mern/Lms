import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MoreScreen from './MoreScreen';

export default function SettingsScreen() {
    return (
        <MoreScreen />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24 },
});
