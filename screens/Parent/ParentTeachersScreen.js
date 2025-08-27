import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

export default function ParentTeacherScreen() {
  const [selectedChild, setSelectedChild] = useState("Pranav Bhujbal X-A");
  const [showDropdown, setShowDropdown] = useState(false);

  const children = [
    "Pranav Bhujbal X-A",
    "Riya Patil IX-B",
    "Aarav Sharma VIII-C",
    "Saanvi Deshmukh X-B",
  ];

  // Teachers Data
  const teachers = [
    {
      name: "Ramesh Patil",
      role: "Subject Teacher",
      subject: "Maths",
      email: "ramesh.patil@mail.com",
      phone: "+91 9876543210",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sneha Deshmukh",
      role: "Class Teacher",
      subject: "Science",
      email: "sneha.deshmukh@mail.com",
      phone: "+91 9876501234",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Amit Sharma",
      role: "Subject Teacher",
      subject: "English",
      email: "amit.sharma@mail.com",
      phone: "+91 9998887776",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Priya Kulkarni",
      role: "Subject Teacher",
      subject: "History",
      email: "priya.kulkarni@mail.com",
      phone: "+91 9988776655",
      avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="#666666" />
        <Text style={styles.headerTitle}>Teachers</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={24} color="#6B7280" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* Section */}
      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Teachers</Text>
        <Text style={styles.sectionDesc}>
          View and contact your child&apos;s teachers
        </Text>

        {/* Dropdown */}
        <Text style={styles.subLabel}>Select Child</Text>
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{selectedChild}</Text>
            <MaterialIcons
              name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={16}
              color="black"
            />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownList}>
              {children.map((child, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedChild(child);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{child}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Teachers List */}
      <Text style={styles.sectionTitle1}>Teachers</Text>
      {teachers.map((teacher, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: teacher.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.teacherName}>{teacher.name}</Text>
              <Text style={styles.teacherRole}>{teacher.role}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{teacher.subject}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                <Path
                  d="M11.3 12C9.91111 12 8.53889 11.6972 7.18333 11.0917C5.82778 10.4861 4.59444 9.62778 3.48333 8.51667C2.37222 7.40556 1.51389 6.17222 0.908333 4.81667C0.302778 3.46111 0 2.08889 0 0.7C0 0.5 0.0666667 0.333333 0.2 0.2C0.333333 0.0666667 0.5 0 0.7 0H3.4C3.55556 0 3.69444 0.0527778 3.81667 0.158333C3.93889 0.263889 4.01111 0.388889 4.03333 0.533333L4.46667 2.86667C4.48889 3.04444 4.48333 3.19444 4.45 3.31667C4.41667 3.43889 4.35556 3.54444 4.26667 3.63333L2.65 5.26667C2.87222 5.67778 3.13611 6.075 3.44167 6.45833C3.74722 6.84167 4.08333 7.21111 4.45 7.56667C4.79444 7.91111 5.15556 8.23056 5.53333 8.525C5.91111 8.81944 6.31111 9.08889 6.73333 9.33333L8.3 7.76667C8.4 7.66667 8.53056 7.59167 8.69167 7.54167C8.85278 7.49167 9.01111 7.47778 9.16667 7.5L11.4667 7.96667C11.6222 8.01111 11.75 8.09167 11.85 8.20833C11.95 8.325 12 8.45556 12 8.6V11.3C12 11.5 11.9333 11.6667 11.8 11.8C11.6667 11.9333 11.5 12 11.3 12ZM2.01667 4L3.11667 2.9L2.83333 1.33333H1.35C1.40556 1.78889 1.48333 2.23889 1.58333 2.68333C1.68333 3.12778 1.82778 3.56667 2.01667 4ZM7.98333 9.96667C8.41667 10.1556 8.85833 10.3056 9.30833 10.4167C9.75833 10.5278 10.2111 10.6 10.6667 10.6333V9.16667L9.1 8.85L7.98333 9.96667Z"
                  fill="#3B82F6"
                />
              </Svg>
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity style={styles.actionBtn}>
              <Svg width="16" height="16" viewBox="0 0 15 12" fill="none">
                <Path
                  d="M2.16683 11.3334C1.80016 11.3334 1.48627 11.2029 1.22516 10.9417C0.964052 10.6806 0.833496 10.3667 0.833496 10.0001V2.00008C0.833496 1.63341 0.964052 1.31953 1.22516 1.05841C1.48627 0.797304 1.80016 0.666748 2.16683 0.666748H12.8335C13.2002 0.666748 13.5141 0.797304 13.7752 1.05841C14.0363 1.31953 14.1668 1.63341 14.1668 2.00008V10.0001C14.1668 10.3667 14.0363 10.6806 13.7752 10.9417C13.5141 11.2029 13.2002 11.3334 12.8335 11.3334H2.16683ZM7.50016 6.66675L2.16683 3.33341V10.0001H12.8335V3.33341L7.50016 6.66675ZM7.50016 5.33341L12.8335 2.00008H2.16683L7.50016 5.33341Z"
                  fill="#3B82F6"
                />
              </Svg>
              <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>

            {/* Message */}
            <TouchableOpacity style={styles.actionBtn}>
              <Svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <Path
                  d="M0.336914 13.6666V1.66659C0.336914 1.29992 0.46747 0.98603 
                  0.728581 0.724919C0.989692 0.463808 1.30358 0.333252 
                  1.67025 0.333252H12.3369C12.7036 0.333252 13.0175 
                  0.463808 13.2786 0.724919C13.5397 0.98603 13.6702 
                  1.29992 13.6702 1.66659V9.66659C13.6702 10.0333 
                  13.5397 10.3471 13.2786 10.6083C13.0175 10.8694 
                  12.7036 10.9999 12.3369 10.9999H3.00358L0.336914 
                  13.6666ZM2.43691 9.66659H12.3369V1.66659H1.67025V10.4166L2.43691 9.66659Z"
                  fill="#3B82F6"
                />
              </Svg>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13 20 6.01V6H4zm0 12h16V8l-8 7-8-7v10z"
                  fill="#555"
                />
              </Svg>
              <Text style={styles.contactText}>{teacher.email}</Text>
            </View>

            {/* Email Row */}
            <View style={styles.contactRow}>
              <Svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                <Path
                  d="M11.3 12C9.91111 12 8.53889 11.6972 7.18333 11.0917C5.82778 10.4861 4.59444 9.62778 3.48333 8.51667C2.37222 7.40556 1.51389 6.17222 0.908333 4.81667C0.302778 3.46111 0 2.08889 0 0.7C0 0.5 0.0666667 0.333333 0.2 0.2C0.333333 0.0666667 0.5 0 0.7 0H3.4C3.55556 0 3.69444 0.0527778 3.81667 0.158333C3.93889 0.263889 4.01111 0.388889 4.03333 0.533333L4.46667 2.86667C4.48889 3.04444 4.48333 3.19444 4.45 3.31667C4.41667 3.43889 4.35556 3.54444 4.26667 3.63333L2.65 5.26667C2.87222 5.67778 3.13611 6.075 3.44167 6.45833C3.74722 6.84167 4.08333 7.21111 4.45 7.56667C4.79444 7.91111 5.15556 8.23056 5.53333 8.525C5.91111 8.81944 6.31111 9.08889 6.73333 9.33333L8.3 7.76667C8.4 7.66667 8.53056 7.59167 8.69167 7.54167C8.85278 7.49167 9.01111 7.47778 9.16667 7.5L11.4667 7.96667C11.6222 8.01111 11.75 8.09167 11.85 8.20833C11.95 8.325 12 8.45556 12 8.6V11.3C12 11.5 11.9333 11.6667 11.8 11.8C11.6667 11.9333 11.5 12 11.3 12ZM2.01667 4L3.11667 2.9L2.83333 1.33333H1.35C1.40556 1.78889 1.48333 2.23889 1.58333 2.68333C1.68333 3.12778 1.82778 3.56667 2.01667 4ZM7.98333 9.96667C8.41667 10.1556 8.85833 10.3056 9.30833 10.4167C9.75833 10.5278 10.2111 10.6 10.6667 10.6333V9.16667L9.1 8.85L7.98333 9.96667Z"
                  fill="#666666"
                />
              </Svg>

              <Text style={styles.contactText}>{teacher.phone}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
    color: "#111827",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 19,
    marginTop: 24,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    minHeight: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#6B7280",
    marginLeft: 10,
  },
  card1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
    marginTop: 16,
  },
  sectionDesc: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
  },
  subLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginTop: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "400",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownItem: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "400",
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  teacherRole: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 4,
  },
  badge: {
    backgroundColor: "#F2F4F6",
    borderRadius: 50,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1, // 👈 Equal width
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderColor: "#2563EB",
    borderWidth: 1,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#2563EB",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactInfo: {
    paddingTop: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
    marginLeft: 8,
    paddingVertical: 8,
  },
});
