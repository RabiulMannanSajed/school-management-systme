import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from "./subject.controller.js";

const route = Router();

route.post("/create-subject", createSubject);

route.get("/get-all-subjects", getSubjects);

route.patch("/:id", updateSubject);

route.delete("/:id", deleteSubject);

export const SubjectRoute = route;
