/**
 * WordPress Data Fetchers
 * 
 * Type-safe data fetching functions for WordPress content.
 * All functions use the GraphQL codegen types for full type safety.
 */

import { gql } from '@apollo/client';
import { query, queryWithRevalidation, type QueryResult } from './gqlClient';

// Import generated types - Posts
import type {
  GetPostsQuery,
  GetPostsQueryVariables,
} from '@/graphql/queries/getPosts.generated';

import type {
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  GetAllPostSlugsQuery,
} from '@/graphql/queries/getPostBySlug.generated';

// Import generated types - Pages
import type {
  GetPagesQuery,
  GetAllPageUrisQuery,
} from '@/graphql/queries/getPages.generated';

import type {
  GetPageByUriQuery,
  GetPageByUriQueryVariables,
} from '@/graphql/queries/getPageByUri.generated';

import type {
  GetContentByUriQuery,
  GetContentByUriQueryVariables,
  GetContentTypeByUriQuery,
  GetContentTypeByUriQueryVariables,
} from '@/graphql/queries/getContentByUri.generated';

import type {
  GetCoursesQuery,
  GetCoursesQueryVariables,
  GetCourseBySlugQuery,
  GetCourseBySlugQueryVariables,
  GetCourseByIdQuery,
  GetCourseByIdQueryVariables,
  GetCourseCardsQuery,
  GetAllCourseSlugsQuery,
  GetFeaturedCoursesHomepageQuery,
} from '@/graphql/queries/getCourses.generated';

// Import generated types - Site Settings
import type {
  GetSiteSettingsQuery,
  GetSiteDataQuery,
} from '@/graphql/queries/getSiteSettings.generated';

// ============================================
// POSTS
// ============================================

const GET_POSTS = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        databaseId
        uri
        slug
        status
        date
        modified
        title
        excerpt
        content
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
        categories(first: 5) {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      uri
      slug
      status
      date
      modified
      title
      content
      excerpt
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories(first: 5) {
        nodes {
          id
          name
          slug
        }
      }
      author {
        node {
          id
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }
    }
  }
`;

const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs($first: Int = 100) {
    posts(first: $first) {
      nodes {
        slug
        uri
        modified
      }
    }
  }
`;

/**
 * Get paginated posts
 */
export async function getAllPosts(
  options: {
    first?: number;
    after?: string;
    revalidate?: number;
  } = {}
): Promise<QueryResult<GetPostsQuery>> {
  const { first = 10, after, revalidate = 60 } = options;

  return queryWithRevalidation<GetPostsQuery, GetPostsQueryVariables>(
    GET_POSTS,
    { first, after },
    { revalidate, tags: ['posts'] }
  );
}

/**
 * Get a single post by slug
 */
export async function getPost(
  slug: string,
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetPostBySlugQuery>> {
  const { revalidate = 60 } = options;

  return queryWithRevalidation<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
    GET_POST_BY_SLUG,
    { slug },
    { revalidate, tags: ['posts', `post-${slug}`] }
  );
}

/**
 * Get all post slugs (for static generation)
 */
export async function getAllPostSlugs(): Promise<QueryResult<GetAllPostSlugsQuery>> {
  return query<GetAllPostSlugsQuery>(GET_ALL_POST_SLUGS, { first: 500 });
}

// ============================================
// PAGES
// ============================================

const GET_PAGES = gql`
  query GetPages($first: Int = 100) {
    pages(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        uri
        slug
        status
        date
        modified
        title
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
        parent {
          node {
            ... on Page {
              id
              slug
              uri
              title
            }
          }
        }
      }
    }
  }
`;

const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      uri
      slug
      status
      date
      modified
      title
      content
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      parent {
        node {
          ... on Page {
            id
            title
            uri
          }
        }
      }
      children {
        nodes {
          ... on Page {
            id
            title
            uri
          }
        }
      }
    }
  }
`;

const GET_ALL_PAGE_URIS = gql`
  query GetAllPageUris($first: Int = 100) {
    pages(first: $first, where: { status: PUBLISH }) {
      nodes {
        uri
        slug
        modified
      }
    }
  }
`;

/**
 * Get all pages
 */
export async function getAllPages(
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetPagesQuery>> {
  const { revalidate = 300 } = options;

  return queryWithRevalidation<GetPagesQuery>(
    GET_PAGES,
    { first: 100 },
    { revalidate, tags: ['pages'] }
  );
}

/**
 * Get a single page by URI
 */
export async function getPage(
  uri: string,
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetPageByUriQuery>> {
  const { revalidate = 60 } = options;

  // Ensure URI starts with /
  const normalizedUri = uri.startsWith('/') ? uri : `/${uri}`;

  return queryWithRevalidation<GetPageByUriQuery, GetPageByUriQueryVariables>(
    GET_PAGE_BY_URI,
    { uri: normalizedUri },
    { revalidate, tags: ['pages', `page-${normalizedUri}`] }
  );
}

/**
 * Get all page URIs (for static generation)
 */
export async function getAllPageUris(): Promise<QueryResult<GetAllPageUrisQuery>> {
  return query<GetAllPageUrisQuery>(GET_ALL_PAGE_URIS, { first: 500 });
}

// ============================================
// CONTENT NODE (GENERIC)
// ============================================

const GET_CONTENT_BY_URI = gql`
  query GetContentByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri
      
      ... on Page {
        databaseId
        slug
        status
        date
        modified
        title
        content
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
      }
      
      ... on Post {
        databaseId
        slug
        status
        date
        modified
        title
        content
        excerpt
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
        categories(first: 5) {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            id
            name
            avatar {
              url
            }
          }
        }
      }
      
      ... on FlmsCourse {
        databaseId
        slug
        status
        date
        modified
        title
        courseNumber
        courseDescription
        coursePreview
        wooProductId
        courseCredits {
          type
          name
          credits
        }
        courseMaterials {
          title
          file
        }
        masterCourseListFields {
          iarApprovalDate
          notes
        }
      }
      
      ... on Category {
        databaseId
        name
        slug
        description
        count
      }
      
      ... on Tag {
        databaseId
        name
        slug
        count
      }
    }
  }
`;

const GET_CONTENT_TYPE_BY_URI = gql`
  query GetContentTypeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri
      ... on ContentNode {
        contentTypeName
        status
      }
      ... on TermNode {
        taxonomyName
      }
    }
  }
`;

/**
 * Get any content node by URI (page, post, course, category, etc.)
 * This is the main resolver for dynamic routing
 */
export async function getContentNodeByUri(
  uri: string,
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetContentByUriQuery>> {
  const { revalidate = 60 } = options;

  // Normalize URI
  const normalizedUri = uri.startsWith('/') ? uri : `/${uri}`;

  return queryWithRevalidation<GetContentByUriQuery, GetContentByUriQueryVariables>(
    GET_CONTENT_BY_URI,
    { uri: normalizedUri },
    { revalidate, tags: ['content', `content-${normalizedUri}`] }
  );
}

/**
 * Get content type info for a URI (lightweight check for routing)
 */
export async function getContentTypeByUri(
  uri: string
): Promise<QueryResult<GetContentTypeByUriQuery>> {
  const normalizedUri = uri.startsWith('/') ? uri : `/${uri}`;

  return query<GetContentTypeByUriQuery, GetContentTypeByUriQueryVariables>(
    GET_CONTENT_TYPE_BY_URI,
    { uri: normalizedUri }
  );
}

// ============================================
// COURSES
// ============================================

const GET_COURSES = gql`
  query GetCourses($first: Int = 50, $after: String) {
    flmsCourses(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        uri
        slug
        date
        modified
        courseNumber
        courseDescription
        coursePreview
        wooProductId
        courseCredits {
          type
          name
          credits
        }
        courseMaterials {
          title
          file
        }
        masterCourseListFields {
          iarApprovalDate
          notes
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const GET_COURSE_CARDS = gql`
  query GetCourseCards($first: Int = 50, $after: String) {
    flmsCourses(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        uri
        courseNumber
        courseCredits {
          name
          credits
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_COURSE_BY_SLUG = gql`
  query GetCourseBySlug($slug: ID!) {
    flmsCourse(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      uri
      slug
      date
      modified
      courseNumber
      courseDescription
      coursePreview
      wooProductId
      courseCredits {
        type
        name
        credits
      }
      courseMaterials {
        title
        file
      }
      masterCourseListFields {
        iarApprovalDate
        notes
      }
    }
  }
`;

const GET_ALL_COURSE_SLUGS = gql`
  query GetAllCourseSlugs($first: Int = 200) {
    flmsCourses(first: $first) {
      nodes {
        uri
        slug
        databaseId
        modified
      }
    }
  }
`;

const GET_FEATURED_COURSES = gql`
  query GetFeaturedCoursesHomepage($first: Int = 6) {
    flmsCourses(first: $first) {
      nodes {
        id
        databaseId
        title
        uri
        courseNumber
        courseDescription
        courseCredits {
          name
          credits
        }
      }
    }
  }
`;

/**
 * Get all courses with pagination
 */
export async function getAllCourses(
  options: {
    first?: number;
    after?: string;
    revalidate?: number;
  } = {}
): Promise<QueryResult<GetCoursesQuery>> {
  const { first = 50, after, revalidate = 300 } = options;

  return queryWithRevalidation<GetCoursesQuery, GetCoursesQueryVariables>(
    GET_COURSES,
    { first, after },
    { revalidate, tags: ['courses'] }
  );
}

/**
 * Get course cards (lightweight for listings)
 */
export async function getCourseCards(
  options: {
    first?: number;
    after?: string;
    revalidate?: number;
  } = {}
): Promise<QueryResult<GetCourseCardsQuery>> {
  const { first = 50, after, revalidate = 300 } = options;

  return queryWithRevalidation<GetCourseCardsQuery>(
    GET_COURSE_CARDS,
    { first, after },
    { revalidate, tags: ['courses'] }
  );
}

/**
 * Get a single course by slug
 */
export async function getCourse(
  slug: string,
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetCourseBySlugQuery>> {
  const { revalidate = 60 } = options;

  return queryWithRevalidation<GetCourseBySlugQuery, GetCourseBySlugQueryVariables>(
    GET_COURSE_BY_SLUG,
    { slug },
    { revalidate, tags: ['courses', `course-${slug}`] }
  );
}

/**
 * Get all course slugs (for static generation)
 */
export async function getAllCourseSlugs(): Promise<QueryResult<GetAllCourseSlugsQuery>> {
  return query<GetAllCourseSlugsQuery>(GET_ALL_COURSE_SLUGS, { first: 500 });
}

/**
 * Get featured courses for homepage
 */
export async function getFeaturedCourses(
  count: number = 6,
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetFeaturedCoursesHomepageQuery>> {
  const { revalidate = 300 } = options;

  return queryWithRevalidation<GetFeaturedCoursesHomepageQuery>(
    GET_FEATURED_COURSES,
    { first: count },
    { revalidate, tags: ['courses', 'featured-courses'] }
  );
}

// ============================================
// SITE SETTINGS
// ============================================

const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
      language
      timezone
      dateFormat
      timeFormat
    }
  }
`;

const GET_SITE_DATA = gql`
  query GetSiteData {
    generalSettings {
      title
      description
      url
    }
  }
`;

/**
 * Get site settings
 */
export async function getSiteSettings(
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetSiteSettingsQuery>> {
  const { revalidate = 3600 } = options; // Cache for 1 hour

  return queryWithRevalidation<GetSiteSettingsQuery>(
    GET_SITE_SETTINGS,
    {},
    { revalidate, tags: ['settings'] }
  );
}

/**
 * Get site data (title, description, URL)
 */
export async function getSiteData(
  options: { revalidate?: number } = {}
): Promise<QueryResult<GetSiteDataQuery>> {
  const { revalidate = 3600 } = options;

  return queryWithRevalidation<GetSiteDataQuery>(
    GET_SITE_DATA,
    {},
    { revalidate, tags: ['settings'] }
  );
}

// ============================================
// HELPERS
// ============================================

/**
 * Extract nodes from a connection
 */
export function extractNodes<T>(connection: { nodes: T[] } | null | undefined): T[] {
  return connection?.nodes ?? [];
}

/**
 * Check if a query result has data
 */
export function hasData<T>(result: QueryResult<T>): result is QueryResult<T> & { data: T } {
  return result.data !== null && result.error === null;
}

/**
 * Get the typename of a node
 */
export function getTypename(node: { __typename?: string } | null | undefined): string | null {
  return node?.__typename ?? null;
}

/**
 * Type guards for content nodes
 */
export function isPage(node: { __typename?: string }): boolean {
  return node.__typename === 'Page';
}

export function isPost(node: { __typename?: string }): boolean {
  return node.__typename === 'Post';
}

export function isFlmsCourse(node: { __typename?: string }): boolean {
  return node.__typename === 'FlmsCourse';
}

export function isCategory(node: { __typename?: string }): boolean {
  return node.__typename === 'Category';
}

export function isTag(node: { __typename?: string }): boolean {
  return node.__typename === 'Tag';
}

