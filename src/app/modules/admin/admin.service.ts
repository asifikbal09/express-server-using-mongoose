import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import mongoose from 'mongoose';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById({ _id: id });
  // const result = await Admin.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteAdminFromDB = async (_id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
    }

    const userId = deletedAdmin?.user;

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

    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong!');
  }
};

const updateAdminFromDB = async (
  _id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({_id}, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminService = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminFromDB,
};
