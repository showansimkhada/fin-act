import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  sfirstname: string;
  slastname: string;
}

export interface IBS {
  _id: ObjectId;
  username: string;
  year: number;
  month: number;
  date: number;
  fWI: number;
  sWI: number;
  return: number;
  openingBalance: number;
  closingBalance: number;
  weeklySpent: number;
  weeklySave: number;
}