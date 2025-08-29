import { Router } from "express";
import {
  createDiaryController,
  deleteDiaryController,
  getAllDiariesController,
  getDiaryByIdController,
  updateDiaryController,
} from "./diary.controller.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

const route = Router();

route.get("/get-all-diary", authMiddleware, getAllDiariesController);

route.get("/get-diary-by-id/:id", authMiddleware, getDiaryByIdController);

route.post(
  "/create-diary",
  authMiddleware,
  authorizeRoles("Teacher"),
  createDiaryController
);

route.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("Teacher"),
  updateDiaryController
);

route.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Teacher"),
  deleteDiaryController
);

export const DiaryRoute = route;
