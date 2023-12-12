import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
});

const genderEnum = z.enum(['male', 'female', 'others']);

const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'AB+',
  'AB-',
  'B+',
  'B-',
  'O+',
  'O-',
]);

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: userNameValidationSchema,
      gender: genderEnum,
      designation: z.string(),
      email: z.string().email({ message: 'Invalid email format.' }),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: genderEnum.optional(),
      email: z.string().email({ message: 'Invalid email format.' }).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
