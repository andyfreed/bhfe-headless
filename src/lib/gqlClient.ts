/**
 * GraphQL Client for WordPress
 * 
 * Simple fetch-based GraphQL client for Next.js App Router.
 * No external dependencies required.
 */

// WordPress GraphQL endpoint - use environment variable or fallback to staging
export const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://bhfestagingurl.wpenginepowered.com';
export const graphqlEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || `${wordpressUrl}/graphql`;

/**
 * Execute a GraphQL query with Next.js caching
 */
export async function query<TData = unknown>(
  queryString: string,
  variables?: Record<string, unknown>,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): Promise<TData> {
  const { revalidate = 60, tags } = options || {};

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
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    console.error('GraphQL Errors:', errors);
  }

  return data as TData;
}

/**
 * Execute a GraphQL query with revalidation (alias for backward compatibility)
 */
export async function queryWithRevalidation<TData = unknown>(
  queryString: string,
  variables?: Record<string, unknown>,
  revalidate: number = 60
): Promise<TData> {
  return query<TData>(queryString, variables, { revalidate });
}

/**
 * Simple fetch-based GraphQL query for use in API routes (no caching)
 */
export async function fetchGraphQL<TData = unknown>(
  queryString: string,
  variables?: Record<string, unknown>
): Promise<{ data: TData; errors?: Array<{ message: string }> }> {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
    cache: 'no-store',
  });

  return response.json();
}

/**
 * Get client for compatibility - returns helper object
 */
export function getClient() {
  return {
    query: async <TData = unknown>({ 
      query: queryDoc, 
      variables 
    }: { 
      query: string; 
      variables?: Record<string, unknown>;
    }) => {
      const data = await query<TData>(queryDoc, variables);
      return { data, errors: null };
    },
  };
}
