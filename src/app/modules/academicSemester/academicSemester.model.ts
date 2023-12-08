import { Schema,  model } from 'mongoose';
import {
  AcademicSemesterModel,
  TAcademicSemester,
} from './academicSemester.interface';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<
  TAcademicSemester,
  AcademicSemesterModel
>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);

//pre middleware
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error('Semester already exists.');
  }
  next();
});

//custom static method
academicSemesterSchema.statics.isSemesterExists = async function (
  _id:string,
) {
  const existingSemester = await AcademicSemester.findOne({ _id });
  return existingSemester;
};

export const AcademicSemester = model<TAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
