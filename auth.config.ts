import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl },}) {
      const isLoggedIn = !!auth?.user;
      // const isOnDashboard= nextUrl.pathname.startsWith('/dashboard')
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token
        }
      }
    }
  },
  providers: [],
  session: {
    strategy: "jwt"
  }
} satisfies NextAuthConfig;