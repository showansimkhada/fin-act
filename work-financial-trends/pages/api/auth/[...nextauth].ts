// [...nextauth].ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/utils/conn/mongoose";
import Users, { IUSER } from "@/lib/utils/models/userModel"
import bcrypt from 'bcrypt'

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "please provide process.env.NEXTAUTH_SECRET environment variable"
  );
}

export const authOptions:  NextAuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        page: { label: "page", type: "text"}
      },
      async authorize(credentials) {
        await dbConnect()
        const username = credentials?.username;
        const pass = credentials?.password;
        const findUser = await Users.findOne({username: username})
        if (findUser && bcrypt.compareSync(pass || "", findUser.password)) {
          return findUser
        } else {
          throw new Error("Incorrect username and password!!")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user
        return token
      }
      return token
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
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/',
  }
});

export default NextAuth(authOptions)
