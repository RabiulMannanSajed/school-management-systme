import {
  createAttendanceService,
  getAttendanceByClassService,
  updateAttendanceService,
} from "./attendance.service.js";
// Create new attendance
export const createAttendance = async (req, res) => {
  try {
    const attendance = await createAttendanceService(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get attendance by class + section
export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;
    const attendance = await getAttendanceByClassService(classId, sectionId);
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update student(s) attendance
export const updateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const updates = req.body.students; // array of {studentId, status}

    const attendance = await updateAttendanceService(attendanceId, updates);
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
