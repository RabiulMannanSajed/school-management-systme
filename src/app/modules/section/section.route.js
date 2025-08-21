import { Router } from "express";

import {
  createSections,
  getAllSections,
  getSectionById,
  softDeleteSectionById,
  updateSectionById,
} from "./section.controller.js";

const route = Router();

route.get("/get-all-section", getAllSections);

route.post("/create-section", createSections);

route.get("/:id", getSectionById);

route.put("/:id", updateSectionById);

route.delete("/:id", softDeleteSectionById);

export const SectionRoute = route;
