import { ObjectId } from 'mongodb';

import { User as AuthUser } from 'next-auth';

export interface User extends AuthUser  {
  _id: ObjectId;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  sfirstname: string;
  slastname: string;
}

// export interface Details extends AuthUser {
//   username: string;
//   firstname: string;
//   lastname: string;
//   sfirstname: string;
//   slastname: string;
// }

export interface LineProps {
  data: BS[];
}

export interface BS {
  _id: ObjectId;
  username: string;
  year: number;
  month: number;
  date: number;
  fWI: number;
  sWI: number;
  return: number | 0;
  openingBalance: number;
  closingBalance: number;
  weeklySpent: number | 0;
  weeklySave: number | 0;
}

// export interface BSM {
//   username: string;
//   year: number;
//   month: number;
//   date: number;
//   fWI: number;
//   sWI: number;
//   return: number | 0;
//   openingBalance: number;
//   closingBalance: number;
//   weeklySpent: number | 0;
//   weeklySave: number | 0;
// }


// export interface SessionPayload {
//   session: string,
//   data: string,
// }