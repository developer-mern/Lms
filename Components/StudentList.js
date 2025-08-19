

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView, // ✅ Added import
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

export default function StudentsListPopup({ visible, onClose }) {
  const students = [
    { roll: "0123", name: "Pranav Bhujbal" },
    { roll: "0124", name: "Ankita Patil" },
    { roll: "0125", name: "Rahul Deshmukh" },
    { roll: "0126", name: "Sneha Kulkarni" },
  ];

  const handleMarkAttendance = (student) => {
    console.log(`Marking attendance for ${student.name} (${student.roll})`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <View style={styles.card1}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Title Row with Inline SVG */}
            <View >

              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Mask
                  id="mask0_436_5764"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={24}
                  height={24}
                >
                  <Rect width={24} height={24} fill="#D9D9D9" />
                </Mask>
                <G mask="url(#mask0_436_5764)">
                  <Path
                    d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z"
                    fill="#4B5563"
                  />
                </G>
              </Svg>
              <View>
                <Text style={styles.title}>Students in X-A</Text>
                <Text style={styles.subtitle}>
                  View and manage students in your supervised {"\n"}class
                </Text>
              </View>
            </View>

            {/* Enrolled Count */}
            <Text style={styles.enrolledText}>
              Students Enrolled: <Text style={styles.enrolledCount}>40</Text>
            </Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Roll No.</Text>
              <Text style={[styles.tableHeaderText2, { flex: 2 }]}>Name</Text>
              <Text style={[styles.tableHeaderText1, { flex: 2 }]}>Action</Text>
            </View>

            {/* Table Rows */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {students.map((student, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {student.roll}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    {student.name}
                  </Text>
                  <TouchableOpacity
                    style={styles.markBtn}
                    onPress={() => handleMarkAttendance(student)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={14}
                      color="#555"
                    />
                    <Text style={styles.markBtnText}>Mark Attendance</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card1: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 360,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -50,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "400",
  },
  enrolledText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555",
    // marginBottom: 8,
    top: 6,
  },
  enrolledCount: {
    fontWeight: "500",
    fontSize: 16,
    color: "#111827",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    top: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  tableHeaderText1: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    right: -10,
  },
  tableHeaderText2: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    right: -5,
  },
  scrollView: {
    maxHeight: 200,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    top: 20,
  },
  tableCell: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  markBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 24,
    width: 109,
  },
  markBtnText: {
    fontSize: 10,
    fontWeight: "400",
    marginLeft: 4,
    color: "#333",
  },
});
