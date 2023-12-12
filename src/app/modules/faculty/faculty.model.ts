import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TFaculty, TUserName } from './faculty.interface';


//Create schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    require: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters.'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    require: [true, 'Last name is required.'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

//student schema

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not valid.',
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email.',
      },
    },
    dateOfBirth: { type: String },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
    profileImg: { type: String },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
