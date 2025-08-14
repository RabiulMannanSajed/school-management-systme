import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
} from "./class.controller.js";
import { deleteClassFromDB } from "./class.service.js";

const router = Router();

router.post("/create-class", createClass);

router.get("/get-all-class", getAllClasses);

router.get("/:id", getClassById);

router.put("/:id", updateClass);

router.delete("/:id", deleteClassFromDB);

export const ClassRouter = router;
