import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ReportScreen() {
  const [activeTab, setActiveTab] = useState("results");

  const students = [
    {
      id: "1",
      name: "Students Name",
      roll: "102",
      marks: "88",
      grade: "A+",
      status: true,
      remarks: "Ipsum has been the industry's standard dummy text...",
    },
    {
      id: "2",
      name: "Students Name",
      roll: "102",
      marks: "88",
      grade: "A+",
      status: true,
      remarks: "Ipsum has been the industry's standard dummy text...",
    },
    {
      id: "3",
      name: "Students Name",
      roll: "102",
      marks: "N/A",
      grade: "A+",
      status: false,
      remarks: "Ipsum has been the industry's standard dummy text...",
    },
    {
      id: "4",
      name: "Students Name",
      roll: "102",
      marks: "88",
      grade: "A+",
      status: true,
      remarks: "Ipsum has been the industry's standard dummy text...",
    },
    {
      id: "5",
      name: "Students Name",
      roll: "102",
      marks: "N/A",
      grade: "A+",
      status: true,
      remarks: "Ipsum has been the industry's standard dummy text...",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card */}
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.title}>Final Exam</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>

            <View style={styles.cardTop}>
              {/* <Text style={styles.link}>Science (10th A)</Text> */}
              <Text>
                <Text style={styles.link}>Science</Text>
                <Text style={styles.a10}> (10th A)</Text>
              </Text>
              <Text>
                <Text style={styles.access}>Access: </Text>
                <Text style={styles.acc}>Class Teacher</Text>
              </Text>
            </View>

            <View style={styles.infoGrid}>
              <InfoBox
                icon="calendar-today"
                label="Date"
                value="August 20, 2025"
              />

              <InfoBox icon="grading" label="Maximum Marks" value="100" />

              <InfoBox icon="access-time" label="Duration" value="60 min." />
              <InfoBox icon="topic" label="Type" value="Final Exam" />
            </View>
          </View>

          {/* Tabs + Buttons */}
          <View style={styles.tabRowContainer}>
            <View style={styles.newChanges}>
              <View style={styles.tabRow}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "results" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("results")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "results" && styles.activeTabText,
                    ]}
                  >
                    Results
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "statistics" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("statistics")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "statistics" && styles.activeTabText,
                    ]}
                  >
                    Statistics
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Tab Content */}
          <View
            style={[
              styles.contentContainer,
              activeTab === "statistics" && { backgroundColor: "#f2f4f6" }, // 🔹 Change BG when statistics tab active
            ]}
          >
            {activeTab === "results" && (
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editBtn}>
                  <Icon name="edit" size={18} color="#007BFF" />
                  <Text style={styles.editBtnText}> Edit Result</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.publishBtn}>
                  <Icon name="task-alt" size={18} color="#fff" />
                  <Text style={styles.publishBtnText}> Publish Result</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === "results" ? (
              <View>
                <Text style={styles.sr}>Student Results</Text>
                <View style={styles.searchContainer}>
                  <Icon name="search" size={24} color="#999" />
                  <TextInput
                    placeholder="Search students"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                  />
                </View>

                {students.map((item) => (
                  <View key={item.id} style={styles.studentCard}>
                    <View style={styles.row}>
                      {/* Left Side → Avatar + Roll No */}
                      <View style={styles.leftBlock}>
                        <Image
                          source={{
                            uri: "https://randomuser.me/api/portraits/men/32.jpg",
                          }}
                          style={styles.avatar}
                        />
                        <Text style={styles.textAlign}>
                          {" "}
                          <Text style={styles.studentRoll}>Roll No.</Text>{" "}
                        </Text>
                        <Text style={styles.itemRoll}>{item.roll}</Text>
                      </View>

                      {/* Right Side → Name, Marks, Grade, Remark */}
                      <View style={styles.rightBlock}>
                        {/* Name + Status Icon */}
                        <View style={styles.nameRow}>
                          <Text style={styles.studentName}>{item.name}</Text>
                          <Icon
                            name={item.status ? "check-circle" : "cancel"}
                            size={20}
                            color={item.status ? "#10B981" : "#EF4444"}
                          />
                        </View>

                        {/* Marks & Grade */}
                        <View style={styles.badgeRow}>
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                              Marks: {item.marks}
                            </Text>
                          </View>
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                              Grade: {item.grade}
                            </Text>
                          </View>
                        </View>

                        {/* Remark */}
                        {item.remarks && (
                          <>
                            <Text style={styles.remark} numberOfLines={2}>
                              <Text style={styles.label}>Remark: </Text>
                              {item.remarks}
                            </Text>
                            <Text style={styles.readMore}> Read more</Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <View style={styles.perfomance}>
                  <Text style={styles.statsTitle}>Performance Overview</Text>
                  <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Pass Percentage</Text>
                      <Text style={styles.statValue}>50%</Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[styles.progressBarFill, { width: "50%" }]}
                      />
                    </View>

                    <View style={styles.statsGrid}>
                      <View style={styles.statGridItem}>
                        <Text style={styles.statGridLabel}>
                          Highest Percentage
                        </Text>
                        <Text style={styles.statGridValue}>98</Text>
                      </View>
                      <View style={styles.statGridItem}>
                        <Text style={styles.statGridLabel}>Average Marks</Text>
                        <Text style={styles.statGridValue}>98.8</Text>
                      </View>
                      <View style={styles.statGridItem}>
                        <Text style={styles.statGridLabel}>Lowest Marks</Text>
                        <Text style={styles.statGridValue}>98</Text>
                      </View>
                      <View style={styles.statGridItem}>
                        <Text style={styles.statGridLabel}>Passing Marks</Text>
                        <Text style={styles.statGridValue}>33</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text style={styles.statsTitle}>Student Statistics</Text>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Pass/Fail</Text>
                    <Text style={styles.statValue}>50%</Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[styles.progressBarFillGreen, { width: "50%" }]}
                    />
                  </View>

                  <View style={styles.statsGrid}>
                    <View style={styles.statGridItem}>
                      <Text style={styles.statGridLabel}>Total Students</Text>
                      <Text style={styles.statGridValue}>98</Text>
                    </View>
                    <View style={styles.statGridItem}>
                      <Text style={styles.statGridLabel}>Present</Text>
                      <Text style={styles.statGridValue}>2</Text>
                    </View>
                    <View style={styles.statGridItem}>
                      <Text style={styles.statGridLabel}>Absent</Text>
                      <Text style={styles.statGridValue}>98</Text>
                    </View>
                    <View style={styles.statGridItem}>
                      <Text style={styles.statGridLabel}>Attendance</Text>
                      <Text style={styles.statGridValue}>100.0%</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <View style={styles.infoBox}>
      <Icon name={icon} size={22} color="#007BFF" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", paddingTop: 16 },
  headerTitle: { fontSize: 20, fontWeight: "600", marginLeft: 12 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "600" },
  link: { color: "#3B82F6", fontSize: 14, fontWeight: "600" },
  a10: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  access: { color: "#6C757D", fontSize: 14 },
  acc: { color: "#6B7280", fontSize: 14, fontWeight: "600" },
  statusBadge: {
    backgroundColor: "rgba(52,199,89,0.1)",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: { color: "#34C759", fontSize: 12, fontWeight: "400" },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    justifyContent: "space-between",
  },
  infoBox: {
    width: "47.5%",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  infoLabel: { fontSize: 12, color: "#6C757D", marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: "600", color: "#000" },

  tabRowContainer: {
    margin: 0,
    backgroundColor: "#f2f4f6",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  newChanges: { padding: 10 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 0,
    padding: 2,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10 },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 6, // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 5,
  },
  tabText: { fontSize: 12, color: "#6C757D" },
  activeTabText: { color: "#000", fontWeight: "500" },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 10,
    gap: 10,
    padding: 0,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editBtnText: { color: "#007BFF", fontSize: 14 },
  publishBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  publishBtnText: { color: "#fff", fontSize: 14 },

  contentContainer: {
    backgroundColor: "#f2f4f6",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  sr: { fontWeight: "500", fontSize: 18, color: "#111827" },
  searchContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 8,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10.5,
    paddingBottom: 10.5,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8,
  },
  headerText: { fontSize: 12, color: "#111827", fontWeight: "500", flex: 1 },
  itemRoll: {
    fontWeight: 500,
    color: "#111827",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", 
  },
  studentInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  studentName: { fontSize: 14, fontWeight: "600" },
  studentRoll: { fontSize: 12, color: "#6C757D" },
  marks: { fontSize: 14, color: "#666", width: 100, textAlign: "center" },
  grade: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    width: 20,
    textAlign: "center",
  },

  perfomance: { borderRadius: 20 },
  statsCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 5,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: { fontSize: 14, fontWeight: "400", color: "#6B7280" },
  statValue: { fontSize: 14, fontWeight: "400", color: "#6B7280" },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginVertical: 8,
  },
  progressBarFill: { height: 6, backgroundColor: "#007BFF", borderRadius: 3 },
  progressBarFillGreen: {
    height: 6,
    backgroundColor: "#28A745",
    borderRadius: 3,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 10.5,
    paddingRight: 10.5,
    paddingTop: 5,
  },
  statGridItem: { width: "48%", marginTop: 16 },
  statGridLabel: { fontSize: 12, fontWeight: "500", color: "#6B7280" },
  statGridValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 4,
  },

  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftBlock: {
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  textAlign: {
    flexDirection: "column",
    display: "flex",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 6,
  },
  studentRoll: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
  },
  rightBlock: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },
  remark: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
  },
  label: {
    fontWeight: "500",
    color: "rgba(17,24,39,1)",
    fontSize: 12,
  },
  readMore: {
    color: "#3B82F6",
    fontWeight: "400",
    fontSize: 10,
    marginTop: 2,
    marginLeft: 0,
  },
});
