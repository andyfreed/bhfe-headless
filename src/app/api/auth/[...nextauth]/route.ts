/**
 * NextAuth.js API Route Handler
 * 
 * This handles all authentication requests at /api/auth/*
 */

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
