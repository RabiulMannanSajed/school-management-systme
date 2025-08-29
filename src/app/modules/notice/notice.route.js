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
  authorizeRoles("Teacher", "Admin"),
  createNotice
);
route.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("Teacher", "Admin"),
  updateNotice
);
route.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Teacher", "Admin"),
  deleteNotice
);

export default route;
