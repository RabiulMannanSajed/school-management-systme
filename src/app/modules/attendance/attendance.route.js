import express from "express";
import {
  createAttendance,
  getAttendanceByClass,
  updateAttendance,
} from "./attendance.controller.js";
const route = express.Router();

// Create attendance (multiple students at once)
route.post("/create-attendance", createAttendance);

// Get attendance by class + section
route.get("/:classId/:sectionId", getAttendanceByClass);

// Update one/multiple students’ attendance
route.patch("/update/:attendanceId", updateAttendance);

export const AttendanceRouter = route;
