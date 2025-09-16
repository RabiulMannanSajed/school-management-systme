import {
  CreateTeacherAttendance,
  deleteTeacherAttendance,
  getAllTeacherAttendanceFromDB,
  updateTeacherAttendance,
} from "./teacherAttendance.service.js";

// Mark Attendance
export const markAttendance = async (req, res) => {
  console.log(req.body.attendances);
  try {
    const attendance = await CreateTeacherAttendance(req.body.attendances);
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Attendance
export const getAllTeacherAttendance = async (req, res) => {
  try {
    const attendance = await getAllTeacherAttendanceFromDB();
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Attendance by Teacher
export const getAttendanceByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const attendance = await attendanceService.getAttendanceByTeacher(
      teacherId
    );
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await updateTeacherAttendance(id, req.body);
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Attendance
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTeacherAttendance(id);
    res.json({ success: true, message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
