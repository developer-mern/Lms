import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
const feeData = [
    { id: "1", type: "Tuition Fee", amount: "₹ 4,833.00" },
    { id: "2", type: "Admission Fee", amount: "₹ 4,833.00" },
    { id: "3", type: "Exam Fee", amount: "₹ 4,833.00" },
    { id: "4", type: "Library Fee", amount: "₹ 4,833.00" },
    { id: "5", type: "Sports Fee", amount: "₹ 4,833.00" },
    { id: "6", type: "Miscellaneous Fee", amount: "₹ 4,833.00" },
];
const payments = [
    {
        id: 1,
        installment: "Installment 5",
        status: ["Paid", "Receipt Verified"],
        mode: "Cash",
        amount: "₹ 4833.00",
        lateFee: "+ ₹ 2,700.00 (late fee)",
        date: "Aug 19, 2025",
        actions: ["View Receipt", "Download Receipt"],
    },
    {
        id: 2,
        installment: "Installment 6",
        status: ["Paid", "Pending Verification"],
        mode: "Cash",
        amount: "₹ 4833.00",
        lateFee: "+ ₹ 2,700.00 (late fee)",
        date: "Aug 19, 2025",
        actions: ["Upload Receipt", "Download Receipt"],
    },
    {
        id: 3,
        installment: "Installment 7",
        status: ["Paid", "Verified"],
        mode: "Razorpay",
        amount: "₹ 4833.00",
        date: "Aug 19, 2025",
        actions: ["View Receipt", "Download Receipt"],
    },
    {
        id: 4,
        installment: "Installment 8",
        status: ["Paid", "Receipt Verified"],
        mode: "Cash",
        amount: "₹ 4833.00",
        date: "Aug 19, 2025",
        actions: ["View Receipt", "Download Receipt"],
    },
];
const FeesScreen = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Thin': Inter_100Thin,
        'Inter-ExtraLight': Inter_200ExtraLight,
        'Inter-Light': Inter_300Light,
        'Inter-Regular': Inter_400Regular,
        'Inter-Medium': Inter_500Medium,
        'Inter-SemiBold': Inter_600SemiBold,
        'Inter-Bold': Inter_700Bold,
        'Inter-ExtraBold': Inter_800ExtraBold,
        'Inter-Black': Inter_900Black,
    });

    const [selectedChild, setSelectedChild] = useState("all");
    const [activeMainTab, setActiveMainTab] = useState("pending");
    const [activeSubTab, setActiveSubTab] = useState("overdue");

    if (!fontsLoaded) return null;

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >

            {/* Search */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#999" />
                <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
            </View>

            {/* Title */}
            <Text style={[styles.pageTitle, { fontFamily: 'Inter-SemiBold' }]}>
                Fees Management
            </Text>
            <Text style={[styles.academicYear, { fontFamily: 'Inter-Regular' }]}>
                Academic Year: 2025–2026
            </Text>

            {/* Export button */}
            <TouchableOpacity style={styles.exportBtn}>
                <MaterialIcons name="file-download" size={18} color="#2563eb" />
                <Text style={[styles.exportText, { fontFamily: 'Inter-Medium' }]}>
                    Export Report
                </Text>
            </TouchableOpacity>

            {/* Pending Amount */}
            <View style={styles.amountCard}>
                <Text style={[styles.pendingLabel, { fontFamily: 'Inter-Regular' }]}>
                    Pending amount
                </Text>
                <Text style={[styles.pendingValue, { fontFamily: 'Inter-Bold' }]}>
                    ₹ 32,565.00
                </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, { fontFamily: 'Inter-Regular' }]}>
                        Total children
                    </Text>
                    <Text style={[styles.statValue, { fontFamily: 'Inter-Bold' }]}>02</Text>
                </View>

                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, { fontFamily: 'Inter-Regular' }]}>
                        Overdue payment
                    </Text>
                    <Text style={[styles.statValue, { fontFamily: 'Inter-Bold', color: "red" }]}>
                        02
                    </Text>
                </View>
            </View>

            {/* Dropdown */}
            <View style={styles.dropdownWrapper}>
                <Picker
                    selectedValue={selectedChild}
                    onValueChange={(itemValue) => setSelectedChild(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="All children" value="all" />
                    <Picker.Item label="Pranav Bhujbal" value="pranav" />
                    <Picker.Item label="Other Student" value="other" />
                </Picker>
            </View>

            {/* Child Card */}
            <View style={styles.childCard}>
                <View>
                    <Text style={[styles.childName, { fontFamily: 'Inter-SemiBold' }]}>
                        Pranav Bhujbal
                    </Text>
                    <Text style={[styles.childClass, { fontFamily: 'Inter-Regular' }]}>
                        Class X - Roll No: 619
                    </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.childPending, { fontFamily: 'Inter-Regular' }]}>
                        Pending amount
                    </Text>
                    <Text style={[styles.childPendingValue, { fontFamily: 'Inter-Bold' }]}>
                        ₹ 32,565.00
                    </Text>
                    <Text style={[styles.childDue, { fontFamily: 'Inter-Regular' }]}>
                        Next Due: Aug 25, 2025
                    </Text>
                    <Text style={[styles.childDueValue, { fontFamily: 'Inter-Bold' }]}>
                        ₹ 4,833.00
                    </Text>
                </View>
            </View>

            {/* ---------- Main Tabs ---------- */}
            <View style={styles.mainTabsWrapper}>
                <TouchableOpacity
                    style={[styles.mainTab, activeMainTab === "pending" && styles.activeMainTab]}
                    onPress={() => setActiveMainTab("pending")}
                >
                    <Text style={[styles.mainTabText, activeMainTab === "pending" && styles.activeMainTabText]}>
                        Pending Dues
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.mainTab, activeMainTab === "history" && styles.activeMainTab]}
                    onPress={() => setActiveMainTab("history")}
                >
                    <Text style={[styles.mainTabText, activeMainTab === "history" && styles.activeMainTabText]}>
                        Payment History
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.mainTab, activeMainTab === "structure" && styles.activeMainTab]}
                    onPress={() => setActiveMainTab("structure")}
                >
                    <Text style={[styles.mainTabText, activeMainTab === "structure" && styles.activeMainTabText]}>
                        Fee Structure
                    </Text>
                </TouchableOpacity>
            </View>

            {/* ---------- Pending Dues Content ---------- */}
            {activeMainTab === "pending" && (
                <>
                    {/* Sub Tabs */}
                    <View style={styles.subTabsWrapper}>
                        <TouchableOpacity
                            style={[styles.subTab, activeSubTab === "overdue" && styles.activeSubTab]}
                            onPress={() => setActiveSubTab("overdue")}
                        >
                            <Text style={[styles.subTabText, activeSubTab === "overdue" && styles.activeSubTabText]}>
                                Overdue (02)
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.subTab, activeSubTab === "upcoming" && styles.activeSubTab]}
                            onPress={() => setActiveSubTab("upcoming")}
                        >
                            <Text style={[styles.subTabText, activeSubTab === "upcoming" && styles.activeSubTabText]}>
                                Upcoming Dues (03)
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Overdue List */}
                    {activeSubTab === "overdue" && (
                        <>
                            <View style={styles.dueCard}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginRight: 6 }} />
                                        <Text style={styles.dueTitle}>Installment 5</Text>
                                    </View>
                                    <Text style={styles.dueAmount}>₹ 4833.00</Text>
                                </View>
                                <Text style={styles.dueDate}>Due: Aug 19, 2025</Text>

                                <View style={{ flexDirection: "row", marginTop: 12 }}>
                                    <TouchableOpacity style={styles.payBtn}>
                                        <Ionicons name="card" size={16} color="#fff" />
                                        <Text style={styles.payBtnText}>Pay Online</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.recordBtn}>
                                        <MaterialIcons name="edit" size={16} color="#2563eb" />
                                        <Text style={styles.recordBtnText}>Record Payment</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.dueCard}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name="alert-circle" size={18} color="red" style={{ marginRight: 6 }} />
                                        <Text style={styles.dueTitle}>Installment 5</Text>
                                    </View>
                                    <Text style={styles.dueAmount}>₹ 4833.00</Text>
                                </View>
                                <Text style={styles.dueDate}>
                                    Due: Aug 19, 2025 {"\n"}
                                    <Text style={{ color: "red" }}>Includes late fee ₹ 8,700.00</Text>
                                </Text>

                                <View style={{ flexDirection: "row", marginTop: 12 }}>
                                    <TouchableOpacity style={styles.payBtn}>
                                        <Ionicons name="card" size={16} color="#fff" />
                                        <Text style={styles.payBtnText}>Pay Online</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.recordBtn}>
                                        <MaterialIcons name="edit" size={16} color="#2563eb" />
                                        <Text style={styles.recordBtnText}>Record Payment</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                    {/* Upcoming Dues Placeholder */}
                    {activeSubTab === "upcoming" && (
                        <>
                            <View style={styles.dueCard}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name="alert-circle" size={18} color="#F59E0B" style={{ marginRight: 6 }} />
                                        <Text style={styles.dueTitle1}>Installment 5</Text>
                                    </View>
                                    <Text style={styles.dueAmount1}>₹ 4833.00</Text>
                                </View>
                                <Text style={styles.dueDate}>Due: Aug 19, 2025</Text>
                                <View style={styles.divider}></View>
                                <View style={{ flexDirection: "row", marginTop: 12 }}>
                                    <TouchableOpacity style={styles.payBtn}>
                                        <Ionicons name="card" size={16} color="#fff" />
                                        <Text style={styles.payBtnText}>Pay Online</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.recordBtn}>
                                        <MaterialIcons name="edit" size={16} color="#2563eb" />
                                        <Text style={styles.recordBtnText}>Record Payment</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.dueCard}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name="alert-circle" size={18} color="#F59E0B" style={{ marginRight: 6 }} />
                                        <Text style={styles.dueTitle1}>Installment 5</Text>
                                    </View>
                                    <Text style={styles.dueAmount1}>₹ 4833.00</Text>
                                </View>
                                <Text style={styles.dueDate}>
                                    Due: Aug 19, 2025 {"\n"}
                                    <Text style={{ color: "red" }}>Includes late fee ₹ 8,700.00</Text>
                                </Text>

                                <View style={{ flexDirection: "row", marginTop: 12 }}>
                                    <TouchableOpacity style={styles.payBtn}>
                                        <Ionicons name="card" size={16} color="#fff" />
                                        <Text style={styles.payBtnText}>Pay Online</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.recordBtn}>
                                        <MaterialIcons name="edit" size={16} color="#2563eb" />
                                        <Text style={styles.recordBtnText}>Record Payment</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}
                </>
            )}

            {/* ---------- Payment History ---------- */}
            {activeMainTab === "history" && (
                <View style={styles.container3}>
                    <Text style={styles.title}>Paid Payments: {payments.length}</Text>

                    {payments.map((item) => (
                        <View key={item.id} style={styles.card}>
                            {/* Top Row */}
                            <View style={styles.topRow}>
                                <View style={styles.badges}>
                                    {item.status.map((st, idx) => (
                                        <View
                                            key={idx}
                                            style={[
                                                styles.badge,
                                                st === "Paid" && styles.badgePaid,
                                                st === "Receipt Verified" && styles.badgeVerified,
                                                st === "Pending Verification" && styles.badgePending,
                                                st === "Verified" && styles.badgeVerified,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.badgeText,
                                                    (st === "Receipt Verified" || st === "Verified") && { color: "#2979FF" },
                                                    st === "Pending Verification" && { color: "#F57C00" },
                                                    st === "Paid" && { color: "#2E7D32" },
                                                ]}
                                            >
                                                {st}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={styles.mode}>{item.mode}</Text>
                            </View>

                            {/* Installment Details */}
                            <Text style={styles.installment}>{item.installment}</Text>
                            <Text style={styles.date}>{item.date}</Text>

                            {/* Amount */}
                            <Text style={styles.amount}>{item.amount}</Text>
                            {item.lateFee && <Text style={styles.lateFee}>{item.lateFee}</Text>}

                            {/* Action Buttons */}
                            <View style={styles.actions}>
                                {item.actions.map((action, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[
                                            styles.button,
                                            action.includes("Upload") && styles.uploadButton,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                action.includes("Upload") && { color: "#fff" },
                                            ]}
                                        >
                                            {action}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* ---------- Fee Structure ---------- */}
            {activeMainTab === "structure" && (
                <View style={styles.container}>
                    {/* Top Badges */}
                    <View style={styles.badgeContainer}>
                        <View style={styles.installmentsBadge}>
                            <Text style={styles.badgeTextGreen}>Installments Allowed</Text>
                        </View>
                        <View style={styles.lateFeeBadge}>
                            <Text style={styles.badgeTextRed}>Late Fees: ₹ 100/day</Text>
                        </View>
                    </View>

                    {/* Fee Table */}
                    <View style={styles.card}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Fee Type</Text>
                            <Text style={styles.headerText}>Amount</Text>
                        </View>

                        {feeData.map((item, index) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.row,
                                    // Sirf last row par border mat do
                                    index < feeData.length - 1 ? styles.rowBorder : null,
                                ]}
                            >
                                <Text style={styles.feeType}>{item.type}</Text>
                                <Text style={styles.amount}>{item.amount}</Text>
                            </View>
                        ))}


                        {/* Total */}

                    </View>

                    <View style={styles.card1}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>₹ 44,833.00</Text>
                        </View>
                    </View>

                </View>
            )}
        </ScrollView>
    );
};

export default FeesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f4f6",
    },
    scrollContent: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        paddingBottom: 30, // Added extra bottom padding
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        display: 'flex',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        color: "#111827",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: 12,
        height: 40,
        marginBottom: 16,
        borderColor: "#E5E7EB",
        borderWidth: 1
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '400'
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: "#111827",
    },
    academicYear: {
        color: "#6B7280",
        marginBottom: 16,
        fontWeight: '400',
        fontSize: 14,
    },
    exportBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2563eb",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
        marginBottom: 16,
    },
    exportText: {
        color: "#2563eb",
        marginLeft: 6,
        fontSize: 12,
        fontWeight: '500',
    },
    amountCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    pendingLabel: {
        color: "#6b7280",
        fontSize: 12,
        fontWeight: '500',
    },
    pendingValue: {
        color: "#F59E0B",
        fontSize: 20,
        fontWeight: '600',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    statBox: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    statValue: {
        fontSize: 20,
        color: "#111827",
        textAlign: 'center',
    },
    statLabel: {
        color: "#6b7280",
        fontSize: 13,
        textAlign: 'center',
    },
    dropdownWrapper: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 16,
    },
    picker: {
        height: 50,
        width: "100%",
    },
    childCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    childName: {
        fontSize: 16,
        fontWeight: '500',
        color: "#111827",
    },
    childClass: {
        color: "#6B7280",
        fontWeight: '500',
        fontSize: 12,
    },
    childPending: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: '500',
        marginBottom: 16,
    },
    childPendingValue: {
        fontSize: 15,
        color: "#f59e0b",
    },
    childDue: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 6,
    },
    childDueValue: {
        fontSize: 14,
        color: "#111827",
    },

    /* -------- Main Tabs -------- */
    mainTabsWrapper: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: "#ddd",
        borderRadius: 6,
        padding: 4,
    },
    mainTab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    activeMainTab: {
        backgroundColor: "#fff",
        elevation: 2,
    },
    mainTabText: {
        fontSize: 14,
        color: "#6b7280",
    },
    activeMainTabText: {
        color: "#2563eb",
        fontWeight: "600",
    },

    /* -------- Sub Tabs -------- */
    subTabsWrapper: {
        flexDirection: "row",
        marginBottom: 16,
        borderRadius: 8,
        padding: 4,
    },
    subTab: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center",
    },
    activeSubTab: {
        borderBottomColor: "#2563eb",
        borderBottomWidth: 1,
    },
    subTabText: {
        fontSize: 14,
        color: "#6b7280",
    },
    activeSubTabText: {
        color: "#2563eb",
        fontWeight: "600",
    },

    /* -------- Dues Card -------- */
    dueCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#fff",
    },
    dueTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: "#111827",
        fontFamily: 'Inter-Medium',
    },
    dueAmount: {
        fontSize: 16,
        color: "#EF4444",
        fontFamily: 'Inter-Medium',
    },
    dueAmount1: {
        fontSize: 16,
        color: '#F59E0B',
        fontFamily: 'Inter-Medium',
    },
    dueTitle1: {
        color: "#111827",
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
    },
    dueDate: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        color: "#6b7280",
        marginTop: 4,
    },
    payBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2563eb",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginRight: 10,
    },
    payBtnText: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 13,
    },
    recordBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2563eb",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    recordBtnText: {
        color: "#2563eb",
        marginLeft: 6,
        fontSize: 13,
    },
    divider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        height: 1,
    },
    badgeContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 12,
        gap: 10,
    },
    installmentsBadge: {
        backgroundColor: "#E6F9F0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    lateFeeBadge: {
        backgroundColor: "#FDEAEA",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeTextGreen: {
        color: "#2E8B57",
        fontSize: 13,
        fontWeight: "600",
    },
    badgeTextRed: {
        color: "#C62828",
        fontSize: 13,
        fontWeight: "600",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    card1: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,

    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 8,
        marginBottom: 8,
    },
    headerText: {
        fontWeight: "600",
        fontSize: 15,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    feeType: {
        fontSize: 14,
        color: "#444",
    },
    amount: {
        fontSize: 14,
        color: "#444",
    },
    totalContainer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1976D2",
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    badges: {
        flexDirection: "row",
        gap: 8,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    badgePaid: {
        backgroundColor: "#E8F5E9",
    },
    badgeVerified: {
        backgroundColor: "#E3F2FD",
    },
    badgePending: {
        backgroundColor: "#FFF3E0",
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "500",
    },
    mode: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
    },
    installment: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
        color: "#222",
    },
    date: {
        fontSize: 13,
        color: "#888",
        marginBottom: 6,
    },
    amount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    lateFee: {
        fontSize: 13,
        color: "red",
        marginTop: 2,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    button: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#2979FF",
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
        marginHorizontal: 4,
    },
    buttonText: {
        fontSize: 14,
        color: "#2979FF",
        fontWeight: "500",
    },
    uploadButton: {
        backgroundColor: "#2979FF",
    },
});