import { Router } from "express";
import { teacherRoutes } from "../modules/teacher/teacher.route.js";
import { UserRouter } from "../modules/user/user.router.js";

const router = Router();

const moduleRouters = [
  {
    path: "/teacher",
    route: teacherRoutes,
  },
  {
    path: "/users",
    route: UserRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
