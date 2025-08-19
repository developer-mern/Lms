import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { KeyboardAvoidingView, Platform } from 'react-native';


export default function GradeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allStudents, setAllStudents] = useState([
    { id: 1, rollNo: "10", name: "Pranav Bhujbal", present: true, marks: "" },
    { id: 2, rollNo: "11", name: "Aarav Sharma", present: false, marks: "" },
    { id: 3, rollNo: "12", name: "Riya Verma", present: false, marks: "" },
  ]);

  // Filter students based on search query
  const filteredStudents = allStudents.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query)
    );
  });

  const updateMarks = (id, value) => {
    setAllStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks: value } : s))
    );
  };

  const changeMarks = (id, step) => {
    setAllStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          let val = parseInt(s.marks) || 0;
          val = val + step;
          if (val < 0) val = 0;
          if (val > 100) val = 100;
          return { ...s, marks: val.toString() };
        }
        return s;
      })
    );
  };

  const toggleAttendance = (id) => {
    setAllStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.examTitle}>Final Exam</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>

            <View style={styles.subTextContainer}>
              <Text style={styles.linkText}>Science</Text>
              <Text style={styles.normalText}>(10th A) </Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.accessText}>
                <Text style={styles.accessLabel}>Access: </Text>
                <Text style={styles.accessValue}>Class Teacher</Text>
              </Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoBox}>
                <Svg width={24} height={24} viewBox="0 0 19 20" fill="none">
                  <Path
                    d="M2.5 20C1.95 20 1.47917 19.8042 1.0875 19.4125C0.695833 19.0208 0.5 18.55 0.5 18V4C0.5 3.45 0.695833 2.97917 1.0875 2.5875C1.47917 2.19583 1.95 2 2.5 2H3.5V0H5.5V2H13.5V0H15.5V2H16.5C17.05 2 17.5208 2.19583 17.9125 2.5875C18.3042 2.97917 18.5 3.45 18.5 4V18C18.5 18.55 18.3042 19.0208 17.9125 19.4125C17.5208 19.8042 17.05 20 16.5 20H2.5ZM2.5 18H16.5V8H2.5V18ZM2.5 6H16.5V4H2.5V6Z"
                    fill="#3B82F6"
                  />
                </Svg>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>August 20, 2025</Text>
              </View>
              <View style={styles.infoBox}>
                <Svg width={24} height={24} viewBox="0 0 19 18" fill="none">
                  <Path
                    d="M13.925 17.975L11.1 15.15L12.5 13.75L13.925 15.175L17.1 12L18.5 13.4L13.925 17.975ZM0.5 18V16H9.5V18H0.5ZM0.5 14V12H9.5V14H0.5ZM0.5 10V8H18.5V10H0.5ZM0.5 6V4H18.5V6H0.5ZM0.5 2V0H18.5V2H0.5Z"
                    fill="#3B82F6"
                  />
                </Svg>
                <Text style={styles.infoLabel}>Maximum Marks</Text>
                <Text style={styles.infoValue}>100</Text>
              </View>
              <View style={styles.infoBox}>
                <Svg width={24} height={24} viewBox="0 0 21 20" fill="none">
                  <Path
                    d="M13.8 14.7L15.2 13.3L11.5 9.6V5H9.5V10.4L13.8 14.7ZM10.5 20C9.11667 20 7.81667 19.7375 6.6 19.2125C5.38333 18.6875 4.325 17.975 3.425 17.075C2.525 16.175 1.8125 15.1167 1.2875 13.9C0.7625 12.6833 0.5 11.3833 0.5 10C0.5 8.61667 0.7625 7.31667 1.2875 6.1C1.8125 4.88333 2.525 3.825 3.425 2.925C4.325 2.025 5.38333 1.3125 6.6 0.7875C7.81667 0.2625 9.11667 0 10.5 0C11.8833 0 13.1833 0.2625 14.4 0.7875C15.6167 1.3125 16.675 2.025 17.575 2.925C18.475 3.825 19.1875 4.88333 19.7125 6.1C20.2375 7.31667 20.5 8.61667 20.5 10C20.5 11.3833 20.2375 12.6833 19.7125 13.9C19.1875 15.1167 18.475 16.175 17.575 17.075C16.675 17.975 15.6167 18.6875 14.4 19.2125C13.1833 19.7375 11.8833 20 10.5 20ZM10.5 18C12.7167 18 14.6042 17.2208 16.1625 15.6625C17.7208 14.1042 18.5 12.2167 18.5 10C18.5 7.78333 17.7208 5.89583 16.1625 4.3375C14.6042 2.77917 12.7167 2 10.5 2C8.28333 2 6.39583 2.77917 4.8375 4.3375C3.27917 5.89583 2.5 7.78333 2.5 10C2.5 12.2167 3.27917 14.1042 4.8375 15.6625C6.39583 17.2208 8.28333 18 10.5 18Z"
                    fill="#3B82F6"
                  />
                </Svg>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>60 min.</Text>
              </View>
              <View style={styles.infoBox}>
                <Svg width="24" height="24" viewBox="0 0 21 16" fill="none">
                  <Path
                    d="M4.5 12H12.5V10H4.5V12ZM4.5 8H16.5V6H4.5V8ZM2.5 16C1.95 16 1.47917 15.8042 1.0875 15.4125C0.695833 15.0208 0.5 14.55 0.5 14V2C0.5 1.45 0.695833 0.979167 1.0875 0.5875C1.47917 0.195833 1.95 0 2.5 0H8.5L10.5 2H18.5C19.05 2 19.5208 2.19583 19.9125 2.5875C20.3042 2.97917 20.5 3.45 20.5 4V14C20.5 14.55 20.3042 15.0208 19.9125 15.4125C19.5208 15.8042 19.05 16 18.5 16H2.5ZM2.5 14H18.5V4H9.675L7.675 2H2.5V14Z"
                    fill="#3B82F6"
                  />
                </Svg>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>Final Exam</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
                <Path
                  d="M7.6 15.05L14.65 8L13.25 6.6L7.6 12.25L4.75 9.4L3.35 10.8L7.6 15.05ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.2C6.41667 1.4 6.77917 0.916667 7.2875 0.55C7.79583 0.183333 8.36667 0 9 0C9.63333 0 10.2042 0.183333 10.7125 0.55C11.2208 0.916667 11.5833 1.4 11.8 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V4H2V18ZM9 3.25C9.21667 3.25 9.39583 3.17917 9.5375 3.0375C9.67917 2.89583 9.75 2.71667 9.75 2.5C9.75 2.28333 9.67917 2.10417 9.5375 1.9625C9.39583 1.82083 9.21667 1.75 9 1.75C8.78333 1.75 8.60417 1.82083 8.4625 1.9625C8.32083 2.10417 8.25 2.28333 8.25 2.5C8.25 2.71667 8.32083 2.89583 8.4625 3.0375C8.60417 3.17917 8.78333 3.25 9 3.25Z"
                  fill="#fff"
                />
              </Svg>
              <Text style={styles.saveBtnText}>Save Grades</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Grade Students</Text>
          <Text style={styles.sectionSubtitle}>
            Enter marks for each student or mark them as absent
          </Text>

          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={24} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search students"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {filteredStudents.map((student) => (
            <View style={styles.studentCard} key={student.id}>
              <View style={styles.studentInfo}>
                <View style={styles.avatar} />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      gap: 16,
                    }}
                  >
                    <View style={{ alignItems: "flex-start" }}>
                      <Text style={styles.studentDetail}>Roll No:</Text>
                      <Text style={styles.boldText}>{student.rollNo}</Text>
                    </View>

                    <View>
                      <Text style={styles.studentDetail}>Student Name</Text>
                      <Text style={styles.boldText}>{student.name}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.marksContainer}>
                  <TextInput
                    style={styles.marksInput}
                    placeholder="0-100"
                    keyboardType="numeric"
                    value={student.marks}
                    onChangeText={(val) => updateMarks(student.id, val)}
                  />
                  <View style={styles.arrowContainer}>
                    <TouchableOpacity onPress={() => changeMarks(student.id, 1)}>
                      <MaterialIcons
                        name="keyboard-arrow-up"
                        size={16}
                        color="#666666"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeMarks(student.id, -1)}>
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={16}
                        color="#666666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TextInput
                  style={styles.remarkInput}
                  placeholder="Optional remark"
                />
              </View>

              <View style={styles.attendanceRow}>
                <TouchableOpacity
                  style={[styles.presentBtn, student.present && styles.activeBtn]}
                  onPress={() => toggleAttendance(student.id)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Svg
                      width={18}
                      height={18}
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ marginRight: 6 }}
                    >
                      <Path
                        d="M6.06634 10.0666L10.7663 5.36659L9.83301 4.43325L6.06634 8.19992L4.16634 6.29992L3.23301 7.23325L6.06634 10.0666ZM6.99967 13.6666C6.07745 13.6666 5.21079 13.4916 4.39967 13.1416C3.58856 12.7916 2.88301 12.3166 2.28301 11.7166C1.68301 11.1166 1.20801 10.411 0.858008 9.59992C0.508008 8.78881 0.333008 7.92214 0.333008 6.99992C0.333008 6.0777 0.508008 5.21103 0.858008 4.39992C1.20801 3.58881 1.68301 2.88325 2.28301 2.28325C2.88301 1.68325 3.58856 1.20825 4.39967 0.858252C5.21079 0.508252 6.07745 0.333252 6.99967 0.333252C7.9219 0.333252 8.78856 0.508252 9.59968 0.858252C10.4108 1.20825 11.1163 1.68325 11.7163 2.28325C12.3163 2.88325 12.7913 3.58881 13.1413 4.39992C13.4913 5.21103 13.6663 6.0777 13.6663 6.99992C13.6663 7.92214 13.4913 8.78881 13.1413 9.59992C12.7913 10.411 12.3163 11.1166 11.7163 11.7166C11.1163 12.3166 10.4108 12.7916 9.59968 13.1416C8.78856 13.4916 7.9219 13.6666 6.99967 13.6666ZM6.99967 12.3333C8.48856 12.3333 9.74967 11.8166 10.783 10.7833C11.8163 9.74992 12.333 8.48881 12.333 6.99992C12.333 5.51103 11.8163 4.24992 10.783 3.21659C9.74967 2.18325 8.48856 1.66659 6.99967 1.66659C5.51079 1.66659 4.24967 2.18325 3.21634 3.21659C2.18301 4.24992 1.66634 5.51103 1.66634 6.99992C1.66634 8.48881 2.18301 9.74992 3.21634 10.7833C4.24967 11.8166 6.01079 12.3333 6.99967 12.3333Z"
                        fill={student.present ? "#fff" : "#10B981"}
                      />
                    </Svg>
                    <Text
                      style={[
                        styles.btnText,
                        student.present && styles.activeBtnText,
                      ]}
                    >
                      Present
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.absentBtn,
                    !student.present && styles.activeAbsent,
                  ]}
                  onPress={() => toggleAttendance(student.id)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Svg
                      width={18}
                      height={18}
                      viewBox="0 0 15 14"
                      fill="none"
                      style={{ marginRight: 6 }}
                    >
                      <Path
                        d="M5.09967 10.3333L7.49967 7.93325L9.89968 10.3333L10.833 9.39992L8.43301 6.99992L10.833 4.59992L9.89968 3.66659L7.49967 6.06659L5.09967 3.66659L4.16634 4.59992L6.56634 6.99992L4.16634 9.39992L5.09967 10.3333ZM7.49967 13.6666C6.57745 13.6666 5.71079 13.4916 4.89967 13.1416C4.08856 12.7916 3.38301 12.3166 2.78301 11.7166C2.18301 11.1166 1.70801 10.411 1.35801 9.59992C1.00801 8.78881 0.833008 7.92214 0.833008 6.99992C0.833008 6.0777 1.00801 5.21103 1.35801 4.39992C1.70801 3.58881 2.18301 2.88325 2.78301 2.28325C3.38301 1.68325 4.08856 1.20825 4.89967 0.858252C5.71079 0.508252 6.57745 0.333252 7.49967 0.333252C8.4219 0.333252 9.28856 0.508252 10.0997 0.858252C10.9108 1.20825 11.6163 1.68325 12.2163 2.28325C12.8163 2.88325 13.2913 3.58881 13.6413 4.39992C13.9913 5.21103 14.1663 6.0777 14.1663 6.99992C14.1663 7.92214 13.9913 8.78881 13.6413 9.59992C13.2913 10.411 12.8163 11.1166 12.2163 11.7166C11.6163 12.3166 10.9108 12.7916 10.0997 13.1416C9.28856 13.4916 8.4219 13.6666 7.49967 13.6666ZM7.49967 12.3333C8.98856 12.3333 10.2497 11.8166 11.283 10.7833C12.3163 9.74992 12.833 8.48881 12.833 6.99992C12.833 5.51103 12.3163 4.24992 11.283 3.21659C10.2497 2.18325 8.98856 1.66659 7.49967 1.66659C6.01079 1.66659 4.74967 2.18325 3.71634 3.21659C2.68301 4.24992 2.16634 5.51103 2.16634 6.99992C2.16634 8.48881 2.68301 9.74992 3.71634 10.7833C4.24967 11.8166 6.01079 12.3333 7.49967 12.3333Z"
                        fill={!student.present ? "#fff" : "#EF4444"}
                      />
                    </Svg>
                    <Text
                      style={[
                        styles.absentBtnText,
                        !student.present && styles.activeBtnText,
                      ]}
                    >
                      Absent
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.saveBtn1}>
            <Text style={styles.saveBtnText1}>Save Grades</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  container: {
    // padding: width * 0.04,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
    color: "#111827",
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 16,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16, borderColor: "#E5E7EB",
    borderWidth: 1,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  examTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  statusBadge: {
    backgroundColor: "#34C7591A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },
  statusText: {
    color: "#34C759",
    fontWeight: "500",
    fontSize: 12,
  },
  subTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  normalText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    marginLeft: 4,
  },
  linkText: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 14,
  },
  accessLabel: {
    color: "#6B7280",
    fontWeight: "400",
    fontSize: 14,
  },
  accessValue: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 14,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  infoBox: {
    width: "48%",
    backgroundColor: "#3B82F60D",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    paddingTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    paddingTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
    color: "#111827",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 8,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#6B7280",
  },
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    marginRight: 16,
  },
  studentDetail: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  boldText: {
    fontWeight: "500",
    color: "#111827",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  marksContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    flex: 0.7,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
  },
  marksInput: {
    width: 50,
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  remarkInput: {
    flex: 0.7,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    fontSize: 14,
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  presentBtn: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: "#10B981",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  absentBtn: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: "#10B981",
  },
  activeAbsent: {
    backgroundColor: "#EF4444",
  },
  btnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#10B981",
  },
  absentBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#EF4444",
  },
  activeBtnText: {
    color: "#fff",
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 16,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  saveBtn1: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-middle",
  },
  saveBtnText1: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});
