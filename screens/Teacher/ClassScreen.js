import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, ScrollView, Dimensions, TextInput, } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { PieChart } from 'react-native-svg-charts';
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { G, Rect, Text as SVGText, Svg, Mask, Path } from "react-native-svg";
import { Button, Menu } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import AttendanceTrendsChart from "../../Components/AttendanceTrendsChart";
import StudentAttendanceTable from "../../Components/StuddentAttendaceTable";
import DropDownPicker from 'react-native-dropdown-picker';

import MoreScreen from "./MoreScreen";
import { Dropdown } from 'react-native-element-dropdown';
import DetailsPopup from "../../Components/ClassDetails";
import StudentsPopup from '../../Components/StudentList'
import { useAuth } from '../../Context/authContext';
import { getMyClassesApi, getMyTeacherClassesApi, getStudentsByClassApi, recordAttendanceApi } from "../../api/authapi";


export default function ClassScreen() {
    const { token } = useAuth();
    const [activeTopTab, setActiveTopTab] = useState("Class");
    const [activeSubTab, setActiveSubTab] = useState("Overview");
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [selectedAttClass, setAttSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState('All Students');
    const screenWidth = Dimensions.get('window').width - 32;
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const [classes, setClasses] = useState([]);
    const [classesTeacher, setTeacherClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    // Date states
    const [classOptions, setClassOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [studentAttendance, setStudentAttendance] = useState({});
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [dateType, setDateType] = useState(null); // "start" or "end"
    const [activePopup, setActivePopup] = useState(null);

    const handleUpdateAttendance = async () => {
        if (!selectedAttClass || !selectedDate) {
            alert("Please select class and date");
            return;
        }

        // Determine final status for each student
        const records = students.map((s) => ({
            studentId: s._id,
            classId: selectedAttClass,
            date: selectedDate,
            status: studentAttendance[s._id] || studentAttendance.global || "PRESENT", // use global if individual not set
        }));

        try {
            const res = await recordAttendanceApi(token, records);
            alert("Attendance updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update attendance");
        }
    };

    const formatClasses = (classesData) => {
        return classesData.map((cls) => ({
            label: cls.name,   // e.g., "III-A"
            value: cls._id,    // e.g., "12"
        }));
    };

    useEffect(() => {
        if (selectedAttClass) {
            getStudentsByClassApi(selectedAttClass, token)
                .then((res) => setStudents(res))
                .catch((err) => console.error(err));
        } else {
            setStudents([]);
        }
    }, [selectedAttClass]);

    useEffect(() => {
        fetchMyClasses(token);
        fetchMyTeacherClasses(token)
    }, [token]);

    const fetchMyClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const classesData = await getMyClassesApi(token);
            setClasses(classesData);
            setClassOptions(formatClasses(classesData));
        } catch (err) {
            setError("Failed to load classes");
        } finally {
            setLoading(false);
        }
    };

    const fetchMyTeacherClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const classesData = await getMyTeacherClassesApi(token);
            setTeacherClasses(classesData);
        } catch (err) {
            setError("Failed to load classes");
        } finally {
            setLoading(false);
        }
    };
    const filteredClasses = classesTeacher.filter((c) => {
        const query = searchQuery.toLowerCase();
        return (
            c.name.toLowerCase().includes(query) ||
            c.grade?.name?.toLowerCase().includes(query) ||
            c.grade?.level?.toString().includes(query)
        );
    });

    const actions = [
        { label: "Present", iconName: 'check', color: "green", value: "PRESENT" },
        { label: "Absent", iconName: 'close', color: "red", value: "ABSENT" },
        { label: "Late", iconName: 'schedule', color: "orange", value: "LATE" },
        { label: "Excused", iconName: 'error', color: "dodgerblue", value: "EXCUSED" },
        { label: "Note", iconName: 'note', color: "#666666", value: "NOTE" },
    ];

    const studentOptions = [
        { label: 'Student 1', value: '1' },
        { label: 'Student 2', value: '2' },
    ];

    // Date confirm handler
    const onDateConfirm = (params) => {
        setDateModalVisible(false);
        if (dateType === 'start') setStartDate(params.date);
        else setEndDate(params.date);
    };

    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = ['Overview', 'By Class', 'Trends', 'Students'];

    // Sample data for the donut chart
    const data = [
        {
            key: 'Present',
            value: 38,
            svg: { fill: '#4CAF50' }, // Green for present
            arc: { outerRadius: '100%', innerRadius: '60%' }
        },
        {
            key: 'Absent',
            value: 25,
            svg: { fill: '#EF4444' }, // Red for absent
            arc: { outerRadius: '100%', innerRadius: '60%' }
        },
        {
            key: 'Excused',
            value: 25,
            svg: { fill: '#3B82F6' }, // Red for absent
            arc: { outerRadius: '100%', innerRadius: '60%' }
        },
        {
            key: 'Late',
            value: 0,
            svg: { fill: '#F59E0B' }, // Red for absent
            arc: { outerRadius: '100%', innerRadius: '60%' }
        }
    ];
    const handleOpenPopup = (type, data) => {
        setActivePopup({ type, data });
    };

    const values = data.map(item => item.value);
    const colors = data.map(item => item.svg.fill);
    const labels = data.map(item => item.key);


    // Add labels above each bar
    const Labels = ({ x, y, bandwidth, data }) => (
        <G>
            {data.map((value, index) => (
                <SVGText
                    key={index}
                    x={x(index) + bandwidth / 2}
                    y={y(value) - 10}
                    fontSize={14}
                    fill="black"
                    alignmentBaseline="middle"
                    textAnchor="middle"
                >
                    {value}
                </SVGText>
            ))}
        </G>
    );

    const renderTabs = () => (
        <View style={styles.tabContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={[
                        styles.tabButton,
                        activeTab === tab && styles.activeTabButton
                    ]}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === tab && styles.activeTabText
                    ]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderChart = () => (
        <View style={styles.chartContainer}>
            <PieChart
                style={styles.chart}
                data={data}
                spacing={0}
                outerRadius={'90%'}
                innerRadius={'60%'}
            />

            {/* Legend */}
            <View style={styles.legend}>
                {data.map((item, index) => (
                    <View style={styles.legendItem} key={index}>
                        <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
                        <Text style={styles.legendText}>{item.key}</Text>
                    </View>
                ))}
            </View>

        </View>
    );

    const renderBar = () => (
        <View style={{ flexDirection: "row", height: 250, padding: 16 }}>
            <YAxis
                data={values}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fontSize: 12, fill: "grey" }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={values}
                    svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                    contentInset={{ top: 20, bottom: 20 }}
                    spacingInner={0.3}
                >
                    <Grid />
                    <Labels />
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: 30 }}
                    data={values}
                    formatLabel={(value, index) => labels[index]}
                    contentInset={{ left: 15, right: 15 }}
                    svg={{ fontSize: 12, fill: "black" }}
                />
            </View>
        </View>
    );
    // Render individual class card
    const renderClassCard = (classItem) => (
           

        <View key={classItem._id} style={styles.card}>
            <View style={styles.cardHeader}>
                {/* Left side */}
                <View style={styles.leftSection}>
                    <Text style={styles.className}>{classItem.name}</Text>
                    <View style={styles.roleTag}>
                        <Text style={styles.roleText}>Class Teacher</Text>
                    </View>
                </View>

                {/* Right side */}
                <View style={styles.studentCount}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Mask
                            id={`mask0_436_5764_${classItem._id}`}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={24}
                            height={24}
                        >
                            <Rect width={24} height={24} fill="#D9D9D9" />
                        </Mask>
                        <G mask={`url(#mask0_436_5764_${classItem._id})`}>
                            <Path
                                d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z"
                                fill="#4B5563"
                            />
                        </G>
                    </Svg>
                    <Text style={styles.countText}>{classItem.studentCount}</Text>
                </View>
            </View>

            <View style={styles.gradeRow}>
                <Text style={styles.gradeText}>Grade : {classItem.gradeName || 'Grade not specified'}</Text>
            </View>

            {/* Subjects */}
            <View style={styles.subjectsRow}>
                {classItem.subjects && classItem.subjects.length > 0 ? (
                    classItem.subjects.map((subject, index) => (
                        <View key={subject._id || subject.id || subject.name} style={styles.subjectTag}>
                            <Text style={styles.subjectText}>{subject.name || subject}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noSubjectsText}>No subjects assigned</Text>
                )}
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => handleOpenPopup('details', classItem)}
                >
                    <MaterialIcons
                        name="visibility"
                        size={24}
                        color="#3B82F6"
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles.outlineButtonText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => handleOpenPopup('students', classItem)}
                >
                    <MaterialIcons
                        name="groups"
                        size={24}
                        color="#3B82F6"
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles.outlineButtonText}>View Students</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    const topTabs = ["Class", "Student", "Attendance"];

    // Different subtabs for each top tab
    const getSubTabs = () => {
        switch (activeTopTab) {
            case "Student":
                return [];
            case "Attendance":
                return ["Attendance", "Attendance Analytics"];
            default:
                return [];
        }
    };

    // Handle top tab change and reset subtab
    const handleTopTabChange = (tab) => {
        setActiveTopTab(tab);
        // Reset to first subtab when changing top tab
        const newSubTabs = getSubTabs();
        if (tab === "Student") setActiveSubTab("List");
        else if (tab === "Attendance") setActiveSubTab("Attendance");
    };

    const statsData = [
        {
            label: 'Total Records',
            value: '05',
            percentage: '36 %',
            iconName: 'trending-up',
            iconColor: '#4A90E2',
            percentageColor: '#4A90E2'
        },
        {
            label: 'Present',
            value: '05',
            percentage: '36 %',
            iconName: 'trending-up',
            iconColor: '#4CAF50',
            percentageColor: '#4CAF50'
        },
        {
            label: 'Absent',
            value: '05',
            percentage: '36 %',
            iconName: 'trending-down',
            iconColor: '#F44336',
            percentageColor: '#F44336'
        },
        {
            label: 'Late',
            value: '05',
            percentage: '36 %',
            iconName: 'trending-up',
            iconColor: '#FF9800',
            percentageColor: '#FF9800'
        }
    ];

    const renderStatItem = (item, index) => (
        <View key={index} style={styles.statItem}>
            <View style={styles.statHeader}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <View style={styles.percentageContainer}>
                    <Ionicons
                        name={item.iconName}
                        size={12}
                        color={item.iconColor}
                        style={styles.trendIcon}
                    />
                    <Text style={[styles.percentage, { color: item.percentageColor }]}>
                        {item.percentage}
                    </Text>
                </View>
            </View>
            <Text style={styles.statValue}>{item.value}</Text>
        </View>
    );

    const currentSubTabs = getSubTabs();

    return (
        <View style={styles.mainContainer} >
            <SafeAreaView style={styles.TabContainer}>
                {/* Top Tabs */}
                <View style={styles.topTabRow}>
                    {topTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => handleTopTabChange(tab)}
                            style={styles.topTabButton}
                        >
                            <Text
                                style={[
                                    styles.topTabText,
                                    activeTopTab === tab && styles.topTabTextActive,
                                ]}
                            >
                                {tab}
                            </Text>
                            {activeTopTab === tab && <View style={styles.underline} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sub Tabs */}
                {currentSubTabs.length > 0 && (
                    <View style={styles.SubTabsContainer}>
                        <View style={styles.subTabRow}>
                            {currentSubTabs.map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveSubTab(tab)}
                                    style={[
                                        styles.subTabButton,
                                        activeSubTab === tab && styles.subTabActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.subTabText,
                                            activeSubTab === tab && styles.subTabTextActive,
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}


                {/* Content Area */}
                <View style={styles.contentContainer}>
                    {/* Class Tab Content */}
                    {activeTopTab === 'Class' &&
                        <View style={styles.mainBlock}>
                            <SafeAreaView>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    {/* Subheading */}
                                    <View style={styles.container1}>
                                        <MaterialIcons
                                            name="school"
                                            size={24}
                                            color="#666666"
                                            style={styles.icon1}
                                        />
                                        <View>
                                            <Text style={styles.subHeading}>Supervised Classes</Text>
                                            <Text style={styles.subDescription}>
                                                Classes where you are the class teacher
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Search Box */}
                                    <View style={styles.searchContainer}>
                                        <MaterialIcons
                                            name="search"
                                            size={24}
                                            color="#6B7280"
                                            style={{ marginLeft: 16, top: 3 }}
                                        />
                                        <TextInput
                                            placeholder="Search classes"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.searchInput}
                                            value={searchQuery}
                                            onChangeText={setSearchQuery} // 🔹 updates search
                                        />
                                    </View>

                                    {/* Loading State */}
                                    {loading && (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="large" color="#3B82F6" />
                                            <Text style={styles.loadingText}>Loading classes...</Text>
                                        </View>
                                    )}

                                    {/* Error State */}
                                    {error && (
                                        <View style={styles.errorContainer}>
                                            <MaterialIcons name="error" size={48} color="#F44336" />
                                            <Text style={styles.errorText}>{error}</Text>
                                            <TouchableOpacity
                                                style={styles.retryButton}
                                                onPress={fetchMyClasses}
                                            >
                                                <Text style={styles.retryButtonText}>Retry</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                    {/* Classes List */}
                                    {!loading && !error && filteredClasses.length === 0 && (
                                        <View style={styles.emptyContainer}>
                                            <MaterialIcons name="school" size={64} color="#9CA3AF" />
                                            <Text style={styles.emptyText}>No classes found</Text>
                                            <Text style={styles.emptySubText}>
                                                {searchQuery
                                                    ? "No classes match your search."
                                                    : "You haven't been assigned to any classes yet."}
                                            </Text>
                                        </View>
                                    )}


                                    {/* Render Class Cards from API */}

                                    {!loading &&
                                        !error &&
                                        filteredClasses.map((classItem) => renderClassCard(classItem))}
                                </ScrollView>
                            </SafeAreaView>

                            {/* Popups */}
                            <DetailsPopup
                                visible={activePopup?.type === 'details'}
                                onClose={() => setActivePopup(null)}
                                classData={activePopup?.data || null}
                            />
                            <StudentsPopup
                                visible={activePopup?.type === 'students'}
                                onClose={() => setActivePopup(null)}
                                students={activePopup?.data?.students || []}
                                className={activePopup?.data?.name}
                                studentCount={activePopup?.data?.studentCount}
                            />
                        </View>
                    }

                    {/* Student Tab Content */}
                    {activeTopTab === 'Student' &&
                        <View style={styles.Morecontainer}>
                            {/* Rocket Icon */}
                            <MaterialIcons name="rocket-launch" size={66} color="#3B82F6" />

                            {/* Title */}
                            <Text style={styles.Moretitle}>Coming Soon</Text>

                            {/* Subtitle */}
                            <Text style={styles.Moresubtitle}>
                                You’ll soon be able to manage and view students directly here.
                            </Text>
                        </View>
                    }
                    {/* {activeTopTab === 'Student' && activeSubTab === 'Performance' &&
                        <View style={styles.content}>
                            <Text style={styles.contentText}>Student Performance Content</Text>
                        </View>
                    } */}

                    {activeTopTab === 'Attendance' && activeSubTab === 'Attendance' && (
                        <FlatList
                            data={students} // your student array from API
                            keyExtractor={(item) => item._id}
                            ListHeaderComponent={() => (
                                <View style={styles.AttandaceContainer}>
                                    {/* Search Bar */}
                                    <View style={styles.searchBar}>
                                        <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                                        <TextInput placeholder="Search" style={{ flex: 1 }} />
                                    </View>

                                    {/* Take Attendance Card */}
                                    <View style={styles.card}>
                                        <Text style={styles.cardTitle}>Take Attendance</Text>
                                        <Text style={styles.cardSubtitle}>
                                            Select a class and date to record attendance
                                        </Text>

                                        <Text style={styles.label}>Class</Text>
                                        <View style={styles.Analysisdropdown}>
                                            <DropDownPicker
                                                open={open}
                                                value={selectedAttClass}
                                                items={classOptions}
                                                setOpen={setOpen}
                                                setValue={setAttSelectedClass}
                                                setItems={setClassOptions}
                                                placeholder="Select Class"
                                            />
                                        </View>

                                        <View style={{ width: '48%', marginBottom: 22 }}>
                                            <Text style={styles.label}>Date</Text>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    borderWidth: 1,
                                                    borderColor: '#ccc',
                                                    padding: 10,
                                                    borderRadius: 8,
                                                }}
                                                onPress={() => setDateModalVisible(true)}
                                            >
                                                <Text style={{ color: selectedDate ? '#000' : '#888' }}>
                                                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                                                </Text>
                                                <MaterialIcons name="calendar-today" size={22} color="#555" />
                                            </TouchableOpacity>

                                            {/* DatePickerModal */}
                                            <DatePickerModal
                                                locale="en-GB"
                                                mode="single"
                                                visible={dateModalVisible}
                                                onDismiss={() => setDateModalVisible(false)}
                                                date={selectedDate}
                                                onConfirm={(dateObject) => {
                                                    if (dateObject?.date) {
                                                        const utcDate = new Date(dateObject.date);
                                                        const localDate = new Date(
                                                            utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
                                                        );
                                                        setSelectedDate(localDate);
                                                    }
                                                    setDateModalVisible(false);
                                                }}
                                            />
                                        </View>

                                        <TouchableOpacity
                                            style={styles.updateButton}
                                            onPress={handleUpdateAttendance} // call API
                                        >
                                            <Text style={styles.updateButtonText}>Update Attendance</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Students Header */}
                                    <Text style={styles.heading}>Students</Text>
                                    <Text style={styles.date}>
                                        {new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </Text>

                                    {/* Global Add Icons (optional, no student reference) */}
                                    <View style={styles.actionsRow1}>
                                        {actions.map((action, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                style={[styles.actionBtn, { backgroundColor: studentAttendance.global === action.value ? action.color + "33" : "#fff" }]}
                                                onPress={() => {
                                                    // Set all students to this action
                                                    const updatedAttendance = {};
                                                    students.forEach(student => {
                                                        updatedAttendance[student._id] = action.value;
                                                    });

                                                    setStudentAttendance(updatedAttendance);

                                                    // Optional: mark which global action is active
                                                    setStudentAttendance(prev => ({ ...updatedAttendance, global: action.value }));
                                                }}
                                            >
                                                <MaterialIcons name={action.iconName} size={22} color={action.color} />
                                                <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>


                                    {/* Table Header */}
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerText}>Roll No</Text>
                                        <Text style={styles.headerText}>Student name</Text>
                                    </View>
                                    <View style={styles.line} />
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerText2}>{item.rollNo}</Text>
                                        <Text style={styles.headerText1}>{item.name}</Text>
                                    </View>

                                    {/* Actions per student */}
                                    <View style={styles.actionsRow}>
                                        {actions.map((action, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                style={[
                                                    styles.actionBtn,
                                                    studentAttendance[item._id] === action.value && { backgroundColor: action.color + "33" }
                                                ]}
                                                onPress={() => {
                                                    setStudentAttendance((prev) => ({
                                                        ...prev,
                                                        [item._id]: action.value
                                                    }));
                                                }}
                                            >
                                                <MaterialIcons name={action.iconName} size={22} color={action.color} />
                                                <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <View style={styles.line} />
                                </View>
                            )}
                        />
                    )}



                    {activeTopTab === 'Attendance' && activeSubTab === 'Attendance Analytics' &&
                        <ScrollView>
                            <View style={styles.Attendancecontainer}>
                                {/* Header */}
                                <Text style={styles.AttendaceTitle}>Filters</Text>
                                <Text style={styles.subtitle}>Customize your attendance analysis</Text>
                                {/* Filter Row */}
                                {/* <View style={styles.dropdownContainer}> */}
                                {/* Row 1 - Dropdowns */}
                                <View style={styles.filterRow}>
                                    <View style={{ width: '47%' }}>
                                        <Text style={styles.label}>Class</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholder}
                                            selectedTextStyle={styles.selectedText}
                                            data={classOptions}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="All classes"
                                            value={selectedClass}
                                            onChange={item => setSelectedClass(item.value)}
                                        />
                                    </View>

                                    <View style={{ width: '47%' }}>
                                        <Text style={styles.label}>Student</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholder}
                                            selectedTextStyle={styles.selectedText}
                                            data={studentOptions}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="All Student"
                                            value={selectedStudents}
                                            onChange={item => setSelectedStudents(item.value)}
                                        />
                                    </View>
                                </View>

                                {/* Row 2 - Dates */}
                                <View style={styles.dateRow}>
                                    <View>
                                        <Text style={styles.label}>Date rang</Text>
                                        <Button
                                            mode="outlined"
                                            icon="calendar"
                                            style={styles.DateInput}
                                            onPress={() => { setDateType('start'); setDateModalVisible(true); }}
                                            labelStyle={{ color: "#6B7280" }}
                                        >
                                            {startDate ? startDate.toLocaleDateString() : 'MM/DD/YYYY'}
                                        </Button>
                                    </View>

                                    <View>
                                        <Text style={styles.label}></Text>
                                        <Button
                                            mode="outlined"
                                            icon="calendar"
                                            style={styles.DateInput}
                                            onPress={() => { setDateType('end'); setDateModalVisible(true); }}
                                            labelStyle={{ color: "#6B7280" }}
                                        >
                                            {endDate ? endDate.toLocaleDateString() : 'MM/DD/YYYY'}
                                        </Button>
                                    </View>
                                </View>

                                {/* Date Picker Modal */}
                                <DatePickerModal
                                    locale="en-GB"
                                    mode="single"
                                    visible={dateModalVisible}
                                    onDismiss={() => setDateModalVisible(false)}
                                    date={dateType === 'start' ? startDate : endDate}
                                    onConfirm={onDateConfirm}
                                />
                                {/* </View> */}
                                <View style={styles.Datacontainer}>

                                    {/* Stats Grid */}
                                    <View style={styles.statsGrid}>
                                        {statsData.map((item, index) => renderStatItem(item, index))}
                                    </View>
                                </View>
                                <View style={styles.donutContainer}>
                                    <Text style={styles.DataHeading}>Attendance Distribution</Text>
                                    <Text style={styles.DataSubHeading}>Overall attendance breakdown for the selected period</Text>
                                    <View style={styles.Tabrow}>{renderTabs()}</View>
                                    {activeTab === 'Overview' && renderChart()}
                                    {activeTab === 'By Class' && renderBar()}
                                    {activeTab === 'Trends' &&
                                        <View style={{ width: '100%' }}>
                                            <AttendanceTrendsChart />
                                        </View>}
                                    {activeTab === 'Students' &&
                                        <View style={{ width: '100%' }}>
                                            <StudentAttendanceTable />
                                        </View>}
                                </View>
                            </View>
                        </ScrollView>
                    }
                </View>
            </SafeAreaView>
        </View >
    );
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F2F4F6',
        paddingTop: 10,
    },
    mainBlock: {
        paddingHorizontal: 16
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 8,
        color: "#111827",
    },
    container1: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    icon1: {
        marginRight: 8,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 16,
    },
    subDescription: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 16,
        fontWeight: "400",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingVertical: 6,
        marginBottom: 16
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#666666",
        fontWeight: "400",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    className: {
        fontSize: 16,
        fontWeight: "500",
        marginRight: 16,
        color: "#000",
    },
    roleTag: {
        backgroundColor: "#E0F2FE",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 50,
    },
    roleText: {
        fontSize: 12,
        color: "#3B82F6",
        fontWeight: "500",
    },
    gradeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingTop: 8,
    },
    gradeText: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "500",
    },
    studentCount: {
        flexDirection: "row",
        alignItems: "center",
    },
    countText: {
        fontSize: 12,
        color: "#6B7280",
        marginLeft: 8,
    },
    subjectsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 16,
    },
    subjectTag: {
        backgroundColor: "#E5E7EB",
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8,
        height: 26,
    },

    subjectText: {
        fontSize: 12,
        color: "#111827",
        fontWeight: "500",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    outlineButton: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#2563EB",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },
    outlineButtonText: {
        color: "#3B82F6",
        fontWeight: "500",
        fontSize: 14,
    },
    AttandaceContainer: {
        flex: 1,
        backgroundColor: "#F2F4F6",
        paddingHorizontal: 16,
    },
    Attendancecontainer: {
        padding: 16,
        borderRadius: 8,
    },
    donutContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    dateRow: {
        flexDirection: 'row',
        marginBottom: 16,
        width: '97%',
        justifyContent: 'space-between'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        minHeight: 40,
    },
    activeTabButton: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '400',
    },
    Tabrow: {
        width: '100%',
        paddingTop: 16,
    },
    DataHeading: {
        textAlign: 'left',
        width: '100%',
        fontSize: 16,
        fontWeight: '500',
        color: '#111827'
    },
    DataSubHeading: {
        textAlign: 'left',
        width: '100%',
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: 13,
        color: '#6B7280'
    },
    activeTabText: {
        color: '#333',
        fontWeight: '500',
    },
    chartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    chart: {
        height: 200,
        width: 200,
    },
    donutContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 16,
    },
    donutOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F44336',
        alignItems: 'center',
        justifyContent: 'center',
        // This creates the red portion
        borderWidth: 20,
        borderColor: '#4CAF50',
    },
    donutInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
    },
    legend: {
        marginTop: 10,
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 50,
        marginRight: 8,
    },
    legendText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    Datacontainer: {
        paddingVertical: 16,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16
    },
    statItem: {
        width: '47%',
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 13,
        color: '#111827',
        fontWeight: '600',
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendIcon: {
        marginRight: 4,
    },
    percentage: {
        fontSize: 12,
        fontWeight: '500',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    AttendaceTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 16,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
        gap: 16
    },
    dropdownContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 8,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    DateInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        width: '105%',
        paddingHorizontal: 5,
        paddingVertical: 4,
        color: '#6B7280',
    },
    dropdownText: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#F2F4F6",
    },
    TabContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    topTabRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        gap: 16
    },
    topTabButton: {
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    topTabText: { fontSize: 16, color: "#666" },
    topTabTextActive: { color: "#007AFF", fontWeight: "bold" },
    underline: {
        height: 2,
        backgroundColor: "#007AFF",
        marginTop: 5,
        width: "100%",
    },
    SubTabsContainer: {
        paddingHorizontal: 16,
    },
    subTabRow: {
        flexDirection: "row",
        backgroundColor: "#DDDDDD",
        padding: 2,
        borderRadius: 8,
        margin: 10,
    },
    subTabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 6,
    },
    subTabActive: {
        backgroundColor: "#fff",
    },
    subTabText: { color: "#333", fontWeight: "500", fontSize: 12 },
    subTabTextActive: { color: "#black", fontWeight: "500", fontSize: 12 },
    contentContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    contentText: {
        fontSize: 18,
        color: "#444",
        textAlign: 'center',
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 1,
        borderRadius: 25,
        marginBottom: 16,
        marginTop: 16,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        fontWeight: 400,
        height: 40,
        color: "#6B7280",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 40,
    },
    cardTitle: {
        fontWeight: "500",
        fontSize: 16,
        color: "#111827",
        marginBottom: 4,
    },
    cardSubtitle: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: 400,
        marginBottom: 12,
    },
    Analysislabel: {
        color: "#111827",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },
    Analysisdropdown: {
        width: 160,             // keep width if needed
        marginBottom: 16,
        zIndex: 1000,
    },
    updateButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
    },
    updateButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    heading: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
    },
    date: {
        fontSize: 12,
        fontWeight: "400",
        color: "#6B7280",
        marginBottom: 10,
    },
    addIcons: {
        flexDirection: "row",
        marginBottom: 40,
        gap: 10,
    },
    addBtn: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    headerRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    headerText: {
        fontSize: 16,
        marginRight: 25,
        fontWeight: "600",
        color: "#111827",
    },
    headerText1: {
        fontSize: 16,
        marginLeft: 55,
        fontWeight: "600",
        color: "#111827",
    },
    headerText2: {
        fontSize: 16,
        marginLeft: 25,
        fontWeight: "600",
        color: "#111827",
    },
    line: {
        height: 1,
        backgroundColor: "#6B7280",
        marginVertical: 13,
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22
    },
    actionsRow1: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        marginBottom: 17
    },
    actionBtn: {
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 8,
        width: 50,
        height: 50,
        paddingHorizontal: 2,
        paddingVertical: 6,
    },
    actionLabel: {
        fontSize: 10,
        marginTop: 4,
        fontWeight: "500",
    },
    Morecontainer: {
        flex: 1,
        backgroundColor: '#F2F4F6', // Light grey background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    Moretitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827', // Dark text
        marginTop: 20,
        marginBottom: 8,
    },
    Moresubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280', // Gray text
        maxWidth: 300,
        fontWeight: '400',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#374151",
        marginTop: 12,
    },
    emptySubText: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
        textAlign: "center",
    },

});