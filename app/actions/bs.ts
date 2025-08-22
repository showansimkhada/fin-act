'use server'

import { z } from 'zod';

import { BS } from '@/lib/definitions';
import { MongoClient } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchUser } from './users';

const MONGODB_URI = process.env.MONGO_URI!
const client = new MongoClient(MONGODB_URI)

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
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const data = await collection.find({username: user}).project({_id: 0, username: 0}).toArray();
    return data as BS[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get Balance Sheet data');
  } finally {
    await client.close()
  }
}

export async function fetchLastBS(user: any): Promise<BS> {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const data = await collection.aggregate([
      {
        $match: {
          username: user,
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]).toArray()
    return data[0] as BS;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get Balance Sheet data');
  } finally {
    await client.close()
  }
}

const AddBS = BSchema.omit({
  _id: true,
})

export async function addBS(formData: FormData) {
  const str = formData.get('bsDate')?.toString();
  const parseBS = AddBS.parse({
    username: formData.get('username'),
    year: Number(str?.split('-')[0]),
    month: Number(str?.split('-')[1]),
    date: Number(str?.split('-')[2],),
    fWI: Number(formData.get('Number(fWI')),
    sWI: Number(formData.get('sWI')),
    return: Number(formData.get('ret')),
    openingBalance: Number(formData.get('oB')),
    closingBalance: Number(formData.get('cB')),
    weeklySpent: Number(formData.get('wSp')),
    weeklySave: Number(formData.get('wSa')),
  })
  await client.connect();
  const database = client.db(process.env.DB_NAME!);
  const collection = database.collection(process.env.BS_COLLECTION_NAME!);
  
  const result = await collection.findOne({year: parseBS.year, month: parseBS.month, date: parseBS.date});
  if (!result) {
    await collection.insertOne(parseBS);
    redirect('/dashboard')
  } else {
    console.log('Cannot add data with same date')
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

export async function updateAll(oU: string, nU: string) {
  // await client.connect();
  // const database = client.db(process.env.DB_NAME!);
  // const collection = database.collection(process.env.BS_COLLECTION_NAME!);
  // const result = await collection.updateMany({username: oU}, {$set: {'username': nU}})
  // console.log(result)
  // if (!result) {
  //   await collection.updateMany({username: oU}, {$set: {username: nU}});
  //   revalidatePath('/dashboard')
  // } else {
  //   console.log('Cannot add data with same date')
  // };
}