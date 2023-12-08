import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

//Create schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    require: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters.'],
    //custom validation
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format.',
    // },
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//student schema

const studentSchema = new Schema<TStudent, StudentModel>(
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
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester: {
      type: String,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select({ password: 0 });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }).select({ password: 0 });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating instance methods

// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

//Create a model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
