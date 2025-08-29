import { Router } from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from "./teacher.collroller.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
import { authMiddleware } from "../auth/authMiddleware.js";

const route = Router();

// all users can get by Admin and Teacher
route.get(
  "/get-all-teacher",
  authMiddleware,
  authorizeRoles("Teacher", "Admin"),
  getAllTeachers
);

route.get("/get-teacher-by-id/:id", authMiddleware, getTeacherById);

//* only Admin can create a teacher

route.post(
  "/create-teacher",
  authMiddleware,
  // TODO : Only Admin can Create a teacher
  authorizeRoles("Teacher", "Admin"),
  createTeacher
);

route.patch(
  "/updated-teacher-by-id/:id",
  authMiddleware,
  authorizeRoles("Teacher", "Admin"),
  updateTeacher
);

route.delete(
  "/delete-teacher/:id",
  authMiddleware,
  // TODO : Only Admin can delete a teacher
  authorizeRoles("Admin"),
  deleteTeacher
);

export const teacherRoutes = route;
