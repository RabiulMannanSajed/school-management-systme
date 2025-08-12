import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "./student.controller.js";

const route = Router();

route.post("/create-student", createStudent);

route.get("/get-all-student", getAllStudents);

route.get("/get-student-by-id/:id", getStudentById);

route.patch("/updated-student-by-id/:id", updateStudent);

route.delete("/:id", deleteStudent);

export const StudentRoutes = route;
