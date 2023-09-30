// [...nextauth].ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import "@/lib/utils/mongoose";
import Users from "@/lib/utils/models"
import bcrypt from 'bcrypt'

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "please provide process.env.NEXTAUTH_SECRET environment variable"
  );
}
export const authOption:  NextAuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
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
    async signIn({ user }) {
      return true
    }
  },
  session: {
    strategy: "jwt"
  }
});

export default NextAuth(authOption)
