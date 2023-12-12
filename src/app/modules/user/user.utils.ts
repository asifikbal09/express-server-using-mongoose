import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastUserId = async (role: string) => {
  const lastUser = await User.findOne(
    { role: role },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort("-createdAt")
    .lean();

  return lastUser?.id ? lastUser.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastUserId('student');
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();

  const lastAdminId = await findLastUserId('admin');
  
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();

  const lastAdminId = await findLastUserId('faculty');
  
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
