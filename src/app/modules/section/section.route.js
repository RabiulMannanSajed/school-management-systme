import { Router } from "express";

import {
  createSections,
  getAllSections,
  getSectionById,
  softDeleteSectionById,
  updateSectionById,
} from "./section.controller.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
import { authMiddleware } from "../auth/authMiddleware.js";

const route = Router();

// Section can create admin and all users can get sections

route.get("/get-all-section", authMiddleware, getAllSections);

route.get("/:id", authMiddleware, getSectionById);

route.post(
  "/create-section",
  authMiddleware,
  authorizeRoles("Admin"),
  createSections
);

route.put("/:id", authMiddleware, authorizeRoles("Admin"), updateSectionById);

route.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  softDeleteSectionById
);

export const SectionRoute = route;
