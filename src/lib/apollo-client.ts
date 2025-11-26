/**
 * Apollo Client (Legacy)
 * 
 * This file re-exports from gqlClient.ts for backwards compatibility.
 * For new code, import from '@/lib/gqlClient' or '@/lib/wp' directly.
 */

export { getClient, query, queryWithRevalidation, graphqlEndpoint, wordpressUrl } from './gqlClient';
export type { QueryResult } from './gqlClient';

// Re-export all WordPress fetchers
export * from './wp';

