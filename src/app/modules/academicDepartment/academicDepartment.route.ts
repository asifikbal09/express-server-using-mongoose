import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

//will call controller function

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

router.get('/:departmentId', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateDepartment,
);

export const AcademicDepartmentRouter = router;
