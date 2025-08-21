import { Attendance } from "./attendance.model.js";

// Create attendance
export const createAttendanceService = async (data) => {
  const existing = await Attendance.findOne({
    classId: data.classId,
    sectionId: data.sectionId,
    date: data.date,
  });

  if (existing) {
    throw new Error(
      "Attendance already exists for this class/section on this date"
    );
  }

  return await Attendance.create(data);
};

// Get attendance by class & section
export const getAttendanceByClassService = async (classId, sectionId) => {
  return await Attendance.find({ classId, sectionId })
    .populate("students.studentId", "name rollNo")
    .populate("classTeacherId", "name email");
};

// Update student(s) attendance
const updateAttendanceService = async (data) => {
  const { classId, sectionId, date, students } = data;

  // Find attendance by class, section, and date
  const attendance = await Attendance.findOne({ classId, sectionId, date });
  if (!attendance) throw new Error("Attendance not found");

  students.forEach((update) => {
    const studentRecord = attendance.students.find(
      (s) => s.studentId.toString() === update.studentId
    );

    if (studentRecord) {
      // Update existing student status
      studentRecord.status = update.status;
    } else {
      // If student not found in record, push new entry
      attendance.students.push({
        studentId: update.studentId,
        status: update.status,
      });
    }
  });

  await attendance.save();
  return attendance;
};
