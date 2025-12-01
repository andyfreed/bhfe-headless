/**
 * Library Exports
 * 
 * Central export point for all library functions.
 */

// GraphQL Client
export {
  getClient,
  query,
  queryWithRevalidation,
  graphqlEndpoint,
  wordpressUrl,
} from './gqlClient';

// WordPress Data Fetchers
export {
  // Posts
  getAllPosts,
  getPost,
  getAllPostSlugs,
  
  // Pages
  getAllPages,
  getPage,
  getAllPageUris,
  
  // Generic Content
  getContentNodeByUri,
  getContentTypeByUri,
  
  // Courses
  getAllCourses,
  getCourseCards,
  getCourse,
  getAllCourseSlugs,
  getFeaturedCourses,
  
  // Site Settings
  getSiteSettings,
  getSiteData,
  
  // Helpers
  extractNodes,
  hasData,
  getTypename,
  isPage,
  isPost,
  isFlmsCourse,
  isCategory,
  isTag,
} from './wp';

// Preview Utilities
export {
  getPreviewData,
  isPreviewMode,
  getPreviewPostId,
  getPreviewPostType,
  type PreviewData,
} from './preview';
