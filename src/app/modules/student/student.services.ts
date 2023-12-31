import { Student } from './student.model';
import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';

  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // const queryObj = { ...query };

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // //filtering
  // const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeField.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester');
  // // .populate({
  // //   path: 'academicDepartment',
  // //   populate: {
  // //     path: 'academicFaculty',
  // //   },
  // // });

  // //sorting

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // //limiting
  // let limit = 1;
  // if (query.limit) {
  //   limit = query?.limit as number;
  // }

  // //Pagination
  // let page = 1;
  // let skip = 0;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const pageQuery = sortQuery.skip(skip);

  // const limitQuery = pageQuery.limit(limit);

  // //field limiting
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldLimitingQuery = await limitQuery.select(fields);

  // return fieldLimitingQuery;

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user.');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
