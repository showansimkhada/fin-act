import clientPromise from '@/lib/mongodb';
import { filUser } from '@/lib/definitions';
const client = await clientPromise;
const database = client.db(process.env.DB_NAME!);

export async function fetchUN(user: any) {
  const collection = database.collection(process.env.USER_COLLECTION_NAME!);
  const data = await collection.aggregate([
    {
      $match: {
        username: user,
      }
    },
    {
      $project: {
        _id: 0,
        password: 0,
        firstname: 0,
        lastname: 0,
        sfirstname: 0,
        slastname: 0,
        __v: 0,
      }
    }
  ]).toArray()
  console.log(data[0])
  if (data) return data[0];
  return null;
}

export async function fetchDetails(user: any) {
  const client = await clientPromise;
  const database = client.db(process.env.DB_NAME!);
  const collection = database.collection(process.env.USER_COLLECTION_NAME!);
  const data = await collection.aggregate([
    {
      $match: {
        username: user,
      }
    },
    {
      $project: {
        _id: 0,
        password: 0,
        __v: 0,
      }
    }
  ]).toArray()
  if (data) return data[0] as filUser;
  return null;
}

export async function fetchPass(user: any) {
  const client = await clientPromise;
  const database = client.db(process.env.DB_NAME!);
  const collection = database.collection(process.env.USER_COLLECTION_NAME!);
  const data = await collection.aggregate([
    {
      $match: {
        username: user,
      }
    },
    {
      $project: {
        _id: 0,
        username: 0,
        firstname: 0,
        lastname: 0,
        sfirstname: 0,
        slastname: 0,
        __v: 0,
      }
    }
  ]).toArray()
  if (data) return data;
  return null;
}