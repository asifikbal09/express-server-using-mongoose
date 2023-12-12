import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyController } from './faculty.controller';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

//will call controller function

router.get('/', FacultyController.getAllFaculties);

router.get('/:id', FacultyController.getSingleFaculty);

router.delete('/:id', FacultyController.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRouter = router;
