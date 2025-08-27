import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';

import { MaterialIcons, MaterialIconsOutlined, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../Context/authContext';
import { getMe } from '../../api/authapi';

export default function StudentProfile() {
  const { token } = useAuth();

  const { logoutUser } = useAuth();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
  const fetchStudent = async () => {
    try {
      if (!token) return;

      const res = await getMe(token);

      if (res.success && res.data) {
        const student = res.data;

        // ✅ Generate initials (e.g., "ER")
        const initials = `${student?.name?.[0] || ""}${student?.surname?.[0] || ""}`.toUpperCase() || "P";

        const mappedData = {
          name: `${student.name || ""} ${student.surname || ""}`.trim(),
          role: "Student",
          img:
            student?.img && student.img.trim() !== ""
              ? student.img
              : `https://via.placeholder.com/60x60/cccccc/666666?text=${initials}`,
          email: student.email || "abcd@email.com",
          phone: student.phone || "0123456789",
          dob: student.birthday
            ? new Date(student.birthday).toLocaleDateString("en-GB")
            : "DD/MM/YYYY",
          gender:
            student.sex === "MALE"
              ? "Male"
              : student.sex === "FEMALE"
              ? "Female"
              : "Other",
        };

        setStudentData(mappedData);
      }
    } catch (err) {
      console.error("Failed to load student profile", err);
    }
  };

  fetchStudent();
}, [token]);


  const menuItems = [
    {
      id: 1,
      title: 'Children management',
      icon: <Ionicons name="people-outline" size={22} color="#4285f4" />,
      color: '#4285f4',
      onPress: () => console.log('Children management pressed'),
    },
    {
      id: 2,
      title: 'Account & security',
      icon: <Ionicons name="shield-checkmark-outline" size={22} color="#4285f4" />,
      color: '#4285f4',
      onPress: () => console.log('Account & security pressed'),
    },
    {
      id: 3,
      title: 'App preferences',
      icon: <Ionicons name="settings-outline" size={22} color="#4285f4" />,
      color: '#4285f4',
      onPress: () => console.log('App preferences pressed'),
    },
    {
      id: 4,
      title: 'Help & support',
      icon: <Ionicons name="help-circle-outline" size={22} color="#4285f4" />,
      color: '#4285f4',
      onPress: () => console.log('Help & support pressed'),
    },
    {
      id: 5,
      title: 'Logout',
      icon: <MaterialIcons name="logout" size={22} color="#ff4444" />,
      color: '#ff4444',
      onPress: logoutUser,
    },
  ];


  const ChevronRight = () => (
    <Ionicons name="chevron-forward" size={20} color="#999" />
  );

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const MenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
          {item.icon}
        </View>
        <Text style={[
          styles.menuTitle,
          item.id === 5 && styles.logoutTitle
        ]}>
          {item.title}
        </Text>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
           source={{ uri: studentData?.img }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginTop: 15,
              marginRight: 16,
              backgroundColor: "#111827",
            }}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{studentData?.name}</Text>
            <Text style={styles.profileRole}>{studentData?.role}</Text>
          </View>
        </View>


        {/* View Profile Details Button */}
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => {
            setSelectedProfile(studentData); // ✅ pass data here
            setProfileModalVisible(true);
          }}
        >
          <MaterialCommunityIcons name="eye-outline" size={20} color="#2196F3" />
          <Text style={styles.viewProfileText}>View Profile Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </View>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
            <View style={styles.closeIon}>
              <MaterialIcons name="close" size={24} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profile Info</Text>
            </View>

            {selectedProfile && (
              <View style={styles.modalContent}>
                <View style={styles.modalTitan}>
                  <Image
                    source={{ uri: selectedProfile.avatar }}
                    style={styles.modalProfileImage}
                  />
                  <Text style={styles.modalName}>{selectedProfile.name}</Text>
                  {/* <Text style={styles.profileRole}>{selectedProfile.role}</Text> */}
                </View>

                {/* Email */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>{selectedProfile.email}</Text>
                </View>

                {/* Phone */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>{selectedProfile.phone}</Text>
                </View>

                {/* DOB */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>{selectedProfile.dob}</Text>
                </View>

                {/* Gender */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>{selectedProfile.gender}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f4f6',
    flex: 1,
    padding: 16,

  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  closeIon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    margin: 10,
    marginLeft: '70%',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileSection: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#111827',
    marginBottom: -4,
  },
  profileRole: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    fontWeight: 500,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  viewProfileText: {
    fontSize: 16,
    color: '#2196F3',
    marginLeft: 8,
    fontFamily: 'Inter_500Medium',
  },
  menuCard: {
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    marginLeft: 16,
  },
  expandableContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  expandableContentText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#f44336',
    marginLeft: 16,
    fontFamily: 'Inter_500Medium',
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_500Medium', },
  infoRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  infoText: { marginLeft: 8, },
  modalProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 8,
    marginBottom: 4,
  },
  modalTitan: { flexDirection: 'row', marginTop: 12 },
  modalName: { fontSize: 16, fontFamily: 'Inter_500Medium', padding: 8, lineHeight: 24 },
  mainPage: { borderRadius: 16, backgroundColor: '#fff', },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 40
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    flex: 1,
  },
  logoutTitle: {
    color: '#ff4444',
  },
});