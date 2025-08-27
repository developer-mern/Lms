import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Dropdown } from 'react-native-element-dropdown';
import * as Progress from "react-native-progress";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from '../../Context/authContext';
import { getchildrenattendance, getchildrenresult } from "../../api/authapi";
import * as FileSystem from "expo-file-system";

export default function AcademicScreen() {
  const { token } = useAuth();

  const [activeMainTab, setActiveMainTab] = useState('Report');
  const [activeResultTab, setActiveResultTab] = useState('All Results');
  const [searchText, setSearchText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("all");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);


  const [examResults, setExamResults] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {


        // fetch results
        const resultsRes = await getchildrenresult(token);
        const mappedResults = resultsRes.data.map((exam) => ({
          id: exam.id,
          type: exam.examType || "Test",
          title: exam.title,
          subject: exam.subject?.name || "Unknown",
          date: new Date(exam.examDate).toDateString(),
          status: exam.status === "NO_RESULT"
            ? "Pending"
            : exam.status === "COMPLETED" && exam.percentage >= 40
              ? "Passed"
              : exam.status === "COMPLETED"
                ? "Failed"
                : exam.status,
          marks: exam.obtainedMarks !== null
            ? `${exam.obtainedMarks}/${exam.maxMarks}`
            : "Not Graded",
          grade: exam.letterGrade || "N/A",
          statusColor:
            exam.status === "NO_RESULT"
              ? "#f59e0b"
              : exam.percentage >= 40
                ? "#10b981"
                : "#ef4444",
          statusBgColor:
            exam.status === "NO_RESULT"
              ? "#FFCC001A"
              : exam.percentage >= 40
                ? "#10B9811A"
                : "#EF44441A",
        }));
        setExamResults(mappedResults);

        // fetch attendance
        const attendRes = await getchildrenattendance(token);
        const records = attendRes.data.attendance;

        // Store the raw records for filtering and export
        setAttendanceRecords(records);

        const summary = {
          Present: records.filter((r) => r.status === "PRESENT").length,
          Absent: records.filter((r) => r.status === "ABSENT").length,
          Late: records.filter((r) => r.status === "LATE").length,
          Excused: records.filter((r) => r.status === "EXCUSED").length,
        };

        const mappedAttendance = [
          { label: "Present", value: summary.Present, color: "#10B981" },
          { label: "Absent", value: summary.Absent, color: "#EF4444" },
          { label: "Late", value: summary.Late, color: "#F59E0B" },
          { label: "Excused", value: summary.Excused, color: "#3B82F6" },
        ];
        setAttendanceData(mappedAttendance);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const attendanceStats = React.useMemo(() => {
    if (!attendanceRecords.length) {
      return {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        totalDays: 0,
        rate: 0
      };
    }

    const present = attendanceRecords.filter(r => r.status === "PRESENT").length;
    const absent = attendanceRecords.filter(r => r.status === "ABSENT").length;
    const late = attendanceRecords.filter(r => r.status === "LATE").length;
    const excused = attendanceRecords.filter(r => r.status === "EXCUSED").length;
    const totalDays = attendanceRecords.length;
    const rate = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;

    return {
      present,
      absent,
      late,
      excused,
      totalDays,
      rate
    };
  }, [attendanceRecords]);

  const filteredAttendance = React.useMemo(() => {
    if (!attendanceRecords.length) return [];

    // Filter by selected month/year from date picker
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();

    return attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === selectedMonth &&
        recordDate.getFullYear() === selectedYear;
    });
  }, [attendanceRecords, date]);

  // Fix the handleExportAttendance function:
  const handleExportAttendance = async () => {
    if (!attendanceRecords.length) {
      alert("No attendance data to export");
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + "attendance_report.csv";
      let csv = "Date,Status\n";
      attendanceRecords.forEach(r => {
        csv += `${new Date(r.date).toLocaleDateString()},${r.status}\n`;
      });
      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      alert("Attendance report saved at: " + fileUri);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export attendance report");
    }
  };
  const onChange = (event, selectedDate) => {
    setShow(false); // hide picker after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  };



  const academicStats = React.useMemo(() => {
    if (!examResults.length) {
      return [
        { icon: "ClipboardOutline", value: "0", label: "Exams Taken" },
        { icon: "TrendingUp", value: "0%", label: "Passing Rate" },
        { icon: "ChartBar", value: "0.0%", label: "Average score" },
        { icon: "MedalOutline", value: "0.0%", label: "Highest score" }
      ];
    }

    const total = examResults.length;
    const completed = examResults.filter(e => e.status === "Passed" || e.status === "Failed");
    const passed = completed.filter(e => e.status === "Passed");
    const percentages = completed.map(e => {
      const [obtained, max] = e.marks.split("/").map(Number);
      return (obtained / max) * 100;
    });

    const avg = percentages.length ? (percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(1) : 0;
    const highest = percentages.length ? Math.max(...percentages).toFixed(1) : 0;

    return [
      { icon: "ClipboardOutline", value: `${total}`, label: "Exams Taken" },
      { icon: "TrendingUp", value: `${((passed.length / total) * 100).toFixed(0)}%`, label: "Passing Rate" },
      { icon: "ChartBar", value: `${avg}%`, label: "Average score" },
      { icon: "MedalOutline", value: `${highest}%`, label: "Highest score" }
    ];
  }, [examResults]);

  const subjects = React.useMemo(() => {
    const all = examResults.map(e => e.subject).filter(Boolean);
    const unique = [...new Set(all)];
    return [{ label: "All Subjects", value: "all" }, ...unique.map(s => ({ label: s, value: s }))];
  }, [examResults]);


  const examTypes = React.useMemo(() => {
    const all = examResults.map(e => e.type).filter(Boolean);
    const unique = [...new Set(all)];
    return [{ label: "All Exam Types", value: "all" }, ...unique.map(t => ({ label: t, value: t }))];
  }, [examResults]);

  // SVG Icon Components
  const SearchIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 21L16.65 16.65" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const ArrowDownIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const ClipboardOutlineIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.41667 2.4 9.77917 1.91667 10.2875 1.55C10.7958 1.18333 11.3667 1 12 1C12.6333 1 13.2042 1.18333 13.7125 1.55C14.2208 1.91667 14.5833 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19ZM7 17H14V15H7V17ZM7 13H17V11H7V13ZM7 9H17V7H7V9ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25Z"
        fill="#3B82F6"
      />
    </Svg>
  );

  const TrendingUpIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 6H23V12" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const ChartBarIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 20V13H20V20H16ZM10 20V4H14V20H10ZM4 20V9H8V20H4Z"
        fill="#3B82F6"
      />
    </Svg>
  );

  const MedalOutlineIcon = () => (
    <Svg width={24} height={24} viewBox="0 -960 960 960" fill="#3b82f6">
      <Path d="M280-880h400v314q0 23-10 41t-28 29l-142 84 28 92h152l-124 88 48 152-124-94-124 94 48-152-124-88h152l28-92-142-84q-18-11-28-29t-10-41v-314Zm80 80v234l80 48v-282h-80Zm240 0h-80v282l80-48v-234ZM480-647Zm-40-12Zm80 0Z" />
    </Svg>
  );

  const SearchOffIcon = () => (
    <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
      <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 21L16.65 16.65" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15 15L9 9" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const getFilteredResults = () => {
    return examResults.filter(exam => {
      const title = exam.title?.toLowerCase() || "";
      const subject = exam.subject?.toLowerCase() || "";
      const type = exam.type?.toLowerCase() || "";
      const status = exam.status?.toLowerCase() || "";

      const search = searchText.toLowerCase();
      const selectedSub = selectedSubject.toLowerCase();
      const selectedType = selectedExamType.toLowerCase();
      const activeTab = activeResultTab.toLowerCase();

      const matchesSearch =
        title.includes(search) || subject.includes(search);

      const matchesSubject =
        selectedSub === "all" || subject === selectedSub;

      const matchesType =
        selectedType === "all" || type === selectedType;

      const matchesTab =
        activeTab === "all results" || status === activeTab;

      return matchesSearch && matchesSubject && matchesType && matchesTab;
    });
  };


  const renderIcon = (iconName) => {
    switch (iconName) {
      case "ClipboardOutline":
        return <ClipboardOutlineIcon />;
      case "TrendingUp":
        return <TrendingUpIcon />;
      case "ChartBar":
        return <ChartBarIcon />;
      case "MedalOutline":
        return <MedalOutlineIcon />;
      default:
        return null;
    }
  };

  const renderMainTabs = () => (
    <View style={styles.mainTabContainer}>
      {['Report', 'Attendance'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.mainTab,
            activeMainTab === tab ? styles.activeMainTab : styles.inactiveMainTab
          ]}
          onPress={() => setActiveMainTab(tab)}
        >
          <Text style={[
            styles.mainTabText,
            activeMainTab === tab ? styles.activeMainTabText : styles.inactiveMainTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAcademicResults = () => (
    <View style={styles.section1}>
      <Text style={styles.sectionTitle}>Academic results</Text>
      <Text style={styles.sectionSubtitle}>View exam performance and academic records</Text>

      <View style={styles.statsContainer}>
        {academicStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            {renderIcon(stat.icon)}
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSearchAndFilters = () => (
    <View style={styles.section2}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          placeholder="Search exams"
          placeholderTextColor="#6b7280"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        {/* Subject Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Subject</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            data={subjects}
            labelField="label"
            valueField="value"
            placeholder="Select subject"
            value={selectedSubject}
            onChange={item => setSelectedSubject(item.value)}
          />
        </View>

        {/* Exam Type Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Exam Type</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            data={examTypes}
            labelField="label"
            valueField="value"
            placeholder="Select exam type"
            value={selectedExamType}
            onChange={item => setSelectedExamType(item.value)}
          />
        </View>
      </View>

    </View>
  );

  const renderResultTabs = () => (
    <View style={styles.resultTabContainer}>
      {['All Results', 'Passed', 'Failed'].map((tab, index) => (
        <React.Fragment key={tab}>
          <TouchableOpacity
            style={[
              styles.resultTab,
              activeResultTab === tab ? styles.activeResultTab : styles.inactiveResultTab
            ]}
            onPress={() => setActiveResultTab(tab)}
          >
            <Text
              style={[
                styles.resultTabText,
                activeResultTab === tab
                  ? styles.activeResultTabText
                  : styles.inactiveResultTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>

          {/* Vertical divider except for last tab */}
          {index < 2 && <View style={styles.verticalDivider} />}
        </React.Fragment>
      ))}
    </View>
  );

  const renderExamResults = () => {
    const filteredResults = getFilteredResults();

    return (
      <View style={styles.section3}>
        <Text style={styles.sectionTitle1}>Exam Results</Text>

        {filteredResults.map((exam) => (
          <View key={exam.id} style={styles.examCard}>
            <View style={styles.examHeader}>
              <View>
                <Text style={styles.examType}>{exam.type}</Text>
                <Text style={styles.examTitle}>{exam.title}</Text>
              </View>
              <View style={styles.examMeta}>
                <Text style={styles.examDate}>{exam.date}</Text>
                <Text style={[styles.examStatus, { color: exam.statusColor, backgroundColor: exam.statusBgColor }]}>
                  {exam.status}
                </Text>
              </View>
            </View>

            <View style={styles.examDetails}>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Subject</Text>
                <Text style={styles.examDetailValue}>{exam.subject}</Text>
              </View>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Marks</Text>
                <Text style={styles.examDetailValue}>{exam.marks}</Text>
              </View>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Grade</Text>
                <Text style={styles.examDetailValue}>{exam.grade}</Text>
              </View>
            </View>
          </View>
        ))}

        {filteredResults.length === 0 && (
          <View style={styles.noResults}>
            <SearchOffIcon />
            <Text style={styles.noResultsText}>No exam results found</Text>
          </View>
        )}
      </View>
    );
  };

  const renderPerformanceOverview = () => (
    <View style={styles.section4}>
      <Text style={styles.sectionTitle1}>Performance overview</Text>
      <View style={styles.bottomheader}>
        <TouchableOpacity style={styles.performanceItem}>
          <Text style={styles.performanceText}>Subject Performance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomhead}>
          <Text style={styles.performanceText}>Exam Type Performance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderMainTabs()}

        {activeMainTab === 'Report' && (
          <>
            {renderAcademicResults()}
            {renderSearchAndFilters()}
            {renderResultTabs()}
            {renderExamResults()}
            {renderPerformanceOverview()}
          </>
        )}

        {activeMainTab === "Attendance" && (
          <>
            <View style={styles.attendActive}>
              <Text style={styles.sectionTitleAttend}>Attendance Record</Text>
              <Text style={styles.sectionSubtitleAttend}>
                Monitor your attendance and performance
              </Text>

              {/* ===== Export Report Button ===== */}
              <TouchableOpacity style={styles.exportBtnAttend} onPress={handleExportAttendance}>
                <MaterialIcons name="file-download" size={18} color="#2563EB" />
                <Text style={styles.exportTextAttend}>Export Report</Text>
              </TouchableOpacity>

              {/* ===== Summary Cards ===== */}
              <View style={styles.cardBoxAttend}>
                <View style={styles.gridAttend}>
                  {/* First Row */}
                  <View style={styles.cardRowAttend}>
                    {/* Attendance Rate */}
                    <View style={[styles.cardAttend, { backgroundColor: "#F5F9FF" }]}>
                      <Text style={styles.cardValueAttend}>
                        {attendanceStats.rate}%
                      </Text>
                      <View style={styles.progressWrapperAttend}>
                        <Progress.Bar
                          progress={attendanceStats.rate / 100}
                          width={125}
                          height={4}
                          color="#10B981"
                          borderWidth={0}
                          unfilledColor="#E5E7EB"
                          style={{ borderRadius: 4 }}
                        />
                      </View>
                      <Text style={styles.cardLabel1Attend}>Attendance Rate</Text>
                    </View>

                    {/* Late / Excused */}
                    <View style={[styles.cardAttend, { backgroundColor: "#FFFAF3" }]}>
                      <MaterialIcons
                        name="schedule"
                        size={24}
                        color="#F59E0B"
                        style={styles.cardIconAttend}
                      />
                      <Text style={styles.cardValueAttend}>{attendanceStats.late}</Text>
                      <Text style={styles.cardLabelAttend}>Late / Excused</Text>
                    </View>
                  </View>

                  {/* Second Row */}
                  <View style={styles.cardRowAttend}>
                    {/* Present */}
                    <View style={[styles.cardAttend, { backgroundColor: "#F3FBF9" }]}>
                      <MaterialIcons
                        name="check-circle-outline"
                        size={24}
                        color="#10B981"
                        style={styles.cardIconAttend}
                      />
                      <Text style={styles.cardValueAttend}>{attendanceStats.present}</Text>
                      <Text style={styles.cardLabelAttend}>Present</Text>
                    </View>

                    {/* Absent */}
                    <View style={[styles.cardAttend, { backgroundColor: "#FEF6F6" }]}>
                      <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={24}
                        color="#EF4444"
                        style={styles.cardIconAttend}
                      />
                      <Text style={styles.cardValueAttend}>{attendanceStats.absent}</Text>
                      <Text style={styles.cardLabelAttend}>Absent</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* ===== Attendance History ===== */}
              <View style={styles.historyBoxAttend}>
                <View style={styles.historyHeaderAttend}>
                  <Text style={styles.sectionTitle1Attend}>Attendance History</Text>
                  <TouchableOpacity
                    style={styles.dateBtnAttend}
                    onPress={() => setShow(true)}
                  >
                    <MaterialIcons name="calendar-month" size={16} color="#2563EB" />
                    <Text style={styles.dateBtnTextAttend}>
                      {date ? date.toDateString() : "Select Date"}
                    </Text>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={onChange}
                    />
                  )}
                </View>

              {filteredAttendance.length > 0 ? (
  <ScrollView style={styles.historyScrollAttend} showsVerticalScrollIndicator={false}>
    {filteredAttendance.map((record, i) => {
      const statusColors = {
        "PRESENT": { bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
        "ABSENT": { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
        "LATE": { bg: "#FFFBEB", color: "#D97706", border: "#FED7AA" },
        "EXCUSED": { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" }
      };
      
      const statusStyle = statusColors[record.status] || statusColors["ABSENT"];
      
      return (
        <View key={i} style={styles.historyItemAttend}>
          <View style={styles.historyContentAttend}>
            <View style={styles.historyLeftAttend}>
              <View style={[styles.statusDotAttend, { backgroundColor: statusStyle.color }]} />
              <View>
                <Text style={styles.historyDateAttend}>
                  {new Date(record.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
                <Text style={styles.historyFullDateAttend}>
                  {new Date(record.date).getFullYear()}
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.statusBadgeAttend, 
              { 
                backgroundColor: statusStyle.bg, 
                borderColor: statusStyle.border 
              }
            ]}>
              <Text style={[
                styles.historyStatusAttend,
                { color: statusStyle.color }
              ]}>
                {record.status}
              </Text>
            </View>
          </View>
          
          {i < filteredAttendance.length - 1 && <View style={styles.historyDividerAttend} />}
        </View>
      );
    })}
  </ScrollView>
) : (
  <View style={styles.noRecordAttend}>
    <View style={styles.noRecordIconContainerAttend}>
      <MaterialIcons name="event-busy" size={48} color="#9CA3AF" />
    </View>
    <Text style={styles.noRecordTextAttend}>No Records Found</Text>
    <Text style={styles.noRecordSubTextAttend}>
      No attendance records available for{" "}
      <Text style={styles.noRecordDateAttend}>
        {date ? date.toLocaleString("default", { month: "long", year: "numeric" }) : "this month"}
      </Text>
    </Text>
    <View style={styles.noRecordSuggestionAttend}>
      <Text style={styles.noRecordSuggestionTextAttend}>
        Try selecting a different month or check back later
      </Text>
    </View>
  </View>
)}
              </View>

              {/* ===== Attendance Statistics ===== */}
              <View style={styles.statsBoxAttend}>
                <Text style={styles.headerTitleAttend}>Attendance Statistics</Text>

                {/* Top Row Stats */}
                <View style={styles.statsRowAttend}>
                  <View style={styles.statItemAttend}>
                    <Text style={styles.statsValueAttend}>
                      {attendanceStats.totalDays}
                    </Text>
                    <Text style={styles.statsLabelAttend}>Total School Days</Text>
                  </View>
                  <View style={styles.statItemAttend}>
                    <Text
                      style={[styles.statsValueAttend, { color: "#2563EB" }]}
                    >
                      {attendanceStats.rate}%
                    </Text>
                    <Text style={styles.statsLabelAttend}>Attendance Rate</Text>
                  </View>
                </View>

                <View style={styles.dividerAttend} />

                {/* Overview */}
                <Text style={styles.sectionTitle2Attend}>Attendance Overview</Text>
                <Text style={styles.sectionSubtitle2Attend}>
                  Monthly Attendance Summary
                </Text>

                {/* Progress by Status */}
                <View style={styles.progressContainerAttend}>
                  {[
                    { label: "Present", value: attendanceStats.present, color: "#10B981" },
                    { label: "Absent", value: attendanceStats.absent, color: "#EF4444" },
                    { label: "Late/Excused", value: attendanceStats.late, color: "#F59E0B" },
                  ].map((item, index) => (
                    <View key={index} style={styles.progressRowAttend}>
                      <View style={styles.progressHeaderAttend}>
                        <Text style={styles.progressLabelAttend}>{item.label}</Text>
                        <Text
                          style={[
                            styles.progressValueAttend,
                            { color: item.color },
                          ]}
                        >
                          {item.value} days
                        </Text>
                      </View>
                      <View style={styles.progressBarAttend}>
                        <View
                          style={[
                            styles.progressFillAttend,
                            {
                              width: `${(item.value / attendanceStats.totalDays) * 100}%`,
                              backgroundColor: item.color,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
   historyScrollAttend: {
    maxHeight: 400,
    marginTop: 12,
  },
  
  historyItemAttend: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  historyContentAttend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  
  historyLeftAttend: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  statusDotAttend: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  
  historyDateAttend: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  
  historyFullDateAttend: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  
  statusBadgeAttend: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  
  historyStatusAttend: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  
  historyDividerAttend: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 36,
  },
  
  // Enhanced No Record styles
  noRecordAttend: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
  },
  
  noRecordIconContainerAttend: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  
  noRecordTextAttend: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  noRecordSubTextAttend: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  
  noRecordDateAttend: {
    fontWeight: '600',
    color: '#2563EB',
  },
  
  noRecordSuggestionAttend: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  
  noRecordSuggestionTextAttend: {
    fontSize: 12,
    color: '#2563EB',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 16
  },
  mainTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 2,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  activeMainTab: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  inactiveMainTab: {
    backgroundColor: 'transparent',
  },
  mainTabText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  activeMainTabText: {
    color: '#1f2937',
  },
  inactiveMainTabText: {
    color: '#6b7280',
  },
  section: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    // padding: 16,
  },
  section1: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section2: {
    backgroundColor: '#f2f4f6',
    borderRadius: 16,
    paddingVertical: 16,
  },
  section3: {
    borderRadius: 16,
    paddingVertical: 16,
  },
  section4: {
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: -27,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    color: '#111827',
  },
  sectionTitle1: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    color: '#111827',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: '#6b7280',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#3B82F60D',
    borderRadius: 8,
    padding: 8,
    width: '48%',
    marginBottom: 16,

  },
  statValue: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    fontWeight: '600',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: -16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: {
    flex: 0.47,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: '#1f2937',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    marginBottom: 12,
    paddingLeft: 16,
  },
  picker: {
    color: '#6B7280',
  },
  pickerIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
  dropdown: {
    // height: 65,
    backgroundColor: "#fff",
    borderColor: '#E5E7EB',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 16,
    // paddingVertical:1,
    height: 55,

  },
  placeholder: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: '#9CA3AF',
  },
  selectedText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: '#111827',
  },

  resultTabContainer: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  resultTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  activeResultTab: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000000",
    paddingHorizontal: 2,

    shadowOffset: {
      width: 0,
      height: 3,
    },
    zIndex: 2,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  inactiveResultTab: {
    backgroundColor: "transparent",
  },
  resultTabText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  activeResultTabText: {
    color: "#000000",
  },
  inactiveResultTabText: {
    color: "#555",
  },
  verticalDivider: {
    width: 1,
    height: "40%",
    backgroundColor: "#CCCCCC",
    alignSelf: "center",
    zIndex: 0,
  },

  examCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,

  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  examType: {
    fontSize: 12,
    color: '#111827',
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#E5E7EB',
    borderRadius: 16,
  },
  examTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: '#111827',
  },
  examMeta: {
    alignItems: 'flex-end',
  },
  examDate: {
    fontSize: 12,
    color: '#111827',
    marginBottom: 4,
    fontFamily: "Inter_500Medium",
  },
  examStatus: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    backgroundColor: '#FFCC001A',
    paddingHorizontal: 12,
    borderRadius: 50,
    paddingTop: 2,
    paddingBottom: 5,
    marginTop: 8
  },
  examDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  examDetail: {
    alignItems: 'center',
  },
  examDetailLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: '#6B7280',
    marginBottom: 4,
  },
  examDetailValue: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: '#111827',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: '#6b7280',
    marginTop: 12,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomColor: '#e5e7eb',
  },
  performanceText: {
    fontSize: 16,
    color: '#111827',
    fontFamily: "Inter_500Medium",
  },
  attendanceContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  attendanceText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: '#6b7280',
  },
  bottomheader: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bottomhead: {
    paddingTop: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  containerAttend: {
    padding: 16,
    paddingBottom: 32,
  },
  tabContainerAttend: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 24,
    padding: 2,
  },
  tabAttend: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTabAttend: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabTextAttend: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",
  },
  activeTabTextAttend: {
    color: "#111827",
    fontWeight: "600",
  },
  sectionTitleAttend: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitleAttend: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    marginBottom: 16,
  },

  exportBtnAttend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 20,
    //  height:34,
    width: 155,

  },
  exportTextAttend: {
    marginLeft: 6,
    color: "#2563EB",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    top: -2,

  },

  cardBoxAttend: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  gridAttend: {
    flexDirection: "column",
    gap: 16,
  },
  cardRowAttend: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  cardAttend: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: "flex-start",
    // height: 92,
  },
  cardValueAttend: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
    color: "#111827",
    top: 4
  },
  cardLabelAttend: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    marginTop: -4,
  },
  cardLabel1Attend: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    top: 20,
  },
  cardIconAttend: {
    marginBottom: 6,
  },
  progressWrapperAttend: {
    top: 14,
  },


  historyBoxAttend: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,


  },
  sectionTitle1Attend: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#111827",
    marginBottom: 4,
  },
  historyHeaderAttend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  attendActive: {
    marginVertical: 16,
  },
  dateBtnAttend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 155,
  },
  dateBtnTextAttend: {
    color: "#2563EB",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginLeft: 6,
    top: -1,
  },

  noRecordAttend: {
    alignItems: "center",

  },
  noRecordTextAttend: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#111827",
  },
  noRecordSubTextAttend: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },

  statsBoxAttend: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,

  },
  headerTitleAttend: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#111827",
    marginBottom: 16,
  },
  statsRowAttend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statItemAttend: {

    flex: 1,
  },
  statsValueAttend: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#2563EB",
    marginBottom: 2,

  },
  statsLabelAttend: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",


  },
  dividerAttend: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  sectionTitle2Attend: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle2Attend: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",
    marginBottom: 12,
  },
  progressContainerAttend: {
    marginTop: 5,
    gap: 8,
  },
  progressRowAttend: {
    padding: 4,
  },
  progressHeaderAttend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabelAttend: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",
  },
  progressValueAttend: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  progressBarAttend: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 50,
    overflow: "hidden",
  },
  progressFillAttend: {
    height: "100%",
    borderRadius: 6,
  },
});