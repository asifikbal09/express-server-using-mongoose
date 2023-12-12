/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create user object
  const userData: Partial<TUser> = {};

  //set id
  // userData.id = '20230100001';

  userData.role = 'student';

  userData.password = password || (config.defaultPass as string);

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  //create user object
  const userData: Partial<TUser> = {};

  //set id
  // userData.id = '20230100001';

  userData.role = 'admin';

  userData.password = password || (config.defaultPass as string);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin.');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  //create user object
  const userData: Partial<TUser> = {};

  //set id
  // userData.id = '20230100001';

  userData.role = 'faculty';

  userData.password = password || (config.defaultPass as string);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty.');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
};
