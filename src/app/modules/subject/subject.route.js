import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from "./subject.controller.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

const route = Router();
// this field only can be accessed by admin
route.post(
  "/create-subject",
  authMiddleware,
  // TODO : Only Admin can Create
  authorizeRoles("Admin"),
  createSubject
);

route.get("/get-all-subjects", getSubjects);

route.patch(
  "/update-subject/:id",
  authMiddleware,
  // TODO : Only Admin can Create
  authorizeRoles("Admin"),
  updateSubject
);

route.delete(
  "/delete-subject/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  deleteSubject
);

export const SubjectRoute = route;
