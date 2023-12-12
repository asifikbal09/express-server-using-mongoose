import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

//will call controller function

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRouter = router;
