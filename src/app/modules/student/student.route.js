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

route.post(
  "/create-student",
  authMiddleware, // verifies JWT
  authorizeRoles("admin"), // only admin allowed
  createStudent // controller to create student
);

route.get(
  "/get-all-student",
  authMiddleware,
  authorizeRoles("Admin", "Teacher"),
  getAllStudents
);

route.get("/get-student-by-id/:id", getStudentById);

route.patch("/updated-student-by-id/:id", updateStudent);

route.delete("/:id", deleteStudent);

export const StudentRoutes = route;
