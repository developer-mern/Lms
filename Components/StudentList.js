

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

export default function StudentsListPopup({ visible, onClose, students, className, studentCount }) {

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
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Title */}
            <View>
              <Text style={styles.title}>Students in {className}</Text>
              <Text style={styles.subtitle}>
                View and manage students in your supervised {"\n"}class
              </Text>
            </View>

            {/* Enrolled Count */}
            <Text style={styles.enrolledText}>
              Students Enrolled:{" "}
              <Text style={styles.enrolledCount}>{studentCount}</Text>
            </Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Roll No.</Text>
              <Text style={[styles.tableHeaderText2, { flex: 2 }]}>Name</Text>
              <Text style={[styles.tableHeaderText1, { flex: 2 }]}>Action</Text>
            </View>

            {/* Table Rows */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{student.rollNo || "-"}</Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>{student.name || "Unnamed"}</Text>
                    <TouchableOpacity
                      style={styles.markBtn}
                      onPress={() => handleMarkAttendance(student)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="checkmark-circle-outline" size={14} color="#555" />
                      <Text style={styles.markBtnText}>Mark Attendance</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>No students available</Text>
              )}
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
