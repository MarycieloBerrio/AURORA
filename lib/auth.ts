import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: parsedCredentials.data.email },
        });

        if (!existingUser?.passwordHash) {
          return null;
        }

        const isValidPassword = await compare(parsedCredentials.data.password, existingUser.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { id: true },
      });

      if (existingUser) {
        return true;
      }

      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          image: user.image,
        },
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }

      if (token.userId) {
        const currentUser = await prisma.user.findUnique({
          where: { id: token.userId },
          select: { name: true, birthdate: true, educationalLevel: true },
        });

        token.profileCompleted = Boolean(
          currentUser?.name && currentUser.birthdate && currentUser.educationalLevel
        );
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
        session.user.profileCompleted = token.profileCompleted ?? false;
      }
      return session;
    },
  },
};
