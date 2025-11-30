/**
 * Catch-all Route for Pages and CPTs
 * 
 * Handles all WordPress pages and custom post types dynamically
 * Maps content to appropriate templates based on content type
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getContentNodeByUri,
  getAllPageUris,
  getAllCourseSlugs,
  hasData,
  getTypename,
} from '@/lib/wp';
import { resolveTemplate } from '@/templates';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ uri: string[] }>;
}

/**
 * Generate static params for pages and courses
 */
export async function generateStaticParams() {
  const [pagesResult, coursesResult] = await Promise.all([
    getAllPageUris(),
    getAllCourseSlugs(),
  ]);

  const params: { uri: string[] }[] = [];

  // Add pages (excluding auth routes which have dedicated Next.js pages)
  const excludedAuthRoutes = ['/login/', '/register/', '/forgot-password/'];
  if (hasData(pagesResult) && pagesResult.data.pages?.nodes) {
    pagesResult.data.pages.nodes.forEach((page: { uri?: string | null }) => {
      if (page.uri && page.uri !== '/') {
        // Skip auth routes
        if (excludedAuthRoutes.includes(page.uri)) {
          return;
        }
        // Convert /about/team/ to ['about', 'team']
        const uriSegments = page.uri
          .split('/')
          .filter((segment: string) => segment.length > 0);
        if (uriSegments.length > 0) {
          params.push({ uri: uriSegments });
        }
      }
    });
  }

  // Add courses
  if (hasData(coursesResult) && coursesResult.data.flmsCourses?.nodes) {
    coursesResult.data.flmsCourses.nodes.forEach((course: { uri?: string | null; slug?: string | null }) => {
      if (course.uri) {
        const uriSegments = course.uri
          .split('/')
          .filter((segment: string) => segment.length > 0);
        if (uriSegments.length > 0) {
          params.push({ uri: uriSegments });
        }
      } else if (course.slug) {
        // Fallback to course slug
        params.push({ uri: ['course', course.slug] });
      }
    });
  }

  return params;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uri } = await params;
  const uriPath = '/' + uri.join('/');
  const result = await getContentNodeByUri(uriPath);

  if (!hasData(result) || !result.data.nodeByUri) {
    return {
      title: 'Not Found',
    };
  }

  const node = result.data.nodeByUri;
  const typename = getTypename(node);

  // Extract title based on content type
  let title = 'Page';
  let description = '';

  if (typename === 'Page' && 'title' in node) {
    title = node.title || 'Page';
    if ('content' in node && node.content) {
      description = node.content.replace(/<[^>]*>/g, '').substring(0, 160);
    }
  } else if (typename === 'Post' && 'title' in node) {
    title = node.title || 'Post';
    if ('excerpt' in node && node.excerpt) {
      description = node.excerpt.replace(/<[^>]*>/g, '').substring(0, 160);
    }
  } else if (typename === 'FlmsCourse' && 'title' in node) {
    title = node.title || 'Course';
    if ('courseDescription' in node && node.courseDescription) {
      description = node.courseDescription.replace(/<[^>]*>/g, '').substring(0, 160);
    }
  } else if (typename === 'Category' && 'name' in node) {
    title = node.name || 'Category';
    if ('description' in node) {
      description = node.description || '';
    }
  }

  return {
    title,
    description,
  };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { uri } = await params;
  const uriPath = '/' + uri.join('/');
  
  const result = await getContentNodeByUri(uriPath);

  if (!hasData(result) || !result.data.nodeByUri) {
    notFound();
  }

  const node = result.data.nodeByUri;
  const typename = getTypename(node);

  // Resolve and render the appropriate template
  const Template = resolveTemplate(typename, node);

  return <Template data={node} />;
}
