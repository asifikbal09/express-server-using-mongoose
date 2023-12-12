import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById({ _id: id });
  // const result = await Faculty.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteFacultyFromDB = async (_id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty.');
    }

    const userId = deletedFaculty?.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user.');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong!');
  }
};

const updateFacultyFromDB = async (_id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ _id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacultyService = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
  updateFacultyFromDB,
};
