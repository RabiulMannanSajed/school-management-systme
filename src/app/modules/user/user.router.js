import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controller.js";

const route = Router();

route.post("/create-user", createUser);
route.get("/get-all-user", getAllUsers);
route.get("/:id", getUserById);
route.patch("/:id", updateUser);
route.delete("/:id", deleteUser);

export const UserRouter = route;
