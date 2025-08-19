import { MongoClient } from 'mongodb';
import { User, BS } from '@/app/lib/definitions'

const MONGODB_URI = process.env.MONGO_URI!
const client = new MongoClient(MONGODB_URI)

// Begin Users
export async function fetchUser(user: any): Promise<User> {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.USER_COLLECTION_NAME!);
    const data = await collection.findOne({username: user});
    return data as User;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get users data');
  } finally {
    await client.close();
  }
}

export async function updateUser(user: any, nu: string) {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.USER_COLLECTION_NAME!);
    const data = await collection.findOneAndUpdate({username: user}, {username: nu});
    return 'Success';
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get users data');
  } finally {
    await client.close();
  }
}
// End Users

// Begin Balance Sheet 
export async function fetchBS(user: any): Promise<BS[]> {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const data = await collection.find({username: user}).toArray();
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
    
    const data = await collection.find({username: user}).toArray();
    return data[0] as BS;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get Balance Sheet data');
  } finally {
    await client.close()
  }
}

export async function postBS(data: BS) {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME!);
    const collection = database.collection(process.env.BS_COLLECTION_NAME!);
    
    const result = await collection.insertOne(data);
    console.log('successfully saved the data')
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get Balance Sheet data');
  } finally {
    await client.close()
  }
}
// End Balance Sheet