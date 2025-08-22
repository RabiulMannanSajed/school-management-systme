import { Router } from "express";
import { teacherRoutes } from "../modules/teacher/teacher.route.js";
import { UserRouter } from "../modules/user/user.router.js";
import { ClassRouter } from "../modules/class/class.route.js";
import { AuthRouter } from "../modules/auth/auth.route.js";
import { StudentRoutes } from "../modules/student/student.route.js";

const router = Router();

const moduleRouters = [
  {
    path: "/teacher",
    route: teacherRoutes,
  },
  {
    path: "/student",
    route: StudentRoutes,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/class",
    route: ClassRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
