/**
 * GraphQL Operations Index
 * 
 * This file re-exports all GraphQL operations for easy importing.
 * After running `npm run codegen`, TypeScript types will be generated
 * in src/generated/graphql.ts
 * 
 * Usage:
 * ```ts
 * import { GetPostsDocument, GetPostsQuery } from '@/generated/graphql';
 * ```
 */

// Re-export generated types (after running codegen)
export * from '../generated/graphql';

// GraphQL document strings for direct use with Apollo Client
// These are imported from .graphql files

/**
 * Fragment Locations:
 * - src/graphql/fragments/ContentNodeFields.graphql
 * - src/graphql/fragments/FeaturedImageFields.graphql
 * - src/graphql/fragments/SeoFields.graphql
 * - src/graphql/fragments/TaxonomyFields.graphql
 * - src/graphql/fragments/CourseFields.graphql
 * - src/graphql/fragments/FlexibleContentFields.graphql
 */

/**
 * Query Locations:
 * - src/graphql/queries/getPosts.graphql
 * - src/graphql/queries/getPostBySlug.graphql
 * - src/graphql/queries/getPages.graphql
 * - src/graphql/queries/getPageByUri.graphql
 * - src/graphql/queries/getContentByUri.graphql
 * - src/graphql/queries/getCourses.graphql
 * - src/graphql/queries/getMenus.graphql
 * - src/graphql/queries/getSiteSettings.graphql
 */

