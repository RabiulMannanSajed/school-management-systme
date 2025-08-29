import { Router } from "express";
import {
  createDiaryController,
  deleteDiaryController,
  getAllDiariesController,
  getDiaryByIdController,
  updateDiaryController,
} from "./diary.controller.js";

const route = Router();

route.post("/create-diary", createDiaryController);
route.get("/get-all-diary", getAllDiariesController);
route.get("/get-diary-by-id/:id", getDiaryByIdController);
route.patch("/:id", updateDiaryController);
route.delete("/:id", deleteDiaryController);

export const DiaryRoute = route;
