import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
} from "./class.controller.js";

import { deleteClassFromDB } from "./class.service.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

const router = Router();

// Class can be created by admin and all users can get classes

router.get("/get-all-class", authMiddleware, getAllClasses);

router.get("/:id", authMiddleware, getClassById);

router.post(
  "/create-class",
  authMiddleware,
  authorizeRoles("Admin"),
  createClass
);

router.put("/:id", authMiddleware, authorizeRoles("Admin"), updateClass);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  deleteClassFromDB
);

export const ClassRouter = router;
