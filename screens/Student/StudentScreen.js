import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const CARD_COUNT = 3;
const H_PADDING = 16;
const CARD_GAP = 12;
const cardWidth = (width - H_PADDING * 2 - CARD_GAP * (CARD_COUNT - 1)) / CARD_COUNT;

export default function StudentScreen() {
    const navigation = useNavigation();
    const cards = [
        { key: 'Report', title: 'My Report', route: 'Report', icon: 'book-outline', type: 'MaterialCommunityIcons' },
        { key: 'lessons', title: 'Lessons', route: 'Select Subject', icon: 'menu-book', type: 'MaterialIcons' },
        { key: 'exam', title: 'Exam', route: 'Exam', icon: 'clipboard-text-outline', type: 'MaterialCommunityIcons' },
    ];


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.row}>
                    {cards.map((c) => (
                        <TouchableOpacity
                            key={c.key}
                            style={[styles.card, { width: cardWidth }]}
                            onPress={() => navigation.navigate(c.route)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.iconWrap}>
                                {c.type === 'MaterialIcons' ? (
                                    <MaterialIcons name={c.icon} size={28} style={styles.icon} />
                                ) : (
                                    <MaterialCommunityIcons name={c.icon} size={28} style={styles.icon} />
                                )}
                            </View>
                            <Text style={styles.cardText}>{c.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    topLine: {
        height: 3,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        color: '#33333',
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        width: 100,
        height: 80,
        elevation: 3,
    },
    iconWrap: {
        backgroundColor: 'transparent',
        size: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    icon: {
        color: '#666666',
    },
    cardText: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },
});
