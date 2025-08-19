
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";

export default function ClassDetailsPopup({ visible, onClose, classData }) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Background */}
        <View style={styles.overlay}>
          {/* Card */}
          <View style={styles.card}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose(false)}
            >
              <Ionicons name="close" size={22} color="#333" />
            </TouchableOpacity>

            {/* Title Row */}
            <View >
              <MaterialIcons
                name="info-outline"
                size={24}
                color="#444"
              />

              <View >
                <Text style={styles.title}>Class Details</Text>
                <Text style={styles.subtitle}>Information about X-A</Text>
              </View>
            </View>

            {/* Class Name & Grade */}
            <View style={styles.row}>
              <View style={styles.infoBlock1}>
                <Text style={styles.label}>Class Name</Text>
                <Text style={styles.value}>X-A</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.label}>Grade</Text>
                <Text style={styles.value}>Grade II</Text>
              </View>
            </View>

            {/* Role */}
            <View style={styles.section}>
              <Text style={styles.label}>Role</Text>
              <View style={styles.tagBlue}>
                <Text style={styles.tagBlueText}>
                  Class Teacher (Supervisor)
                </Text>
              </View>
            </View>

            {/* Subjects */}
            <View style={styles.section}>
              <Text style={styles.label}>Available Subjects</Text>
              <View style={styles.tagContainer}>
                {["Maths", "Science", "English"].map((subject, idx) => (
                  <View key={idx} style={styles.tagGrey}>
                    <Text style={styles.tagGreyText}>{subject}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Students Enrolled */}
            <View style={styles.sectionRow}>
              <Svg width={24} height={24} marginRight={10} viewBox="0 0 24 24" fill="none">
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
              <Text style={styles.studentText}>
                Students Enrolled:{" "}
                <Text style={{ fontWeight: 500, fontSize: 16, color: "#111827" }}>
                  40
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 360,
    padding: 18,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  closeButton: {
    position: "absolute",
    top: -50,
    right: 12,
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
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: "#222",
    top: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: 400,
    top: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    top: 20,
  },
  infoBlock1: {
    flex: 1,

  },
  infoBlock: {
    flex: 1,
    left: 90,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
    fontWeight: 500,
  },
  value: {
    fontSize: 16,
    fontWeight: 500,
    color: "#222",
  },
  section: {
    marginBottom: 14,
    top: 20,
  },
  tagBlue: {
    backgroundColor: "#e6f0ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginTop: 4,
    height: 26,
    width: 180,
    alignItems: "center",
  },
  tagBlueText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#3B82F6",
    top: -1,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // marginTop: 4,
    top: 10,
  },
  tagGrey: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginRight: 8,
    marginBottom: 8,
    height: 26,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tagGreyText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    top: -2,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    top: 20,
    marginBottom: 15,
  },
  studentText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#333",
  },
});

