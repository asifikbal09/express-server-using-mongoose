import { academicSemesterMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDB = async (_id: string) => {
  if ((await AcademicSemester.isSemesterExists(_id)) === null) {
    throw Error('Semester not found.');
  }
  const result = await AcademicSemester.findOne({ _id });
  return result;
};

const updateSemesterFromDB = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if ((await AcademicSemester.isSemesterExists(_id)) === null) {
    throw Error('Semester not found.');
  }
  if(payload.name&&payload.code&&academicSemesterMapper[payload.name]!== payload.code){
    throw new Error('Invalid semester code.')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterFromDB,
};
