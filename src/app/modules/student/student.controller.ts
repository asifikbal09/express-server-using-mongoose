import { Request, Response } from 'express';
import { StudentService } from './student.services';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // Joi validation
    // const { error, value } = studentJoiSchema.validate(studentData);
    // const result = await StudentService.createStudentIntoDB(value);

    // if (error) {
    //   res.status(200).json({
    //     success: true,
    //     message: 'Something want wrong.',
    //     error: error.details,
    //   });
    // }

    //zod validation
    const validateData = studentValidationSchema.parse(studentData);

    const result = await StudentService.createStudentIntoDB(validateData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'Something want wrong.',
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully.',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something want wrong.',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is found successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something want wrong.',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(501).json({
      success: false,
      message: err.message || 'Something want wrong.',
      error: err,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { student: updateData } = req.body;
    const result = await StudentService.updateStudentFromDB(
      studentId,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Student is updated successfully.',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    res.status(501).json({
     success:false,
     message:err.message||"Something want wrong.",
     error:err
    })
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
