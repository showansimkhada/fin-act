'use server';

import { z } from 'zod';

import { MongoClient } from 'mongodb';
import { User } from '@/lib/definitions';
import { updateAll } from './bs';
import { redirect } from 'next/navigation';
import { auth } from './auth';

const MONGODB_URI = process.env.MONGO_URI!
const client = new MongoClient(MONGODB_URI)


export async function fetchUser(user: any): Promise<User | null> {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
    const collection = database.collection(process.env.USER_COLLECTION_NAME!);
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
    if (data) return data[0] as User;
    return null
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get users data');
  } finally {
    await client.close();
  }
}

export async function finUser(user: any): Promise<User | null> {
  try {
    await client.connect()
    const database = client.db(process.env.DB_NAME!)
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
        }
      }
    ]).toArray()
    if (data) return data[0] as User;
    return null
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get users data');
  } finally {
    await client.close();
  }
}


//  Begin USERS 
const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  sfirstname: z.string(),
  slastname: z.string(),
})

const UpdateUN = UserSchema.omit({
  _id: true,
  firstname: true,
  lastname: true,
  sfirstname: true,
  slastname: true,
  password: true,
})

// export async function getDetails(str: string): Promise<User | null> {
//   try {
//     const foundUser = await fetchUser(str);
//     if (!foundUser) return null
//     return foundUser;
//   } catch (error) {
//     console.error('Failed to fetch user', error);
//     throw new Error('Failed to fetch user');
//   }
// }

//  Update user name and update all the data related to it
export async function updateUN(formData: FormData) {
  // const session = await auth()
  // const oU = session?.user?.name;
  // const nU = formData.get('newUsername');
  // const exists = await fetchUser(oU);
  // if (exists) return console.log('Username already exists')
  // const parseUS = UpdateUN.parse({
  //   username: formData.get('newUsername'),
  // })
  // await client.connect();
  // const database = client.db(process.env.DB_NAME!);
  // const collection = database.collection(process.env.USER_COLLECTION_NAME!);
  // const result = await collection.updateOne({username: oU}, {$set: {'username': nU}})
  // console.log(parseUS)
  // await updateAll(exists, nU);
  // redirect('/profile')
    // const result = await collection.findOneAndUpdate({username: parseUS.username}, upda);
    // if (!result) {
    //   await collection.insertOne(parseBS);
    //   redirect('/dashboard')
    // } else {
    //   console.log('Cannot add data with same date')
    // };
}

export async function updateUser(user: any, nu: string) {
  // try {
  //   await client.connect()
  //   const database = client.db(process.env.DB_NAME!)
  //   const collection = database.collection(process.env.USER_COLLECTION_NAME!);
  //   // const data = await collection.findOneAndUpdate({username: user}, {username: nu});
  //   return 'Success';
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to get users data');
  // } finally {
  //   await client.close();
  // }
}

const UpdateProfile = UserSchema.omit({
  _id: true,
  username: true,
  password: true,
})

export async function updateProfile(formData: FormData) {
  const parseProfile = UpdateProfile.parse({
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    sfirstname: formData.get('sfirstname'),
    slastname: formData.get('slastname'),
  })
}

const UpdatePass = UserSchema.omit({
  _id: true,
  username: true,
  firstname: true,
  lastname: true,
  sfirstname: true,
  slastname: true,
})

export async function updatePass(formData: FormData) {
  // const newpass = formData.get('newpass');
  // const confirmpass = formData.get('confirmpass');
  // if ( newpass === confirmpass) {
  //   const hash = bcrypt.hashSync(newpass, 12)
  //   const parsePass = UpdatePass.parse({
  //     password: hash,
  //   })
  // }
}
// End USERS