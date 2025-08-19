import NextAuth from 'next-auth';
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'
import { fetchUser } from '../lib/data';


async function getUser(user: string): Promise<User> {
  try {
    const foundUser = await fetchUser(user);
    return foundUser;
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
          const user = await getUser(username);
          if (!user) return null;
          const passMatch = await bcrypt.compareSync(password || "", user.password);
          if (passMatch) return user;
        }
        return '';
      }
    })
  ],
});