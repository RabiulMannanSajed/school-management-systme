import { Router } from "express";
import { authMiddleware } from "../auth/authMiddleware";
import { authorizeRoles } from "../../middleware/roleMiddleware";

const route = Router();

//  all users can get notices
route.get("/", authMiddleware, getNotices);
route.get("/:id", authMiddleware, getNoticeById);

// Only teacher & admin can create/update/delete notice
route.post(
  "/",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  createNotice
);
route.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  updateNotice
);
route.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  deleteNotice
);

export default route;
