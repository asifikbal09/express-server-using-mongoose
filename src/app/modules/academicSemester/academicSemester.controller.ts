import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully.',
    data: result,
  });
});
const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved successfully.',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getSingleSemesterFromDB(
    req.params.semesterId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is found successfully.',
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.updateSemesterFromDB(
    req.params.semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is updated successfully.',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
