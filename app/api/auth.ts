'use server'

import clientPromise from '@/lib/mongodb';
import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from 'next-auth'
import bcrypt from 'bcrypt'
import { createSession } from './session';

export async function authUser(user: string) {
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
        firstname: 0,
        lastname: 0,
        sfirstname: 0,
        slastname: 0
      }
    }
  ]).toArray()
  if (data) return data[0];
  return null;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            username: z.string(),
            password: z.string().min(6)
          })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await authUser(username);
          if (user) {
            const name = user.username;
            const data: User = {
              name: user.username
            }
            const passMatch = bcrypt.compareSync(password, user.password);
            if (!passMatch) return null;
            await createSession(name);
            return data;
          }
        }
        return null
      }
    })
  ],
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}