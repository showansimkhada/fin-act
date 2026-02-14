import { ObjectId } from 'mongodb';

import { User as AuthUser } from 'next-auth';

export interface User extends AuthUser  {
  _id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  partnerFirstName: string;
  partnerLastName: string;
}

export type filUser = {
  username: string;
  firstName: string;
  lastName: string;
  partnerFirstName: string;
  partnerLastName: string;
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

export type TaxInfo = {
  _id: ObjectId;
  username: string;
  year: number;
  month: number;
  date: number;
  grossAmount: number;
  payeDeduced: number;
  employer: string;
}

export type Props = {
  data: [
    BS[],
    filUser,
    TaxInfo[],
  ]
}

export type SessionPayload = {
  name: string,
  expiresAt: Date,
}