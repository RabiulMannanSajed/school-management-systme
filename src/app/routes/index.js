import { Router } from "express";
import { teacherRoutes } from "../modules/teacher/teacher.route.js";
import { UserRouter } from "../modules/user/user.router.js";
import { ClassRouter } from "../modules/class/class.route.js";

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
  {
    path: "/class",
    route: ClassRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
