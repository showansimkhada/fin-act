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

export type filUser = {
  username: string;
  firstname: string;
  lastname: string;
  sfirstname: string;
  slastname: string;
}

export type BS = {
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

export type LineProps = {
  data: [
    BS[],
    filUser
  ]
}

export type SessionPayload = {
  name: string,
  expiresAt: Date,
}