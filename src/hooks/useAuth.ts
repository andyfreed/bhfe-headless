'use client';

/**
 * useAuth Hook
 * 
 * Custom hook for authentication state and actions.
 * Uses NextAuth.js session management.
 */

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user ?? null;

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn: () => signIn(),
    signOut: () => signOut({ callbackUrl: '/' }),
  };
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
} | null;
