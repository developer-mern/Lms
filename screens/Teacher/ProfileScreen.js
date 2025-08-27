import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
 
import { MaterialIcons, MaterialIconsOutlined } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../../Context/authContext';
 
export default function ProfileScreen() {
  const { logout } = useAuth();
  const teacherData = {
    name: "Teacher Name",
    role: "Teacher",
    avatar: "https://via.placeholder.com/60x60/cccccc/666666?text=P",
    email: "abcd@email.com",
    phone: "0123456789",
    dob: "DD/MM/YYYY",
    gender: "Male",
  };
 
  const children = [
    {
      id: 1,
      name: "Child Name",
      class: "X-A",
      school: "New English School, Pune",
      avatar: "https://via.placeholder.com/40x40/e8f5e8/4caf50?text=C",
    },
    {
      id: 2,
      name: "Child Name",
      class: "X-A",
      tuition: "NA",
      avatar: "https://via.placeholder.com/40x40/e3f2fd/2196f3?text=C",
    },
    {
      id: 3,
      name: "Child Name",
      class: "X-A",
      tuition: "NA",
      avatar: "https://via.placeholder.com/40x40/fff3e0/ff9800?text=C",
    },
  ];
 
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [teacherExpanded, setTeacherExpanded] = useState(true);
  const [parentExpanded, setParentExpanded] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
 
  const toggleTeacher = () => {
    setTeacherExpanded(prev => !prev);
    if (!teacherExpanded) {
      setParentExpanded(false); // close parent if teacher is opened
    }
  };
 
  const toggleParent = () => {
    setParentExpanded(prev => !prev);
    if (!parentExpanded) {
      setTeacherExpanded(false); // close teacher if parent is opened
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Parent Profile Header */}
      <View style={styles.Topheader}>
        {/* View Profile Details Button */}
        <View style={styles.profileHeader}>
          <Image
            source={teacherData.avatar}
            style={styles.modalProfileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Teacher Name</Text>
            <Text style={styles.profileRole}>Teacher</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileDetailsBtn}
          onPress={() => {
            setSelectedProfile(teacherData); // ✅ pass data here
            setProfileModalVisible(true);
          }}>
          <Svg width={16} height={16} viewBox="0 0 17 16" fill="none">
            <Path
              d="M8.49984 10.6666C9.33317 10.6666 10.0415 10.375 10.6248 9.79163C11.2082 9.20829 11.4998 8.49996 11.4998 7.66663C11.4998 6.83329 11.2082 6.12496 10.6248 5.54163C10.0415 4.95829 9.33317 4.66663 8.49984 4.66663C7.6665 4.66663 6.95817 4.95829 6.37484 5.54163C5.7915 6.12496 5.49984 6.83329 5.49984 7.66663C5.49984 8.49996 5.7915 9.20829 6.37484 9.79163C6.95817 10.375 7.6665 10.6666 8.49984 10.6666ZM8.49984 9.46663C7.99984 9.46663 7.57484 9.29163 7.22484 8.94163C6.87484 8.59163 6.69984 8.16663 6.69984 7.66663C6.69984 7.16663 6.87484 6.74163 7.22484 6.39163C7.57484 6.04163 7.99984 5.86663 8.49984 5.86663C8.99984 5.86663 9.42484 6.04163 9.77484 6.39163C10.1248 6.74163 10.2998 7.16663 10.2998 7.66663C10.2998 8.16663 10.1248 8.59163 9.77484 8.94163C9.42484 9.29163 8.99984 9.46663 8.49984 9.46663ZM8.49984 12.6666C6.87761 12.6666 5.39984 12.2138 4.0665 11.3083C2.73317 10.4027 1.7665 9.18885 1.1665 7.66663C1.7665 6.1444 2.73317 4.93052 4.0665 4.02496C5.39984 3.1194 6.87761 2.66663 8.49984 2.66663C10.1221 2.66663 11.5998 3.1194 12.9332 4.02496C14.2665 4.93052 15.2332 6.1444 15.8332 7.66663C15.2332 9.18885 14.2665 10.4027 12.9332 11.3083C11.5998 12.2138 10.1221 12.6666 8.49984 12.6666ZM8.49984 11.3333C9.75539 11.3333 10.9082 11.0027 11.9582 10.3416C13.0082 9.68051 13.8109 8.78885 14.3665 7.66663C13.8109 6.5444 13.0082 5.65274 11.9582 4.99163C10.9082 4.33051 9.75539 3.99996 8.49984 3.99996C7.24428 3.99996 6.0915 4.33051 5.0415 4.99163C3.9915 5.65274 3.18873 6.5444 2.63317 7.66663C3.18873 8.78885 3.9915 9.68051 5.0415 10.3416C6.0915 11.0027 7.24428 11.3333 8.49984 11.3333Z"
              fill={'#4A90E2'}
            />
          </Svg>
          <Text style={styles.profileDetailsText}>View Profile Details</Text>
        </TouchableOpacity>
 
        {/* Popup Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => setProfileModalVisible(false)}
        >
 
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
              <View style={styles.closeIon}><MaterialIcons name="close" size={24} color="#000" /></View>
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
 
                  </View>
                  <View style={styles.infoRow}>
                    <Svg width={16} height={16} viewBox="0 0 14 8" fill="none">
                      <Path
                        d="M1.66634 11.3333C1.29967 11.3333 0.985786 11.2028 0.724675 10.9417C0.463563 10.6806 0.333008 10.3667 0.333008 10V2C0.333008 1.63333 0.463563 1.31944 0.724675 1.05833C0.985786 0.797223 1.29967 0.666667 1.66634 0.666667H12.333C12.6997 0.666667 13.0136 0.797223 13.2747 1.05833C13.5358 1.31944 13.6663 1.63333 13.6663 2V10C13.6663 10.3667 13.5358 10.6806 13.2747 10.9417C13.0136 11.2028 12.6997 11.3333 12.333 11.3333H1.66634ZM6.99967 6.66667L1.66634 3.33333V10H12.333V3.33333L6.99967 6.66667ZM6.99967 5.33333L12.333 2H1.66634L6.99967 5.33333ZM1.66634 3.33333V2V10V3.33333Z" fill="#666666"
                      />
                    </Svg>
 
 
                    <Text style={styles.infoText}>{selectedProfile.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
 
                    >
                      <Path
                        d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.52.73 3.88.73.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C11.85 21 3 12.15 3 3.5 3 2.95 3.45 2.5 4 2.5H7.5c.55 0 1 .45 1 1 0 1.36.25 2.68.73 3.88.1.26.03.56-.21 1.11l-2.2 2.2z"
                        fill="#666666"
                      />
                    </Svg>
                    <Text style={styles.infoText}>{selectedProfile.phone}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
 
                    >
                      <Path
                        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
                        fill="#666666"
                      />
                    </Svg>
                    <Text style={styles.infoText}>{selectedProfile.dob}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
 
                    >
                      <Path
                        d="M12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 7c2.76 0 5 2.24 5 5v4h-2v5h-6v-5H7v-4c0-2.76 2.24-5 5-5z"
                        fill="#666666"
                      />
                    </Svg>
                    <Text style={styles.infoText}>{selectedProfile.gender}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
 
        <View style={styles.mainsection}>
          {/* Teacher Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.sectionHeader,
                teacherExpanded && styles.sectionHeaderActive
              ]}
              onPress={toggleTeacher}
            >
              <View
                // source={{ uri: 'https://via.placeholder.com/40x40/8BC34A/FFFFFF?text=C' }}
                style={styles.childImage}
              ></View>
              <Text style={styles.sectionTitle}>Teacher</Text>
              <MaterialIcons
                name={teacherExpanded ? "expand-less" : "expand-more"}
                size={24}
                color="#666"
                style={styles.expandIcon}
              />
            </TouchableOpacity>
 
            {teacherExpanded && (
              <>
                {/* Teacher Subjects */}
                <View style={styles.subjectItem}>
                  <View
                    // source={{ uri: 'https://via.placeholder.com/40x40/8BC34A/FFFFFF?text=C' }}
                    style={styles.childImage}
                  ></View>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectText}>Subject name: <Text style={styles.boldText}>English</Text></Text>
                    <Text style={styles.subjectText}>School name: <Text style={styles.boldText}>New english school, Pune</Text></Text>
                  </View>
                </View>
 
                <View style={styles.subjectItem}>
                  <View
                    // source={{ uri: 'https://via.placeholder.com/40x40/8BC34A/FFFFFF?text=C' }}
                    style={styles.childImage}
                  ></View>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectText}>Subject name: <Text style={styles.boldText}>Geography</Text></Text>
                    <Text style={styles.subjectText}>Institute name: <Text style={styles.boldText}>NA</Text></Text>
                  </View>
                </View>
 
                {/* Add Account Button */}
                <TouchableOpacity style={styles.addAccountButton} onPress={() => alert('Add Teacher Account')}>
                  <Text style={styles.addAccountText}>+ Add Teacher Account</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
 
          {/* Parent Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.sectionHeader1,
                parentExpanded && styles.sectionHeaderActive1
              ]}
              onPress={toggleParent}
            >
              <View
                // source={{ uri: 'https://via.placeholder.com/40x40/8BC34A/FFFFFF?text=C' }}
                style={styles.childImage}
              ></View>
              <Text style={styles.sectionTitle1}>Parent</Text>
              <MaterialIcons
                name={parentExpanded ? "expand-less" : "expand-more"}
                size={24}
                color="#666"
                style={styles.expandIcon}
              />
            </TouchableOpacity>
 
            {parentExpanded && (
              <>
                {/* Parent Children */}
                <View style={styles.childItem1}>
                  <View
                    // source={{ uri: 'https://via.placeholder.com/40x40/8BC34A/FFFFFF?text=C' }}
                    style={styles.childImage}
                  ></View>
                  <View style={styles.childInfo}>
                    <Text style={styles.childText}>Child name: <Text style={styles.boldText}>Child Name</Text></Text>
                    <Text style={styles.childText}>Class: <Text style={styles.boldText}>X-A</Text></Text>
                    <Text style={styles.childText}>School name: <Text style={styles.boldText}>New english school, Pune</Text></Text>
                  </View>
                </View>
 
                {/* Add Account Button */}
                <TouchableOpacity style={styles.addAccountButton} onPress={() => alert('Add Parent Account')}>
                  <Text style={styles.addAccountText}>+ Add Parent Account</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
 
      {/* Bottom Menu Section */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Svg width={20} height={19} viewBox="0 0 20 19" fill="none">
            <Path
              d="M2 19C1.45 19 0.979167 18.8042 0.5875 18.4125C0.195833 18.0208 0 17.55 0 17V6C0 5.45 0.195833 4.97917 0.5875 4.5875C0.979167 4.19583 1.45 4 2 4H6V2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V17C20 17.55 19.8042 18.0208 19.4125 18.4125C19.0208 18.8042 18.55 19 18 19H2ZM2 17H18V6H2V17ZM8 4H12V2H8V4Z"
              fill="#3B82F6"
            />
          </Svg>
          <Text style={styles.menuText}>Professional Info</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.menuItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.8 10.95L10.95 8.775L9.55 7.35L8.45 8.45L7.05 7.05L8.125 5.95L7 4.825L4.825 7L8.8 10.95ZM17 19.175L19.175 17L18.05 15.875L16.95 16.95L15.55 15.55L16.625 14.45L15.2 13.05L13.05 15.2L17 19.175ZM7.25 21H3V16.75L7.375 12.375L2 7L7 2L12.4 7.4L16.175 3.6C16.375 3.4 16.6 3.25 16.85 3.15C17.1 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.875 3.4 19.075 3.6L20.4 4.95C20.6 5.15 20.75 5.375 20.85 5.625C20.95 5.875 21 6.13333 21 6.4C21 6.66667 20.95 6.92083 20.85 7.1625C20.75 7.40417 20.6 7.625 20.4 7.825L16.625 11.625L22 17L17 22L11.625 16.625L7.25 21ZM5 19H6.4L16.2 9.225L14.775 7.8L5 17.6V19Z"
              fill="#3B82F6"
            />
          </Svg>
          <Text style={styles.menuText}>Teaching Tool</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.menuItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M12 13C11.0167 13 10.1875 12.6625 9.5125 11.9875C8.8375 11.3125 8.5 10.4833 8.5 9.5C8.5 8.51667 8.8375 7.6875 9.5125 7.0125C10.1875 6.3375 11.0167 6 12 6C12.9833 6 13.8125 6.3375 14.4875 7.0125C15.1625 7.6875 15.5 8.51667 15.5 9.5C15.5 10.4833 15.1625 11.3125 14.4875 11.9875C13.8125 12.6625 12.9833 13 12 13ZM12 11C12.4333 11 12.7917 10.8583 13.075 10.575C13.3583 10.2917 13.5 9.93333 13.5 9.5C13.5 9.06667 13.3583 8.70833 13.075 8.425C12.7917 8.14167 12.4333 8 12 8C11.5667 8 11.2083 8.14167 10.925 8.425C10.6417 8.70833 10.5 9.06667 10.5 9.5C10.5 9.93333 10.6417 10.2917 10.925 10.575C11.2083 10.8583 11.5667 11 12 11ZM12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 4.125L6 6.375V11.1C6 12 6.125 12.875 6.375 13.725C6.625 14.575 6.96667 15.375 7.4 16.125C8.1 15.775 8.83333 15.5 9.6 15.3C10.3667 15.1 11.1667 15 12 15C12.8333 15 13.6333 15.1 14.4 15.3C15.1667 15.5 15.9 15.775 16.6 16.125C17.0333 15.375 17.375 14.575 17.625 13.725C17.875 12.875 18 12 18 11.1V6.375L12 4.125ZM12 17C11.4 17 10.8167 17.0667 10.25 17.2C9.68333 17.3333 9.14167 17.5167 8.625 17.75C9.10833 18.25 9.63333 18.6833 10.2 19.05C10.7667 19.4167 11.3667 19.7 12 19.9C12.6333 19.7 13.2333 19.4167 13.8 19.05C14.3667 18.6833 14.8917 18.25 15.375 17.75C14.8583 17.5167 14.3167 17.3333 13.75 17.2C13.1833 17.0667 12.6 17 12 17Z"
              fill="#3B82F6" />
          </Svg>
          <Text style={styles.menuTextGray}>Account & security</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.menuItem}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M5 15C4.16667 15 3.45833 14.7083 2.875 14.125C2.29167 13.5417 2 12.8333 2 12C2 11.1667 2.29167 10.4583 2.875 9.875C3.45833 9.29167 4.16667 9 5 9H19C19.8333 9 20.5417 9.29167 21.125 9.875C21.7083 10.4583 22 11.1667 22 12C22 12.8333 21.7083 13.5417 21.125 14.125C20.5417 14.7083 19.8333 15 19 15H5ZM14 13H19C19.2833 13 19.5208 12.9042 19.7125 12.7125C19.9042 12.5208 20 12.2833 20 12C20 11.7167 19.9042 11.4792 19.7125 11.2875C19.5208 11.0958 19.2833 11 19 11H14V13Z" fill="#3B82F6" />
          </Svg>
          <Text style={styles.menuTextGray}>App preferences</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.menuItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 22L11.75 19H11.5C9.13333 19 7.125 18.175 5.475 16.525C3.825 14.875 3 12.8667 3 10.5C3 8.13333 3.825 6.125 5.475 4.475C7.125 2.825 9.13333 2 11.5 2C12.6833 2 13.7875 2.22083 14.8125 2.6625C15.8375 3.10417 16.7375 3.7125 17.5125 4.4875C18.2875 5.2625 18.8958 6.1625 19.3375 7.1875C19.7792 8.2125 20 9.31667 20 10.5C20 11.75 19.7958 12.95 19.3875 14.1C18.9792 15.25 18.4208 16.3167 17.7125 17.3C17.0042 18.2833 16.1625 19.175 15.1875 19.975C14.2125 20.775 13.15 21.45 12 22ZM14 18.35C15.1833 17.35 16.1458 16.1792 16.8875 14.8375C17.6292 13.4958 18 12.05 18 10.5C18 8.68333 17.3708 7.14583 16.1125 5.8875C14.8542 4.62917 13.3167 4 11.5 4C9.68333 4 8.14583 4.62917 6.8875 5.8875C5.62917 7.14583 5 8.68333 5 10.5C5 12.3167 5.62917 13.8542 6.8875 15.1125C8.14583 16.3708 9.68333 17 11.5 17H14V18.35ZM11.475 15.975C11.7583 15.975 12 15.875 12.2 15.675C12.4 15.475 12.5 15.2333 12.5 14.95C12.5 14.6667 12.4 14.425 12.2 14.225C12 14.025 11.7583 13.925 11.475 13.925C11.1917 13.925 10.95 14.025 10.75 14.225C10.55 14.425 10.45 14.6667 10.45 14.95C10.45 15.2333 10.55 15.475 10.75 15.675C10.95 15.875 11.1917 15.975 11.475 15.975ZM10.75 12.8H12.25C12.25 12.3 12.3 11.95 12.4 11.75C12.5 11.55 12.8167 11.1833 13.35 10.65C13.65 10.35 13.9 10.025 14.1 9.675C14.3 9.325 14.4 8.95 14.4 8.55C14.4 7.7 14.1125 7.0625 13.5375 6.6375C12.9625 6.2125 12.2833 6 11.5 6C10.7667 6 10.15 6.20417 9.65 6.6125C9.15 7.02083 8.8 7.51667 8.6 8.1L10 8.65C10.0833 8.36667 10.2417 8.0875 10.475 7.8125C10.7083 7.5375 11.05 7.4 11.5 7.4C11.95 7.4 12.2875 7.525 12.5125 7.775C12.7375 8.025 12.85 8.3 12.85 8.6C12.85 8.88333 12.7667 9.1375 12.6 9.3625C12.4333 9.5875 12.2333 9.81667 12 10.05C11.4167 10.55 11.0625 10.9458 10.9375 11.2375C10.8125 11.5292 10.75 12.05 10.75 12.8Z"
              fill={'#3B82F6'}
            />
          </Svg>
          <Text style={styles.menuTextGray}>Help & support</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.menuItem1} onPress={logout}>
          <MaterialIcons name="logout" size={24} color="#E74C3C" />
          <Text style={styles.menuTextRed}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
 
  },
  Topheader: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    // marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
    marginTop: -4,
    fontWeight: 500,
    fontFamily: 'Inter_500Medium',
  },
  profileDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 8,
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  profileDetailsText: {
    color: '#4A90E2',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginLeft: 8,
    fontWeight: 500,
  },
  section: {
    // backgroundColor: '#FFFFFF',
    borderRadius: 12,
    // marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  mainsection: {
    // backgroundColor:'#fff',
    // marginBottom:16,
    // padding:16,
    borderWidth: 1,
    marginTop: 16,
    borderColor: '#E5E7EB',
    borderRadius: 16,
  },
  sectionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
  },
  sectionTitle1: {
    flex: 1,
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
  },
  expandIcon: {
    marginLeft: 8,
  },
  addAccountButton: {
    margin: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: 12,
  },
  addAccountText: {
    color: '#3b82f6',
    fontWeight: 500,
    fontSize: 12,
    // marginBottom:10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  sectionHeader1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  sectionHeaderActive: {
    backgroundColor: '#3b82f60d',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,// Active background color
  },
  sectionHeaderActive1: {
    backgroundColor: '#3b82f60d',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,// Active background color
  },
 
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subjectImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
    color: '#333',
  },
  childItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  childItem1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  childImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: "#666"
  },
  childInfo: {
    flex: 1,
  },
  childText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addAccountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
 
  bottomMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    // borderWidth:'90%',
    borderBottomColor: '#F0F0F0',
  },
  menuItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#F0F0F0',
  },
  menuText: {
    fontSize: 16,
    // color: '#4A90E2',
    fontFamily: 'Inter_500Medium',
    marginLeft: 16,
    fontWeight: 500,
  },
  menuTextGray: {
    fontSize: 16,
    color: '#666',
    marginLeft: 16,
  },
  menuTextRed: {
    fontSize: 16,
    color: '#E74C3C',
    fontFamily: 'Inter_500Medium',
    marginLeft: 16,
    fontWeight: 500,
  },
  modalProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 12,
  },
  //  Modal styles
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
  modalTitle: { fontSize: 18, fontFamily: 'Inter_500Medium', fontWeight: 500, },
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
  modalName: { fontSize: 16, fontFamily: 'Inter_500Medium', padding: 8, lineHeight: 24, fontWeight: 500, },
  mainPage: { borderRadius: 16, backgroundColor: '#fff', },
  closeIon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    margin: 10,
    marginLeft: '70%',
  },
 
 
});
 