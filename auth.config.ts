import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from './src/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';


async function getUser(email: string): Promise<User | undefined> {
    try {
      const userResult = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      const user = userResult.rows[0] as User | undefined;
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
  
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname === '/';
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: 
    [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Sign in",
            id: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            async authorize(credentials: any) {
                const { email, password } = credentials;
                console.log(credentials)
                const user = await getUser(email);
              
                if (user && user.password) {
                  const passwordsMatch = await bcrypt.compare(password, user.password);
              
                  if (passwordsMatch) {
                    return user;
                  } else {
                    // Passwords don't match
                    return null;
                  }
                } else {
                  // User not found or password not available
                  return null;
                }
              }
              
          })
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;