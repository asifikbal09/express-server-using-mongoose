import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Faculty must be a string.',
  }),
});



export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};