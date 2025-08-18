import { MongoClient } from 'mongodb';
import {
  User,
  BalanceSheet,
} from './definitions';

const MONGODB_URI = process.env.MONGO_URI!
const client = new MongoClient(MONGODB_URI)

export async function fetchUser(user: string) {
    console.log('At /lib/data.ts fetchBS')
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.USER_COLLECTION_NAME!);
    // Pass username to fiter the database
    const data = await collection.find({username: user}).toArray()
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  } finally {
    await client.close()
  }
}

export async function fetchBS(user: string) {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    // Pass username to fiter the database
    const data = await collection.find({username: user}).toArray()
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Balance Sheet data');
  } finally {
    await client.close()
  }
}