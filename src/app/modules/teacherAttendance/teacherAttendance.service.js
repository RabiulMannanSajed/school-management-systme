import { TeacherAttendance } from "./teacherAttendance.model.js";

// Add attendance

export const CreateTeacherAttendance = async (attendances) => {
  console.log("this is service ", attendances);
  if (!Array.isArray(attendances) || attendances.length === 0) {
    throw new Error("No attendance data provided");
  }

  const results = [];

  for (let record of attendances) {
    const { teacherId, date, status, checkIn, checkOut } = record;

    let teacherAttendance = await TeacherAttendance.findOne({
      teacherId,
    });

    if (!teacherAttendance) {
      teacherAttendance = new TeacherAttendance({
        teacherId,
        records: [{ date, status, checkIn, checkOut }],
      });
    } else {
      const exists = teacherAttendance.records.find(
        (r) =>
          r.date.toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0]
      );

      if (exists) {
        results.push({
          teacherId,
          date,
          success: false,
          message: "Attendance already marked for this date",
        });
        continue;
      }

      teacherAttendance.records.push({ date, status, checkIn, checkOut });
    }

    await teacherAttendance.save();
    results.push({
      teacherId,
      date,
      success: true,
      message: "Attendance marked successfully",
    });
  }

  return results;
};

// this is for all teacher attendance
export const getAllTeacherAttendanceFromDB = async () => {
  const teacherAttendance = await TeacherAttendance.find().populate(
    "teacherId"
  );
  return teacherAttendance;
};

export const updateTeacherAttendance = async (req, res) => {
  try {
    const { teacherId, date } = req.params;
    const { status, checkIn, checkOut } = req.body;

    const teacherAttendance = await TeacherAttendance.findOne({ teacherId });

    if (!teacherAttendance) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher attendance not found" });
    }

    const record = teacherAttendance.records.find(
      (r) =>
        r.date.toISOString().split("T")[0] ===
        new Date(date).toISOString().split("T")[0]
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found for this date",
      });
    }

    record.status = status || record.status;
    record.checkIn = checkIn || record.checkIn;
    record.checkOut = checkOut || record.checkOut;

    await teacherAttendance.save();

    res.json({ success: true, data: teacherAttendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTeacherAttendance = async (req, res) => {
  try {
    const { teacherId, date } = req.params;

    const teacherAttendance = await TeacherAttendance.findOneAndUpdate(
      { teacherId },
      { $pull: { records: { date: new Date(date) } } },
      { new: true }
    );

    if (!teacherAttendance) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher attendance not found" });
    }

    res.json({ success: true, data: teacherAttendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
