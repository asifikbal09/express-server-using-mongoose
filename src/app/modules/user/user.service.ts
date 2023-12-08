import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create user object
  const userData: Partial<TUser> = {};

  //set id
  // userData.id = '20230100001';

  userData.role = 'student';

  userData.password = password || (config.defaultPass as string);


  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);



  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
