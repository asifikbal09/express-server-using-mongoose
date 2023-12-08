import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

//will call controller function

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllSemester);

router.get('/:semesterId', AcademicSemesterController.getSingleSemester);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateSemester,
);

// router.delete('/:studentId', StudentController.deleteStudent);

// router.put('/:studentId', StudentController.updateStudent);

export const AcademicSemesterRouter = router;
