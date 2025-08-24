'use server'

import { z } from 'zod';

import clientPromise from '@/lib/mongodb';
import { updateAll } from './bs';

const client = await clientPromise;
const database = client.db(process.env.DB_NAME!);
const collection = database.collection(process.env.USER_COLLECTION_NAME!);

const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  sfirstname: z.string(),
  slastname: z.string(),
})
const UN = UserSchema.omit({
  _id: true,
  password: true,
  firstname: true,
  lastname: true,
  sfirstname: true,
  slastname: true,
})

export async function updateUN(formData: FormData) {
  const oU = formData.get('username')
  const nU = formData.get('newUsername')
  const parse = UN.parse({
    username: formData.get('newUsername'),
  })
  // Check if the new username is already in the database
  const exists = await collection.findOne({username: nU});
  if (!exists) {
    await collection.updateOne({username: oU}, {$set: {username: nU}})
    updateAll(oU, nU);
    // Neet to update the session or logout
  }
}