'use server'
import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from 'next-auth'
import bcrypt from 'bcrypt'
import { fetchUser } from './users';

export async function getUser(str: string): Promise<User | null> {
  try {
    const foundUser = await fetchUser(str);
    if (!foundUser) return null
    const user: User = {
      name: foundUser.username
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user', error);
    throw new Error('Failed to fetch user');
  }
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
          const user = await fetchUser(username);
          if (user) {
            const data = await getUser(username);
            const passMatch = bcrypt.compareSync(password, user.password);
            if (passMatch) return data;
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