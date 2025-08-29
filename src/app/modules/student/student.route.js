import { Router } from "express";

import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "./student.controller.js";

import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

const route = Router();

// Only Admin can create a student
route.post(
  "/create-student",
  authMiddleware,
  authorizeRoles("admin"),
  createStudent
);

//  All student can get by Admin and Teacher
route.get(
  "/get-all-student",
  authMiddleware,
  authorizeRoles("Admin", "Teacher"),
  getAllStudents
);

// Admin, Teacher and Student can get student by id
route.get(
  "/get-student-by-id/:id",
  authMiddleware,
  authorizeRoles("Admin", "Teacher", "Student"),
  getStudentById
);

// Admin, Teacher and Student can update student by id
route.patch(
  "/updated-student-by-id/:id",
  authMiddleware,
  authorizeRoles("Admin", "Teacher", "Student"),
  updateStudent
);
// Only Admin and Teacher can delete student by id
route.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Teacher"),
  deleteStudent
);

export const StudentRoutes = route;
