/**
 * GraphQL Client
 * 
 * Typed GraphQL client for server-side data fetching.
 * Uses Apollo Client under the hood with proper caching strategies.
 */

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  type DocumentNode,
  type TypedDocumentNode,
  type OperationVariables,
  type ApolloQueryResult,
  type NormalizedCacheObject,
} from '@apollo/client';

// Environment configuration
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://beacon-hill-staging.local';
const GRAPHQL_ENDPOINT = `${WORDPRESS_URL}/graphql`;

/**
 * Cache configuration for Apollo Client
 */
const cache = new InMemoryCache({
  typePolicies: {
    // Merge paginated queries properly
    RootQuery: {
      queryType: true,
    },
    // Normalize course objects by databaseId
    FlmsCourse: {
      keyFields: ['databaseId'],
    },
    // Normalize posts by databaseId
    Post: {
      keyFields: ['databaseId'],
    },
    // Normalize pages by databaseId
    Page: {
      keyFields: ['databaseId'],
    },
  },
});

/**
 * Create a new Apollo Client instance
 * For server-side rendering, we create a new client per request
 */
function createClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      fetchOptions: {
        // Disable caching for SSR to ensure fresh data
        cache: 'no-store',
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}

// Singleton client for client-side usage
let clientSideClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Get Apollo Client instance
 * - Server-side: Creates new instance per request
 * - Client-side: Returns singleton instance
 */
export function getClient(): ApolloClient<NormalizedCacheObject> {
  // Server-side: always create fresh client
  if (typeof window === 'undefined') {
    return createClient();
  }

  // Client-side: use singleton
  if (!clientSideClient) {
    clientSideClient = new ApolloClient({
      cache,
      link: new HttpLink({
        uri: GRAPHQL_ENDPOINT,
      }),
    });
  }

  return clientSideClient;
}

/**
 * Query result type
 */
export type QueryResult<TData> = {
  data: TData | null;
  error: Error | null;
  loading: boolean;
};

/**
 * Execute a typed GraphQL query
 * 
 * @param document - The GraphQL document (query)
 * @param variables - Query variables
 * @returns Typed query result
 * 
 * @example
 * ```ts
 * import { GetCoursesDocument, GetCoursesQuery } from '@/graphql/queries/getCourses.generated';
 * 
 * const result = await query(GetCoursesDocument, { first: 10 });
 * // result.data is typed as GetCoursesQuery
 * ```
 */
export async function query<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
): Promise<QueryResult<TData>> {
  const client = getClient();

  try {
    const result: ApolloQueryResult<TData> = await client.query({
      query: document,
      variables,
    });

    return {
      data: result.data,
      error: result.error ? new Error(result.error.message) : null,
      loading: false,
    };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[GraphQL Error]', error.message);
    
    return {
      data: null,
      error,
      loading: false,
    };
  }
}

/**
 * Execute a GraphQL query with revalidation options for Next.js
 * 
 * @param document - The GraphQL document
 * @param variables - Query variables
 * @param options - Fetch options including revalidation
 */
export async function queryWithRevalidation<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  document: DocumentNode | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
  options: {
    revalidate?: number | false;
    tags?: string[];
  } = {}
): Promise<QueryResult<TData>> {
  const { revalidate = 60, tags } = options;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: (document as any).loc?.source?.body || document,
        variables,
      }),
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('[GraphQL Errors]', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    return {
      data: result.data as TData,
      error: null,
      loading: false,
    };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error('[GraphQL Fetch Error]', error.message);
    
    return {
      data: null,
      error,
      loading: false,
    };
  }
}

/**
 * GraphQL endpoint URL (for debugging/logging)
 */
export const graphqlEndpoint = GRAPHQL_ENDPOINT;

/**
 * WordPress URL (for image optimization, etc.)
 */
export const wordpressUrl = WORDPRESS_URL;

