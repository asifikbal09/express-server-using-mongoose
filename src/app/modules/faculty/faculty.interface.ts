import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TFaculty {
  id: string;
  user: Types.ObjectId;
  designation: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
}
