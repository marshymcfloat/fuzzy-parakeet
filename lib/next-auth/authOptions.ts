import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          placeholder: "juandelacruz@gmail.com",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const userExists = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!userExists) return null;

        const correctPassword = await bcrypt.compare(
          credentials.password,
          userExists.hashed_password
        );

        if (!correctPassword) return null;

        return {
          id: userExists.id,
          email: userExists.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        (token.email = user.email), (token.id = user.id);
      }
      return token;
    },
    session({ token, session }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
