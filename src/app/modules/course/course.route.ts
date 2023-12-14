import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

//will call controller function

router.post(
  '/create-course',
  validateRequest(CourseValidations.courseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(
    CourseValidations.updateCourseValidationSchema
  ),
  CourseController.updateCourse,
);

router.delete('/:id', CourseController.deleteCourse);

// router.put('/:studentId', StudentController.updateStudent);

export const CourseRouter = router;
