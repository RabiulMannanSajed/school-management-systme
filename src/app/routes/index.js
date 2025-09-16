import { Router } from "express";
import { teacherRoutes } from "../modules/teacher/teacher.route.js";
import { UserRouter } from "../modules/user/user.router.js";
import { ClassRouter } from "../modules/class/class.route.js";
import { AuthRouter } from "../modules/auth/auth.route.js";
import { StudentRoutes } from "../modules/student/student.route.js";
import { SectionRoute } from "../modules/section/section.route.js";
import { SubjectRoute } from "../modules/subject/subject.route.js";
import { DiaryRoute } from "../modules/diary/diary.route.js";
import { TeacherAttendanceRoute } from "../modules/teacherAttendance/teacherAttendance.route.js";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouter,
  },

  {
    path: "/teacher",
    route: teacherRoutes,
  },

  {
    path: "/teacherAttendance",
    route: TeacherAttendanceRoute,
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
    path: "/section",
    route: SectionRoute,
  },

  {
    path: "/diary",
    route: DiaryRoute,
  },

  {
    path: "/subject",
    route: SubjectRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
