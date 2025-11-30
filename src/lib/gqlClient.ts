/**
 * GraphQL Client for WordPress
 * 
 * Uses Apollo Client with Next.js App Router support.
 * Configured for server-side rendering with proper caching.
 */

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

// WordPress GraphQL endpoint - use environment variable or fallback to staging
export const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://bhfestagingurl.wpenginepowered.com';
export const graphqlEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || `${wordpressUrl}/graphql`;

// Create Apollo Client for RSC (React Server Components)
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlEndpoint,
      fetchOptions: {
        cache: 'no-store', // Disable fetch cache for fresh data
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
});

/**
 * Execute a GraphQL query with proper typing
 */
export async function query<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  document: Parameters<ReturnType<typeof getClient>['query']>[0]['query'],
  variables?: TVariables
): Promise<TData> {
  const client = getClient();
  const { data, errors } = await client.query<TData>({
    query: document,
    variables,
  });

  if (errors && errors.length > 0) {
    console.error('GraphQL Errors:', errors);
  }

  return data;
}

/**
 * Execute a GraphQL query with Next.js revalidation
 */
export async function queryWithRevalidation<TData>(
  queryString: string,
  variables?: Record<string, unknown>,
  revalidate: number = 60
): Promise<TData> {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
    next: {
      revalidate,
    },
  });

  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    console.error('GraphQL Errors:', errors);
  }

  return data;
}

/**
 * Simple fetch-based GraphQL query for use in API routes
 */
export async function fetchGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>
): Promise<{ data: TData; errors?: Array<{ message: string }> }> {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
}
