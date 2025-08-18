import { MongoClient } from 'mongodb';
import { User, IBS } from '@/app/lib/definitions'

const MONGODB_URI = process.env.MONGO_URI!
const client = new MongoClient(MONGODB_URI)

export async function fetchUser(user: string): Promise<User | null> {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.USER_COLLECTION_NAME!);
    const data = await collection.findOne({username: user})
    return data as User;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  } finally {
    await client.close();
  }
}

export async function fetchBS(user: string): Promise<IBS[] | null> {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const data = await collection.find({username: user}).toArray();
    return data as IBS[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Balance Sheet data');
  } finally {
    await client.close()
  }
}

export async function fetchLastBS(user: string): Promise<IBS | null> {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const data = await collection.find({username: user}).toArray();
    return data[0] as IBS;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Balance Sheet data');
  } finally {
    await client.close()
  }
}