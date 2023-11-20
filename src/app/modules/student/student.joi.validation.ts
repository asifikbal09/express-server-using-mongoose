import Joi from 'joi';

const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'First name is required.',
      'string.max': 'First name cannot be more than {#limit} characters.',
      'string.pattern.base': 'First name must be in capitalize format.',
    }),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string.',
      'string.empty': 'Last name is required.',
      'string.pattern.base': 'Last name must contain only letters.',
    }),
});

const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianJoiSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameJoiSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.string(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'AB+',
    'AB-',
    'B+',
    'B-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianJoiSchema.required(),
  localGuardian: localGuardianJoiSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'block').default('active'),
});

export default studentJoiSchema;
