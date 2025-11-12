'use server'

import { z } from 'zod';

import clientPromise from '@/lib/mongodb';
const client = await clientPromise;
const database = client.db(process.env.DB_NAME!);
const bs = database.collection(process.env.BS_COLLECTION_NAME!);

import { BS } from '@/lib/definitions';
import { redirect } from 'next/navigation';

const BSchema = z.object({
  _id: z.string(),
  username: z.string(),
  year: z.number(),
  month: z.number(),
  date: z.number(),
  fWI: z.number(), 
  sWI: z.number(),
  return: z.number(),
  openingBalance: z.number(),
  closingBalance: z.number(),
  weeklySpent: z.number(),
  weeklySave: z.number(),
})

export async function fetchBS(user: any): Promise<BS[]> {
  const data = await bs.find({username: user}).project({_id: 0, username: 0}).toArray();
  if (!data) console.log('Error in connection.')
  return data as BS[];
}

export async function fetchLastBS(user: any): Promise<BS> {
  const data = await bs.aggregate([
    {
      $match: {
        username: user,
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: {
        year: -1,
        month: -1,
        date: -1,
      }
    }
  ]).toArray()
  return data[0] as BS;
}

const AddBS = BSchema.omit({
  _id: true,
})

export async function addBS(formData: FormData) {
  const str = formData.get('bsDate')?.toString();
  const parse = AddBS.parse({
    username: formData.get('username'),
    year: Number(str?.split('-')[0]),
    month: Number(str?.split('-')[1]),
    date: Number(str?.split('-')[2],),
    fWI: Number(formData.get('fWI')),
    sWI: Number(formData.get('sWI')),
    return: Number(formData.get('ret')),
    openingBalance: Number(formData.get('oB')),
    closingBalance: Number(formData.get('cB')),
    weeklySpent: Number(formData.get('wSp')),
    weeklySave: Number(formData.get('wSa')),
  })
  const result = await bs.find({username: parse.username, year: parse.year, month: parse.month, date: parse.date}).toArray();
  if (result.length == 0) {
    await bs.insertOne(parse);
    redirect('/balancesheet')
  } else {
    console.log('Data already exists with the same date')
  };
}

const UpdateBS = BSchema.omit({
  _id: true,
  year: true,
  month: true,
  date: true,
  fWI: true, 
  sWI: true,
  return: true,
  openingBalance: true,
  closingBalance: true,
  weeklySpent: true,
  weeklySave: true,
})

export async function updateAll(oU: any, nU: any) {
  const result = (await bs.updateMany({username: oU}, {$set: {username: nU}})).matchedCount;
  if (result > 0) {
    console.log('Updated ', result);
  } else {
    console.log('Some thing went wrong');
  };
}