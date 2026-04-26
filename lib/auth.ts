import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

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
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }

      if (token.userId) {
        const needsQuery = !token.profileCompleted || token.isAdmin === undefined;
        if (needsQuery) {
          const currentUser = await prisma.user.findUnique({
            where: { id: token.userId },
            select: { name: true, birthdate: true, educationalLevel: true, isAdmin: true },
          });

          token.profileCompleted = Boolean(
            currentUser?.name && currentUser.birthdate && currentUser.educationalLevel
          );
          token.isAdmin = currentUser?.isAdmin ?? false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
        session.user.profileCompleted = token.profileCompleted ?? false;
        session.user.isAdmin = token.isAdmin ?? false;
      }
      return session;
    },
  },
};
