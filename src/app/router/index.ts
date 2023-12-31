import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { StudentRouter } from '../modules/student/student.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRouter } from '../modules/admin/admin.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { CourseRouter } from '../modules/course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
