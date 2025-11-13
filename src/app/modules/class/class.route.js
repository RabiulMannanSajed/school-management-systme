import { Router } from "express";

import {
  createClass,
  deleteClass,
  getAllClasses,
  getClassById,
  updateClass,
} from "./class.controller.js";

import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

const router = Router();

// Class can be created by admin and all users can get classes
router.post(
  "/create-class",
  authMiddleware,
  authorizeRoles("Admin"),
  createClass
);

router.get("/get-all-class", authMiddleware, getAllClasses);

router.get("/:id", authMiddleware, getClassById);

router.patch("/:id", authMiddleware, authorizeRoles("Admin"), updateClass);

router.patch("/:id", authMiddleware, authorizeRoles("Admin"), deleteClass);

export const ClassRouter = router;
