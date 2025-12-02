/**
 * GraphQL Client for WordPress
 * 
 * Simple fetch-based GraphQL client for Next.js App Router.
 * No external dependencies required.
 */

// WordPress GraphQL endpoint - use environment variable or fallback to staging
export const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://beaconhilldevs.wpenginepowered.com';
export const graphqlEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || `${wordpressUrl}/graphql`;

/**
 * Query result wrapper type
 */
export type QueryResult<T> = {
  data: T | null;
  error: Error | null;
};

/**
 * Execute a GraphQL query with Next.js caching
 */
export async function query<TData = unknown, TVariables = Record<string, unknown>>(
  queryString: string,
  variables?: TVariables,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): Promise<QueryResult<TData>> {
  const { revalidate = 60, tags } = options || {};

  try {
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
      return {
        data: null,
        error: new Error(`GraphQL request failed: ${response.status} ${response.statusText}`),
      };
    }

    const { data, errors } = await response.json();

    if (errors && errors.length > 0) {
      console.error('GraphQL Errors:', errors);
      return {
        data: data as TData | null,
        error: new Error(errors[0]?.message || 'GraphQL error'),
      };
    }

    return {
      data: data as TData,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    };
  }
}

/**
 * Execute a GraphQL query with revalidation
 */
export async function queryWithRevalidation<TData = unknown, TVariables = Record<string, unknown>>(
  queryString: string,
  variables?: TVariables,
  options?: {
    revalidate?: number;
    tags?: string[];
  }
): Promise<QueryResult<TData>> {
  const { revalidate = 60, tags } = options || {};
  return query<TData, TVariables>(queryString, variables, { revalidate, tags });
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
      const result = await query<TData>(queryDoc, variables);
      return { data: result.data, errors: result.error ? [result.error] : null };
    },
  };
}
