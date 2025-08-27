// api/authapi.js
import axios from "axios";
export const BASE_URL = "http://192.168.1.11:5000";
export const API_URL = "http://192.168.1.11:5000/api"; // Replace with your backend URL

export const login = async (username, password, role) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password, role });
    return res.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || "Login failed" };
  }
};

// student routes
export const getMe = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenattendance = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/attendance`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenresult = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/recentresults`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrensubjects = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/studentsubjects`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrentodayclasses = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/getstudenttimetable`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenupcomingexam = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/upcomingexam`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenupcomingtimetable = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/upcomingexam`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenscheduletimetable = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/mystudent/timetable`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getchildrenvideolessons = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/getVideolessons`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const getstudentexam = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/student/studentexams`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};





















// teacher routes
export const getTeacherDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('🔥 getTeacherDashboard error:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || 'Server error' };
  }
};

export const getEventsAndAssignments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/getevents`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = { events: [], assignments: [] };

    if (response.data.success && response.data.data) {
      // Format events
      result.events = (response.data.data.events || []).map(event => {
        const startObj = new Date(event.startTime);
        const endObj = new Date(event.endTime);
        return {
          title: event.title,
          description: event.description,
          classId: event.classId,
          startDate: startObj.toLocaleDateString(),
          startTime: startObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          endDate: endObj.toLocaleDateString(),
          endTime: endObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      });

      // Format assignments
      result.assignments = (response.data.data.assignments || []).map(a => {
        const startObj = new Date(a.startDate);
        const dueObj = new Date(a.dueDate);
        return {
          title: a.title,
          description: a.description,
          startDate: startObj.toLocaleDateString(),
          startTime: startObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          dueDate: dueObj.toLocaleDateString(),
          dueTime: dueObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      });
    }

    return result;

  } catch (error) {
    console.error("🔥 getEventsAndAssignments error:", error);
    return { events: [], assignments: [] };
  }
};

export const getTeacherTimetable = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/timetable`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // Format timetable if needed
    if (response.data.success && response.data.data) {
      return response.data.data; // adjust if backend returns differently
    }

    return [];
  } catch (error) {
    console.error("🔥 getTeacherTimetable error:", error.response?.data || error.message);
    return [];
  }
};
// get classes for teacher
export const getMyClassesApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/myclasses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) return response.data.classes;
    return [];
  } catch (error) {
    console.error("🔥 getMyClassesApi error:", error.response?.data || error.message);
    return [];
  }
};

export const getMyTeacherClassesApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/myTeacherclasses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) return response.data.classes;
    return [];
  } catch (error) {
    console.error("🔥 getMyTeacherClassesApi error:", error.response?.data || error.message);
    return [];
  }
};
export const getStudentsByClassApi = async (classId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/teacher/getstudentbyclass/${classId}`, // backend endpoint
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      return response.data.students || [];
    }
    return [];
  } catch (error) {
    console.error(
      "🔥 getStudentsByClassApi error:",
      error.response?.data || error.message
    );
    return [];
  }
};

// reocrd student attdeance 
export const recordAttendanceApi = (token, records) => {
  return axios.post(
    `${API_URL}/teacher/attendance/record`,
    { records }, // sending all student attendance records
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
//exam route
export const getExamsByClassApi = async (classId, token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/exam?classId=${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching exams by class:", error);
    throw error;
  }
};

//get student by gradeid
export const getStudentsByGrade = async (gradeId, token) => {
  try {
    const res = await axios.get(`${API_URL}/teacher/grade/${gradeId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // your auth token
      },
    });
    return res.data; // { success, count, students }
  } catch (error) {
    throw error;
  }
};


export const teachersaveExamGrades = async (examId, students, token) => {
  try {
    const payload = {
      examId,   // exam ID must be sent
      students, // array of { id, marks, present, remark }
    };

    console.log("📤 Payload sent to API:", payload); // debug

    const response = await axios.post(`${API_URL}/teacher/gradessave`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📥 Response from API:", response.data); // debug
    return response.data;
  } catch (error) {
    console.error(
      "🔥 saveExamGrades API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMyTeacherVideoLessons = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/getmyvideolessons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // { success: true, lessons: [...] }
  } catch (error) {
    throw error;
  }
};


export const togglePublishVideoLessonAPI = async (token, id, publish) => {
  try {
    const res = await axios.put(
      `${API_URL}/teacher/teacherpublish/${id}`,
      { publish },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data; // { success: true, lesson: {...} }
  } catch (err) {
    console.error("🔥 togglePublishVideoLessonAPI error:", err.response?.data || err.message);
    throw err;
  }
};

// Delete video lesson
export const deleteVideoLessonAPI = async (token, id) => {
  try {
    const res = await axios.delete(`${API_URL}/teacher/lessondelete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // { success: true, message: "Video deleted successfully" }
  } catch (err) {
    console.error("🔥 deleteVideoLessonAPI error:", err.response?.data || err.message);
    throw err;
  }
};
// WIP
export const uploadLessonApi = async (token, lessonData) => {
    try {
        const formData = new FormData();
        formData.append("lessonTitle", lessonData.lessonTitle);
        formData.append("subject", lessonData.subject);
        formData.append("classId", lessonData.classId);
        formData.append("description", lessonData.description || "");

        // Append video file
        formData.append("video", {
            uri: lessonData.video.uri,
            type: lessonData.video.mimeType || "video/mp4",
            name: lessonData.video.name,
        });

        const response = await axios.post(`${API_URL}/lessons/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("🔥 uploadLessonApi error:", error.response?.data || error.message);
        return { success: false, message: "Failed to upload lesson." };
    }
};