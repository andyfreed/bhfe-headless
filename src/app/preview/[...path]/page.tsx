/**
 * Preview Page (Catch-all)
 * 
 * Handles preview for all content types: posts, pages, and CPTs.
 * Only accessible when draft mode is enabled.
 */

import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getPreviewData } from '@/lib/preview';
import { PreviewBanner, PreviewWrapper } from '@/components/PreviewBanner';
import { resolveTemplate } from '@/templates';
import { query } from '@/lib/gqlClient';

// Force dynamic rendering for previews
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GraphQL query for preview content
const GET_PREVIEW_CONTENT = `
  query GetPreviewContent($id: ID!, $asPreview: Boolean = true) {
    contentNode(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
      __typename
      id
      databaseId
      uri
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithContentEditor {
        content
      }
      ... on NodeWithExcerpt {
        excerpt
      }
      ... on NodeWithFeaturedImage {
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
      ... on Post {
        date
        categories {
          nodes {
            name
            uri
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
      ... on Page {
        template {
          templateName
        }
        children {
          nodes {
            ... on Page {
              title
              uri
            }
          }
        }
      }
      ... on FlmsCourse {
        courseNumber
        courseCredits {
          name
          credits
        }
        courseDescription
        coursePreview
        courseMaterials {
          title
          file
        }
        wooProductId
      }
    }
  }
`;

interface PreviewPageProps {
  params: { path: string[] };
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  return {
    title: 'Preview Mode',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  // Check if we're in preview mode
  const { isPreview, postId, postType } = await getPreviewData();

  if (!isPreview) {
    // Not in preview mode, redirect to exit
    redirect('/api/exit-preview');
  }

  // Extract post ID from path if not in cookies
  // Path format: /preview/post/123 or /preview/page/123 or /preview/course/123
  let resolvedPostId = postId;
  let resolvedPostType = postType;

  if (!resolvedPostId && params.path) {
    const path = params.path;
    // Check if last segment is a number (post ID)
    const lastSegment = path[path.length - 1];
    if (/^\d+$/.test(lastSegment)) {
      resolvedPostId = lastSegment;
      // Determine type from path
      if (path.includes('post')) {
        resolvedPostType = 'post';
      } else if (path.includes('page')) {
        resolvedPostType = 'page';
      } else if (path.includes('course')) {
        resolvedPostType = 'flms-courses';
      }
    }
  }

  if (!resolvedPostId) {
    return (
      <>
        <PreviewBanner isPreview={isPreview} postType={resolvedPostType} />
        <PreviewWrapper isPreview={isPreview}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">Preview Error</h1>
              <p className="text-slate-600">No post ID found for preview.</p>
            </div>
          </div>
        </PreviewWrapper>
      </>
    );
  }

  // Fetch the preview content
  try {
    const result = await query<{ contentNode: any }>(
      GET_PREVIEW_CONTENT,
      {
        id: resolvedPostId,
        asPreview: true,
      },
      { revalidate: 0 }
    );

    if (result.error || !result.data?.contentNode) {
      console.error('Preview fetch error:', result.error || 'No content found');
      return (
        <>
          <PreviewBanner isPreview={isPreview} postType={resolvedPostType} postId={resolvedPostId} />
          <PreviewWrapper isPreview={isPreview}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Preview Not Available</h1>
                <p className="text-slate-600 mb-4">
                  Unable to load preview content. This might be because:
                </p>
                <ul className="text-slate-500 text-left max-w-md mx-auto list-disc pl-6">
                  <li>The post doesn&apos;t exist</li>
                  <li>You don&apos;t have permission to view it</li>
                  <li>The preview token has expired</li>
                </ul>
              </div>
            </div>
          </PreviewWrapper>
        </>
      );
    }

    const node = result.data.contentNode;
    const typename = node.__typename || 'ContentNode';
    const templateName = node.template?.templateName;

    // Get the appropriate template
    const Template = resolveTemplate(typename, node);

    return (
      <>
        <PreviewBanner 
          isPreview={isPreview} 
          postType={typename} 
          postId={node.databaseId}
        />
        <PreviewWrapper isPreview={isPreview}>
          <Template data={node} />
        </PreviewWrapper>
      </>
    );
  } catch (error) {
    console.error('Preview page error:', error);
    return (
      <>
        <PreviewBanner isPreview={isPreview} postType={resolvedPostType} postId={resolvedPostId} />
        <PreviewWrapper isPreview={isPreview}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">Preview Error</h1>
              <p className="text-slate-600">
                An error occurred while loading the preview.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <pre className="mt-4 text-left bg-slate-100 p-4 rounded text-sm overflow-auto max-w-2xl">
                  {String(error)}
                </pre>
              )}
            </div>
          </div>
        </PreviewWrapper>
      </>
    );
  }
}
