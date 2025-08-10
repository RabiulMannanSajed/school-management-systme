import { Router } from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from "./teacher.collroller.js";

const route = Router();

route.post("/create-teacher", createTeacher);

route.get("/get-all-teacher", getAllTeachers);

route.get("/get-teacher-by-id/:id", getTeacherById);

route.patch("/updated-teacher-by-id/:id", updateTeacher);

route.delete("/:id", deleteTeacher);

export const teacherRoutes = route;
