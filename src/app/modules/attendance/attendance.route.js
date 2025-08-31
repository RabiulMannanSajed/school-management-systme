import express from "express";
import {
  createAttendance,
  getAttendanceByClass,
  updateAttendance,
} from "./attendance.controller.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
const route = express.Router();

// Create attendance (multiple students at once)
route.post(
  "/create-attendance",
  authMiddleware,
  authorizeRoles("Teacher"),
  createAttendance
);

// Get attendance by class + section
route.get("/:classId/:sectionId", authMiddleware, getAttendanceByClass);

// Update one/multiple students’ attendance
route.patch(
  "/update/:attendanceId",
  authMiddleware,
  authorizeRoles("Teacher"),
  updateAttendance
);

export const AttendanceRouter = route;
