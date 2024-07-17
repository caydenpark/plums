// src/app/lib/auth.ts

import { NextAuthOptions, User } from "next-auth";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          dbUser &&
          (await bcrypt.compare(credentials.password, dbUser.password_hash))
        ) {
          const { password_hash, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as unknown as User;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params) {
      // Destructure needed properties from params
      const { user, account, profile } = params;

      // Ensure a user exists in the database for login
      // If user email exists, allow sign in without directly comparing passwords here
      if (user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          return true; // Allow sign in
        }
      }
      return false; // Block sign in
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};
