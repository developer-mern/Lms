import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Progress from "react-native-progress";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";

export default function PerformanceScreen() {
  const [selectedChild, setSelectedChild] = useState("Pranav Bhujbal X-A");
  const [selectedChild2, setSelectedChild2] = useState(
    "Unit Test (20 Aug - 25 Aug, 2025)"
  );
  const [activeTab, setActiveTab] = useState("Performance");

  const tabs = ["Performance", "Exams", "Results"];

  const ChildOption = [
    { label: "Pranav Bhujbal X-A", value: "Pranav Bhujbal X-A" },
    { label: "Siddhi Patil IX-B", value: "Siddhi Patil IX-B" },
    { label: "Rohan Shinde VIII-C", value: "Rohan Shinde VIII-C" },
  ];

  const Child2Option = [
    {
      label: "Unit Test (20 Aug - 25 Aug, 2025)",
      value: "Unit Test (20 Aug - 25 Aug, 2025)",
    },
    {
      label: "Unit Test (26 Aug - 30 Aug, 2025)",
      value: "Unit Test (26 Aug - 30 Aug, 2025)",
    },
    {
      label: "Unit Test (1 Sept - 5 Sept, 2025)",
      value: "Unit Test (1 Sept - 5 Sept, 2025)",
    },
  ];

  const overallPercentage = 0.85;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topSection}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#666666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Performance</Text>
          </View>

          <View style={styles.searchContainer}>
            <View>
              <Icon name="search" size={24} color="#999" />
            </View>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>

          <Text style={styles.tre}>Academic Performance</Text>

          <TouchableOpacity style={styles.exportButton}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#2563EB"
            >
              <Path d="M480-480ZM202-65l-56-57 118-118h-90v-80h226v226h-80v-89L202-65Zm278-15v-80h240v-440H520v-200H240v400h-80v-400q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H480Z" />
            </Svg>
            <Text style={styles.exportText}>Export CSV</Text>
          </TouchableOpacity>

          <Text style={styles.child}>Select Child</Text>
          <View style={styles.selector}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              data={ChildOption}
              labelField="label"
              valueField="value"
              placeholder="Student"
              value={selectedChild}
              onChange={(item) => setSelectedChild(item.value)}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.nme}>Overall Percentage</Text>
            <Text style={styles.percent}>85%</Text>

            <Progress.Bar
              progress={overallPercentage}
              width={null}
              height={4}
              color="#10b981"
              borderRadius={50}
              borderWidth={0}
              borderColor="#E5E7EB"
              backgroundColor={"#4d44440a"}
              style={{ marginTop: 8 }}
            />
            <Text style={styles.grade}>Grade A</Text>

            <View style={styles.row}>
              <View style={styles.cc}>
                <View styles={{ gap: 4 }}>
                  <Text style={styles.stats}>Subjects</Text>
                  <Text style={styles.by}>02</Text>
                </View>
              </View>
              <View style={styles.cc}>
                <View styles={{ gap: 4 }}>
                  <Text style={styles.stats}>Total Exams</Text>

                  <Text style={styles.by}>02</Text>
                </View>
              </View>
              <View style={styles.cc}>
                <View styles={{ gap: 4 }}>
                  <Text style={styles.stats}>Completed</Text>
                  <Text style={styles.by}>02</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.container1}>
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>

                {index < tabs.length - 1 &&
                  activeTab !== tab &&
                  activeTab !== tabs[index + 1] && (
                    <View style={styles.separator} />
                  )}
              </React.Fragment>
            ))}
          </View>

          <ScrollView>
            {activeTab === "Performance" && (
              <>
                <Text style={styles.sectionTitle}>
                  Subject-wise Performance
                </Text>

                <Text style={styles.sectionTitle2}>
                  Performance breakdown by subject
                </Text>
                <View style={styles.subjectCard}>
                  <View style={styles.group}>
                    <View style={styles.subjectCard1}>
                      <View style={styles.c2}>
                        <Text style={styles.ma}>Mathematics</Text>
                        <Text>
                          <Text style={styles.pc}>87%</Text>
                          <Text style={styles.pc2}> (A)</Text>
                        </Text>
                      </View>
                      <Progress.Bar
                        progress={0.87}
                        width={null}
                        height={4}
                        color="#3b82f6"
                        borderRadius={5}
                        borderWidth={0}
                        borderColor="#E5E7EB"
                        backgroundColor={"#4d44440a"}
                        style={{ marginTop: 8, marginBottom: 4 }}
                      />
                      <Text style={styles.smallText}>1 exam completed</Text>
                    </View>

                    <View style={styles.subjectCard1}>
                      <View style={styles.c2}>
                        <Text style={styles.ma}>English</Text>
                        <Text>
                          <Text style={styles.pc}>93%</Text>
                          <Text style={styles.pc2}> (A+)</Text>
                        </Text>
                      </View>
                      <Progress.Bar
                        progress={0.93}
                        width={null}
                        height={4}
                        color="#3b82f6"
                        borderRadius={5}
                        borderWidth={0}
                        borderColor="#E5E7EB"
                        backgroundColor={"#4d44440a"}
                        style={{ marginTop: 8, marginBottom: 4 }}
                      />
                      <Text style={styles.smallText}>1 exam completed</Text>
                    </View>
                  </View>
                </View>
              </>
            )}

            {activeTab === "Exams" && (
              <>
                <Text style={styles.sectionTitle}>Upcomming Exams</Text>
                <Text style={styles.sectionTitle2}>
                  Schedule Exam for Sumit Gorad
                </Text>

                <View style={styles.subjectCard}>
                  <View style={styles.group}>
                    <View>
                      <View style={styles.exm}>
                        <View style={styles.byt}>
                          <Text style={styles.ut}>Unit Test</Text>
                        </View>
                        <Text style={styles.tu}>August 9,2025</Text>
                      </View>
                      <Text style={styles.tu2}>Text Exam</Text>
                    </View>

                    <View style={styles.last}>
                      <View>
                        <Text style={styles.sub}>Subject:</Text>
                        <Text style={styles.sub2}>Maths</Text>
                      </View>
                      <View style={styles.ui}>
                        <Text style={styles.sub}>Duration:</Text>
                        <Text style={styles.sub2}>60 minutes</Text>
                      </View>
                      <View>
                        <Text style={styles.sub}>Max Marks:</Text>
                        <Text style={styles.sub23}>00</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.subjectCard}>
                  <View style={styles.group}>
                    <View>
                      <View style={styles.exm}>
                        <View style={styles.byt}>
                          <Text style={styles.ut}>Unit Test</Text>
                        </View>
                        <Text style={styles.tu}>August 9,2025</Text>
                      </View>
                      <Text style={styles.tu2}>Text Exam</Text>
                    </View>

                    <View style={styles.last}>
                      <View>
                        <Text style={styles.sub}>Subject:</Text>
                        <Text style={styles.sub2}>Maths</Text>
                      </View>
                      <View style={styles.ui}>
                        <Text style={styles.sub}>Duration:</Text>
                        <Text style={styles.sub2}>60 minutes</Text>
                      </View>
                      <View>
                        <Text style={styles.sub}>Max Marks:</Text>
                        <Text style={styles.sub23}>00</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            )}

            {activeTab === "Results" && (
              <View>
                <Text style={styles.sectionTitle3}>Select Exam Type</Text>
                <View style={styles.selector}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownText2}
                    selectedTextStyle={styles.dropdownText2}
                    itemTextStyle={styles.dropdownText2}
                    data={Child2Option}
                    labelField="label"
                    valueField="value"
                    placeholder="Test"
                    value={selectedChild2}
                    onChange={(item) => setSelectedChild2(item.value)}
                  />
                </View>

                <View style={styles.rrr}>
                  <View style={styles.subjectCard3}>
                    <View style={styles.group}>
                      <View>
                        <View style={styles.exm}>
                          <View style={styles.bytt}>
                            <View style={styles.di}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#3B82F6"
                              >
                                <Path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z" />
                              </Svg>
                            </View>
                            <Text style={styles.ut1}>Studdent Name</Text>
                          </View>
                          <Text style={styles.tu1}>August 9,2025</Text>
                        </View>
                      </View>

                      <View style={styles.last}>
                        <View>
                          <Text style={styles.sub1}>87</Text>
                          <Text style={styles.sub21}>out of 100</Text>
                        </View>
                        <View style={styles.ui}>
                          <Text style={styles.sub1}>A</Text>
                          <Text style={styles.sub21}>Grade</Text>
                        </View>
                        <View>
                          <Text style={styles.sub11}>87%</Text>
                          <Text style={styles.sub21}>Percentage</Text>
                        </View>
                      </View>
                      <View>
                        <View style={styles.horiline}></View>
                        <View style={styles.horiline1}>
                          <Text style={styles.rem}>Remark</Text>
                          <Text style={styles.rem2}>
                            Strong performance. Consistently solving complex
                            problems.Keep up the great work!
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.subjectCard4}>
                    <View style={styles.group}>
                      <View>
                        <View style={styles.exm}>
                          <View style={styles.bytt}>
                            <View style={styles.di}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#3B82F6"
                              >
                                <Path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z" />
                              </Svg>
                            </View>
                            <Text style={styles.ut1}>Studdent Name</Text>
                          </View>
                          <Text style={styles.tu1}>August 9,2025</Text>
                        </View>
                      </View>

                      <View style={styles.last}>
                        <View>
                          <Text style={styles.sub1}>87</Text>
                          <Text style={styles.sub21}>out of 100</Text>
                        </View>
                        <View style={styles.ui}>
                          <Text style={styles.sub1}>A</Text>
                          <Text style={styles.sub21}>Grade</Text>
                        </View>
                        <View>
                          <Text style={styles.sub11}>87%</Text>
                          <Text style={styles.sub21}>Percentage</Text>
                        </View>
                      </View>
                      <View>
                        <View style={styles.horiline}></View>
                        <View style={styles.horiline1}>
                          <Text style={styles.rem}>Remark</Text>
                          <Text style={styles.rem2}>
                            Strong performance. Consistently solving complex
                            problems.Keep up the great work!
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f6",
    paddingVertical: 8,
  },

  topSection: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "Semi-bold",
    color: "#111827",
  },

  searchContainer: {
    marginTop: 24,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderColor: "#E5E7EB",
    display: "flex",
    borderWidth: 1,
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },

  tre: {
    fontSize: 20,
    fontWeight: 600,
    fontStyle: "Semi-bold",
    marginBottom: 16,
  },

  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginBottom: 12,
    gap: 4,
  },

  exportText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#2563EB",
    fontWeight: "bold",
  },

  child: {
    fontSize: 14,
    fontWeight: 500,
    fontStyle: "medium",
    marginBottom: 4,
  },

  dropdown: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E5E7EB",
    backgroundColor: "#ffffff",
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
  },
  dropdownText2: {
    fontSize: 14,
    fontWeight: "500",
    color: "primary",
  },
  placeholder: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "400",
  },

  card: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  nme: {
    fontSize: 12,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#111827",
    marginBottom: 16,
  },
  percent: {
    fontSize: 20,
    fontWeight: "semi-bold",
    marginBottom: 8,
    fontWeight: 600,
  },
  grade: {
    color: "#6b7280",
    fontSize: 10,
    fontWeight: 400,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  cc: {
    backgroundColor: "rgba(59,130,246,0.05)",
    borderRadius: 8,
    padding: 8,
    width: "29.5%",
  },

  stats: {
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7280",
    fontStyle: "medium",
  },
  by: {
    fontSize: 20,
    fontStyle: "semi-bold",
    color: "#111827",
    fontWeight: 600,
  },

  bottomSection: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    fontStyle: "medium",
  },
  sectionTitle3: {
    fontSize: 14,
    fontWeight: 500,
    fontStyle: "medium",
    marginBottom: 4,
  },

  sectionTitle2: {
    fontSize: 11,
    fontWeight: 500,
    marginTop: 2,
    marginBottom: 8,
    fontStyle: "medium",
    color: "#6b7280",
  },
  subjectCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  subjectCard3: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  subjectCard4: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  group: {
    gap: 12,
  },
  subjectCard1: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  c2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ma: {
    fontSize: 12,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#111827",
  },
  pc: {
    fontSize: 12,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#111827",
  },
  pc2: {
    fontSize: 12,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#3b82f6",
  },
  smallText: {
    color: "#6b7280",
    marginTop: 2,
    fontSize: 10,
    fontWeight: 400,
  },

  container1: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
    padding: 2,
    marginBottom: 16,
  },
  statLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  centerTab: {
    borderColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  tabText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  activeTabText: {
    fontWeight: "700",
    color: "#000",
  },
  separator: {
    width: 1,
    color: "rgba(60,60,67,0.36)",
    backgroundColor: "#ccc",
    marginVertical: 14,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    alignItems: "center",
  },

  exm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  byt: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#e5e7eb",
  },
  ut: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "medium",
  },
  tu: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "medium",
  },
  tu2: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "medium",
    marginTop: 8,
  },
  last: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sub: {
    fontStyle: "regular",
    fontSize: 10,
    fontWeight: 400,
    color: "#6b7280",
  },
  sub2: {
    fontStyle: "medium",
    fontSize: 12,
    fontWeight: 500,
    color: "#111827",
  },
  sub23: {
    fontStyle: "medium",
    fontSize: 12,
    fontWeight: 500,
    color: "#111827",
    textAlign: "right",
  },
  ui: {
    alignItems: "center",
    justifyContent: "center",
  },
  bytt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  di: {
    backgroundColor: "#rgba(59,130,246,0.05)",
    paddingLeft: 6,
    paddingRight: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 4,
  },
  horiline: {
    width: "auto",
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  ut1: {
    fontSize: 16,
    fontWeight: 500,
    color: "#111827",
    fontStyle: "medium",
    paddingBottom: 4,
    paddingTop: 4,
  },
  tu1: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "medium",
    paddingBottom: 7,
    paddingTop: 7,
  },
  rem: {
    fontSize: 10,
    fontStyle: "regular",
    fontWeight: 400,
    color: "#111827",
    marginTop: 8,
  },
  rem2: {
    fontSize: 10,
    fontStyle: "regular",
    fontWeight: 400,
    color: "#6B7280",
  },
  sub1: {
    fontSize: 18,
    fontStyle: "bold",
    fontWeight: 700,
    color: "#1D64D8",
  },
  sub11: {
    fontSize: 18,
    fontStyle: "bold",
    fontWeight: 700,
    color: "#1D64D8",
    textAlign: "right",
  },
  sub21: {
    fontSize: 10,
    fontStyle: "regular",
    fontWeight: 400,
    color: "#6B7280",
    textAlign: "right",
  },
  rrr: {
    marginTop: 16,
  },
});
