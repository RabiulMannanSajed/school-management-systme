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

//* only Admin can create a teacher
route.post(
  "/create-teacher",
  authMiddleware, // verifies JWT
  authorizeRoles("Teacher"),
  createTeacher
);

route.get("/get-all-teacher", getAllTeachers);

route.get("/get-teacher-by-id/:id", getTeacherById);

route.patch("/updated-teacher-by-id/:id", updateTeacher);

route.delete("/:id", deleteTeacher);

export const teacherRoutes = route;
