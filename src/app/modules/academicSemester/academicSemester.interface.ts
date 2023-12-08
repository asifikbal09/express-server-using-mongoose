import { Model } from 'mongoose';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TSemesterName;
  code: TSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export interface AcademicSemesterModel extends Model<TAcademicSemester> {
  // eslint-disable-next-line no-unused-vars
  isSemesterExists(_id:string): Promise<TAcademicSemester | null>;
}

export type TAcademicSemesterMapper = {
  [key: string]: string;
};
