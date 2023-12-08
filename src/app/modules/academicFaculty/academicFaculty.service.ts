import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  return result;
};

const updateFacultyIntoDB = async (
  _id: string,
  payload: Partial<TAcademicFaculty>,
) => {

  const result = await AcademicFaculty.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
createAcademicFacultyIntoDB,
getAllFacultiesFromDB, 
getSingleFacultyFromDB,
updateFacultyIntoDB,
};
