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

route.put("/:teacherId/:date", updateAttendance);

route.delete("/:teacherId/:date", deleteAttendance);

export const TeacherAttendanceRoute = route;
