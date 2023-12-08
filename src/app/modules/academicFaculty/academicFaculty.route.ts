import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

//will call controller function

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
   AcademicFacultyValidations.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateFaculty,
);



export const AcademicSemesterRouter = router;
