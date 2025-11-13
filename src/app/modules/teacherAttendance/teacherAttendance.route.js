import { Router } from "express";
import {
  deleteAttendance,
  getAllTeacherAttendance,
  markAttendance,
  updateAttendance,
} from "./teacherAttendance.controller.js";

const route = Router();

route.get("/allTeacherAttendance", getAllTeacherAttendance);

route.post("/createTeacherAttendance", markAttendance);

route.patch("/:teacherId/:date", updateAttendance);

route.patch("/:teacherId/:date", deleteAttendance);

export const TeacherAttendanceRoute = route;
