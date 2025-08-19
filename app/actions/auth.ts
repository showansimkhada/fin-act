import NextAuth from 'next-auth';
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from 'next-auth'
import bcrypt from 'bcrypt'
import { fetchUser } from '../lib/data';

async function getUser(str: string): Promise<User | null> {
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
          const data = await fetchUser(username);
          const user = await getUser(username);
          if (!user) return null;
          const passMatch = await bcrypt.compareSync(password, data?.password);
          if (passMatch) return user;
        }
        return null
      }
    })
  ],
});