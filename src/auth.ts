/**
 * NextAuth.js Configuration for WordPress Authentication
 * 
 * Uses WordPress REST API + JWT Authentication plugin to authenticate users.
 * Requires WPGraphQL JWT Authentication plugin on WordPress side.
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// WordPress GraphQL endpoint
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://beacon-hill-staging.local';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'WordPress',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try WordPress JWT Authentication first
          const jwtResponse = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password,
            }),
          });

          if (jwtResponse.ok) {
            const data = await jwtResponse.json();
            
            if (data.token) {
              return {
                id: data.user_id?.toString() || data.user_email,
                email: data.user_email,
                name: data.user_display_name || data.user_nicename,
                accessToken: data.token,
              };
            }
          }

          // Fallback: Try WPGraphQL login mutation if JWT plugin isn't available
          const graphqlResponse = await fetch(`${WORDPRESS_URL}/graphql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                mutation LoginUser($username: String!, $password: String!) {
                  login(input: { username: $username, password: $password }) {
                    authToken
                    refreshToken
                    user {
                      id
                      databaseId
                      email
                      name
                      firstName
                      lastName
                    }
                  }
                }
              `,
              variables: {
                username: credentials.email,
                password: credentials.password,
              },
            }),
          });

          const graphqlData = await graphqlResponse.json();

          if (graphqlData.data?.login?.user) {
            const { user, authToken } = graphqlData.data.login;
            return {
              id: user.databaseId?.toString() || user.id,
              email: user.email,
              name: user.name || `${user.firstName} ${user.lastName}`.trim(),
              accessToken: authToken,
            };
          }

          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time jwt callback is called, user object is available
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.FAUST_SECRET_KEY,
});

// Extend the Session type for TypeScript
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface User {
    accessToken?: string;
  }
}
