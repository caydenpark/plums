import { NextAuthOptions, User } from "next-auth";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const NEXTAUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:3000";

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
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn(params) {
      const { user } = params;
      if (user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          return true;
        }
      }
      return false;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : NEXTAUTH_URL;
    },
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email || undefined },
      });
      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.name = dbUser.first_name; // Ensure this line is included in order to use it in the header
        session.user.email = dbUser.email; // Ensure this line is included if email is needed
      }
      return session;
    },
  },
};
