import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useAuth } from '../../Context/authContext';
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { getMe, getchildrenattendance, getchildrenresult, getchildrensubjects, getchildrentodayclasses, getchildrenupcomingexam } from "../../api/authapi";

export default function StudentDashboard() {
  const { token } = useAuth();
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, excused: 0 });
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        // 📌 Parallel requests
        const [
          examRes,
          classRes,
          subjectRes,
          resultRes,
          attendanceRes,
          userRes
        ] = await Promise.all([
          getchildrenupcomingexam(token),
          getchildrentodayclasses(token),
          getchildrensubjects(token),
          getchildrenresult(token),
          getchildrenattendance(token),
          getMe(token),
        ]);

        // 📌 Set Exams
        if (examRes?.data) setExams(examRes.data);

        // 📌 Set Classes
        if (classRes?.data) setClasses(classRes.data);

        // 📌 Set Subjects
        if (subjectRes?.subjects) setSubjects(subjectRes.subjects);

        // 📌 Set Results
        if (resultRes?.success) setResults(resultRes.data);

        // 📌 Set Attendance + Stats
        if (attendanceRes?.data?.attendance) {
          const attendanceData = attendanceRes.data.attendance;
          setAttendance(attendanceData);

          const present = attendanceData.filter(a => a.status === "PRESENT").length;
          const absent = attendanceData.filter(a => a.status === "ABSENT").length;
          const late = attendanceData.filter(a => a.status === "LATE").length;
          const excused = attendanceData.filter(a => a.status === "EXCUSED").length;

          setStats({ present, absent, late, excused });
        }

        // 📌 Set User
        if (userRes?.data) setUser(userRes.data);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAllData();
  }, [token]);
  const total = stats.present + stats.absent + stats.late + stats.excused;
  const percentage = total > 0 ? Math.round((stats.present / total) * 100) : 0;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBar}>
        <MaterialIcons
          name="search"
          size={24}
          color="#6B7280"
          style={styles.icon}
        />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      <Text style={styles.welcomeText}>Welcome back, Student</Text>
      <Text style={styles.subText}>
        View your assignments and check your class schedule.
      </Text>

      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.profileName}> {user?.name} {user?.surname}</Text>

            <View style={styles.profileRow}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Class:</Text>
                <Text style={styles.value}>{user?.classId?.name}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.label}>Roll No:</Text>
                <Text style={styles.value}>{user?.rollNo}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.label}>Email Id:</Text>
                <Text style={styles.value}>{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.profileButtons}>
          <TouchableOpacity style={styles.outlineBtn}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg width={24} height={24} viewBox="0 0 15 14" fill="none">
                <Path
                  d="M3.39967 10.3999C3.96634 9.96659 4.59967 9.62492 5.29967 9.37492C5.99967 9.12492 6.73301 8.99992 7.49967 8.99992C8.26634 8.99992 8.99967 9.12492 9.69967 9.37492C10.3997 9.62492 11.033 9.96659 11.5997 10.3999C11.9886 9.94436 12.2913 9.4277 12.508 8.84992C12.7247 8.27214 12.833 7.65547 12.833 6.99992C12.833 5.52214 12.3136 4.26381 11.2747 3.22492C10.2358 2.18603 8.97745 1.66659 7.49967 1.66659C6.0219 1.66659 4.76356 2.18603 3.72467 3.22492C2.68579 4.26381 2.16634 5.52214 2.16634 6.99992C2.16634 7.65547 2.27467 8.27214 2.49134 8.84992C2.70801 9.4277 3.01079 9.94436 3.39967 10.3999ZM7.49967 7.66659C6.84412 7.66659 6.29134 7.44159 5.84134 6.99159C5.39134 6.54159 5.16634 5.98881 5.16634 5.33325C5.16634 4.6777 5.39134 4.12492 5.84134 3.67492C6.29134 3.22492 6.84412 2.99992 7.49967 2.99992C8.15523 2.99992 8.70801 3.22492 9.15801 3.67492C9.60801 4.12492 9.83301 4.6777 9.83301 5.33325C9.83301 5.98881 9.60801 6.54159 9.15801 6.99159C8.70801 7.44159 8.15523 7.66659 7.49967 7.66659ZM7.49967 13.6666C6.57745 13.6666 5.71079 13.4916 4.89967 13.1416C4.08856 12.7916 3.38301 12.3166 2.78301 11.7166C2.18301 11.1166 1.70801 10.411 1.35801 9.59992C1.00801 8.78881 0.833008 7.92214 0.833008 6.99992C0.833008 6.0777 1.00801 5.21103 1.35801 4.39992C1.70801 3.58881 2.18301 2.88325 2.78301 2.28325C3.38301 1.68325 4.08856 1.20825 4.89967 0.858252C5.71079 0.508252 6.57745 0.333252 7.49967 0.333252C8.4219 0.333252 9.28856 0.508252 10.0997 0.858252C10.9108 1.20825 11.6163 1.68325 12.2163 2.28325C12.8163 2.88325 13.2913 3.58881 13.6413 4.39992C13.9913 5.21103 14.1663 6.0777 14.1663 6.99992C14.1663 7.92214 13.9913 8.78881 13.6413 9.59992C13.2913 10.411 12.8163 11.1166 12.2163 11.7166C11.6163 12.3166 10.9108 12.7916 10.0997 13.1416C9.28856 13.4916 8.4219 13.6666 7.49967 13.6666ZM7.49967 12.3333C8.08856 12.3333 8.64412 12.2471 9.16634 12.0749C9.68856 11.9027 10.1663 11.6555 10.5997 11.3333C10.1663 11.011 9.68856 10.7638 9.16634 10.5916C8.64412 10.4194 8.08856 10.3333 7.49967 10.3333C6.91079 10.3333 6.35523 10.4194 5.83301 10.5916C5.31079 10.7638 4.83301 11.011 4.39967 11.3333C4.83301 11.6555 5.31079 11.9027 5.83301 12.0749C6.35523 12.2471 6.91079 12.3333 7.49967 12.3333ZM7.49967 6.33325C7.78856 6.33325 8.02745 6.23881 8.21634 6.04992C8.40523 5.86103 8.49967 5.62214 8.49967 5.33325C8.49967 5.04436 8.40523 4.80547 8.21634 4.61659C8.02745 4.4277 7.78856 4.33325 7.49967 4.33325C7.21079 4.33325 6.9719 4.4277 6.78301 4.61659C6.59412 4.80547 6.49967 5.04436 6.49967 5.33325C6.49967 5.62214 6.59412 5.86103 6.78301 6.04992C6.9719 6.23881 7.21079 6.33325 7.49967 6.33325Z"
                  fill="#2563EB"
                />
              </Svg>
              <TouchableOpacity style={styles.activeTabButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={[styles.outlineBtnText, { marginLeft: 6 }]}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Svg width={24} height={24} viewBox="0 0 12 14" fill="none">
                <Path
                  d="M1.33333 13.6666C0.966667 13.6666 0.652778 13.536 0.391667 13.2749C0.130556 13.0138 0 12.6999 0 12.3333V2.99992C0 2.63325 0.130556 2.31936 0.391667 2.05825C0.652778 1.79714 0.966667 1.66659 1.33333 1.66659H2V0.333252H3.33333V1.66659H8.66667V0.333252H10V1.66659H10.6667C11.0333 1.66659 11.3472 1.79714 11.6083 2.05825C11.8694 2.31936 12 2.63325 12 2.99992V12.3333C12 12.6999 11.8694 13.0138 11.6083 13.2749C11.3472 13.536 11.0333 13.6666 10.6667 13.6666H1.33333ZM1.33333 12.3333H10.6667V5.66659H1.33333V12.3333ZM1.33333 4.33325H10.6667V2.99992H1.33333V4.33325ZM2.66667 8.33325V6.99992H9.33333V8.33325H2.66667ZM2.66667 10.9999V9.66659H7.33333V10.9999H2.66667Z"
                  fill="#2563EB"
                />
              </Svg>
              <TouchableOpacity onPress={() => navigation.navigate('Timetable')}>
                <Text style={[styles.outlineBtnText, { marginLeft: 6 }]}>
                  View Timetable
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {["Overview", "Schedule", "Academics", "Notices"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.activeTabButtonText,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Overview" && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Attendance Overview</Text>
            <Text style={styles.attendancePercent}>{percentage}%</Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${percentage}%` }, // dynamic progress
              ]} />
            </View>
            <Text style={styles.smallText}>Overall Attendance</Text>
            <View style={styles.attendanceRow}>
              <View style={styles.attendanceBoxGreen}>
                <Text style={styles.attendanceNumber1}>{stats.present}</Text>
                <Text style={styles.attendenceText1}>Present</Text>
              </View>
              <View style={styles.attendanceBoxRed}>
                <Text style={styles.attendanceNumber2}>{stats.absent}</Text>
                <Text style={styles.attendenceText2}>Absent</Text>
              </View>
              <View style={styles.attendanceBoxYellow}>
                <Text style={styles.attendanceNumber3}>{stats.excused + stats.late}</Text>
                <Text style={styles.attendenceText3}>Leave</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View Detailed Attendance</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>


          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recent Results</Text>
            {results.slice(0, 2).map((item, index) => (
              <View style={styles.resultRow} key={index}>
                <View>
                  <Text style={styles.examName}>{item.title}</Text>
                  <Text style={styles.examSubject}>{item.subject?.name}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  {item.status === "COMPLETED" ? (
                    <Text style={styles.examMarks}>
                      {item.obtainedMarks}/{item.maxMarks}
                    </Text>
                  ) : (
                    <Text style={styles.pendingText}>Pending</Text>
                  )}
                  <Text style={styles.examTime}>
                    {new Date(item.examDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View All Results</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Subject Overview</Text>
            {subjects.map((subject) => (
              <View style={styles.subjectRow} key={subject.id}>
                <Text style={styles.examName}>{subject.name}</Text>
                <Text>
                  <Text style={styles.teacherLabel}>Teacher: </Text>
                  <Text style={styles.teacherName}>
                    {subject.teacherName || "Unassigned Teacher"}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </>
      )}

      {activeTab === "Schedule" && (
        <ScrollView style={styles.container4}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Today’s Class</Text>

            {classes.slice(0, 4).map((cls, index) => {
              // Format time to AM/PM
              const formatTime = (time) => {
                if (!time) return "";
                const [hour, minute] = time.split(":");
                const h = parseInt(hour, 10);
                const ampm = h >= 12 ? "PM" : "AM";
                const formattedHour = h % 12 === 0 ? 12 : h % 12;
                return `${formattedHour}:${minute} ${ampm}`;
              };

              // Determine class status based on current time
              const now = new Date();
              const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
              const currentTime = now.getHours() * 60 + now.getMinutes();
              const startMinutes =
                parseInt(cls.startTime.split(":")[0]) * 60 +
                parseInt(cls.startTime.split(":")[1]);
              const endMinutes =
                parseInt(cls.endTime.split(":")[0]) * 60 +
                parseInt(cls.endTime.split(":")[1]);

              let status = "Upcoming";
              if (cls.day !== currentDay) {
                status = "Upcoming";
              } else if (currentTime >= startMinutes && currentTime <= endMinutes) {
                status = "Ongoing";
              } else if (currentTime > endMinutes) {
                status = "Completed";
              }

              return (
                <View style={styles.classCard} key={cls.id || index}>
                  <View style={styles.classHeader}>
                    <View style={styles.timeBox}>
                      <Text style={styles.classTime}>
                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBox,
                        status === "Completed" && { backgroundColor: "#34C7591A" },
                        status === "Upcoming" && { backgroundColor: "#3B82F61A" },
                        status === "Ongoing" && { backgroundColor: "#DBEAFE" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.classStatus,
                          status === "Completed" && { color: "#16A34A" },
                          status === "Upcoming" && { color: "#2563EB" },
                          status === "Ongoing" && { color: "#1D4ED8" },
                        ]}
                      >
                        {status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.subjectText}>{cls.subject}</Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailText}>Teacher: {cls.teacher}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailText}>Room: {cls.room}</Text>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View All</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
            {exams.map((exam, index) => {
              const examDate = new Date(exam.examDate);
              const month = examDate.toLocaleString("default", { month: "short" }); // e.g., "Aug"
              const day = examDate.getDate(); // e.g., 25

              return (
                <View style={styles.examRow} key={index}>
                  <View style={styles.dateBox}>
                    <Text style={styles.dateDay}>{month}</Text>
                    <Text style={styles.dateNum}>{day}</Text>
                  </View>

                  <View style={styles.examDetails}>
                    <Text style={styles.examName}>{exam.title}</Text>
                    <Text style={styles.examSubject}>{exam.subject?.name || "Unknown Subject"}</Text>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.examBadge}>
                      <Text style={styles.badgeText}>{exam.examType}</Text>
                    </View>
                    <Text style={styles.examTime}>
                      {exam.duration ? `${exam.duration} min` : "60 min"}
                    </Text>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View All Exams</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {activeTab === "Academics" && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Subject Overview</Text>
            {subjects.map((subject) => (
              <View style={styles.subjectRow} key={subject.id}>
                <Text style={styles.examName}>{subject.name}</Text>
                <Text>
                  <Text style={styles.teacherLabel}>Teacher: </Text>
                  <Text style={styles.teacherName}>
                    {subject.teacherName || "Unassigned Teacher"}
                  </Text>
                </Text>
              </View>
            ))}
          </View>

          {/* Recent Results */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recent Results</Text>
            {results.slice(0, 2).map((item, index) => (
              <View style={styles.resultRow} key={index}>
                <View>
                  <Text style={styles.examName}>{item.title}</Text>
                  <Text style={styles.examSubject}>{item.subject?.name}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  {item.status === "COMPLETED" ? (
                    <Text style={styles.examMarks}>
                      {item.obtainedMarks}/{item.maxMarks}
                    </Text>
                  ) : (
                    <Text style={styles.pendingText}>Pending</Text>
                  )}
                  <Text style={styles.examTime}>
                    {new Date(item.examDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View All Results</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Attendance Overview</Text>
            <Text style={styles.attendancePercent}>{percentage}%</Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${percentage}%` }, // dynamic progress
              ]} />
            </View>
            <Text style={styles.smallText}>Overall Attendance</Text>
            <View style={styles.attendanceRow}>
              <View style={styles.attendanceBoxGreen}>
                <Text style={styles.attendanceNumber1}>{stats.present}</Text>
                <Text style={styles.attendenceText1}>Present</Text>
              </View>
              <View style={styles.attendanceBoxRed}>
                <Text style={styles.attendanceNumber2}>{stats.absent}</Text>
                <Text style={styles.attendenceText2}>Absent</Text>
              </View>
              <View style={styles.attendanceBoxYellow}>
                <Text style={styles.attendanceNumber3}>{stats.excused + stats.late}</Text>
                <Text style={styles.attendenceText3}>Leave</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.linkText}>View Detailed Attendance</Text>
              <Svg width="10" height="10" viewBox="0 0 5 8" fill="none">
                <Path
                  d="M3.35033 4L0.666992 1.31667L1.48366 0.5L4.98366 4L1.48366 7.5L0.666992 6.68333L3.35033 4Z"
                  fill="#3B82F6"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </>
      )}

      {activeTab === "Notices" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle1}>School Announcements</Text>
          <Text style={styles.subText1}>
            Latest announcements and notifications
          </Text>

          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Svg width="40" height="40" viewBox="0 0 40 32" fill="none">
              <Path
                d="M32 18V14H40V18H32ZM34.4 32L28 27.2L30.4 24L36.8 28.8L34.4 32ZM30.4 8L28 4.8L34.4 0L36.8 3.2L30.4 8ZM6 30V22H4C2.9 22 1.95833 21.6083 1.175 20.825C0.391667 20.0417 0 19.1 0 18V14C0 12.9 0.391667 11.9583 1.175 11.175C1.95833 10.3917 2.9 10 4 10H12L22 4V28L12 22H10V30H6ZM18 20.9V11.1L13.1 14H4V18H13.1L18 20.9ZM24 22.7V9.3C24.9 10.1 25.625 11.075 26.175 12.225C26.725 13.375 27 14.6333 27 16C27 17.3667 26.725 18.625 26.175 19.775C25.625 20.925 24.9 21.9 24 22.7Z"
                fill="#666666"
              />
            </Svg>
          </View>
          <Text style={styles.noRecordText}>No Record Found</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    padding: 16,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },

  icon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#6B7280",
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    color: "#111827",
  },

  subText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
    marginBottom: 12,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },

  infoItem: {
    marginRight: 40,
    marginTop: 8,
  },

  label: {
    fontSize: 10,
    fontWeight: "400",
    color: "#6B7280",
  },

  value: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },

  profileInfo: {
    color: "#374151",
    fontSize: 14,
  },

  profileButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  outlineBtnText: {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 12,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#dddd",
    borderRadius: 8,
    padding: 2,
    marginTop: 16,
    marginBottom: 0,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  activeTabButton: {
    backgroundColor: "#fff",
  },

  tabButtonText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
    textAlign: "center",
  },

  activeTabButtonText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#111827",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 16,
  },

  attendancePercent: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },

  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 8,
  },

  progressFill: {
    width: "85%",
    height: 6,
    backgroundColor: "#10B981",
    borderRadius: 50,
  },

  smallText: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "400",
  },

  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 16,
  },

  attendanceBoxGreen: {
    flex: 1,
    backgroundColor: "#10B9810D",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 90,
  },

  attendanceBoxRed: {
    flex: 1,
    backgroundColor: "#EF44440D",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 90,
  },

  attendanceBoxYellow: {
    flex: 1,
    backgroundColor: "#F59E0B0D",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 90,
  },

  attendanceNumber1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 2,
  },

  attendanceNumber2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#EF4444",
    marginBottom: 2,
  },

  attendanceNumber3: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F59E0B",
    marginBottom: 2,
  },

  attendenceText1: {
    fontSize: 12,
    fontWeight: "500",
    color: "#10B981",
  },

  attendenceText2: {
    fontSize: 12,
    fontWeight: "500",
    color: "#EF4444",
  },

  attendenceText3: {
    fontSize: 12,
    fontWeight: "500",
    color: "#F59E0B",
  },

  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  linkText: {
    color: "#3B82F6",
    fontWeight: "400",
    fontSize: 10,
    marginRight: 4,
    textDecorationLine: "underline",
  },

  examRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 9,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  dateBox: {
    marginRight: 8,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 13,
    backgroundColor: "#3B82F60D",
  },

  dateDay: {
    fontSize: 10,
    fontWeight: "400",
    color: "#2563EB",
  },

  dateNum: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2563EB",
  },

  examDetails: {
    flex: 1,
  },

  examName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#111827",
  },

  examSubject: {
    fontSize: 12,
    fontWeight: "500",
    color: "#3B82F6",
    paddingTop: 4,
  },

  examBadge: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 2,
    borderRadius: 50,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#111827",
  },

  examTime: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    paddingTop: 4,
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  pendingText: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#F59E0B",
    paddingVertical: 2,
    borderRadius: 50,
    color: "#F59E0B",
    fontWeight: "500",
    fontSize: 11,
  },

  subjectRow: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  teacherLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },

  teacherName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },

  classCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  timeBox: {
    backgroundColor: "#3B82F60D",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  classTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2563EB",
  },

  statusBox: {
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  classStatus: {
    fontSize: 12,
    fontWeight: "500",
  },

  subjectText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
    fontWeight: "400",
  },

  sectionTitle1: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },

  subText1: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },

  noRecordText: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    fontWeight: "400",
  },
});
