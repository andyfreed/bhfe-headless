/**
 * Preview Utilities
 * 
 * Helper functions for working with WordPress preview mode.
 */

import { cookies, draftMode } from 'next/headers';

export interface PreviewData {
  isPreview: boolean;
  postId?: string;
  postType?: string;
}

/**
 * Get preview data from cookies
 */
export async function getPreviewData(): Promise<PreviewData> {
  const draft = await draftMode();
  const cookieStore = await cookies();
  
  const isPreview = draft.isEnabled;
  const postId = cookieStore.get('wp_preview_post_id')?.value;
  const postType = cookieStore.get('wp_preview_post_type')?.value;

  return {
    isPreview,
    postId,
    postType,
  };
}

/**
 * Check if we're in preview mode
 */
export async function isPreviewMode(): Promise<boolean> {
  const draft = await draftMode();
  return draft.isEnabled;
}

/**
 * Get the preview post ID from cookies
 */
export async function getPreviewPostId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('wp_preview_post_id')?.value;
}

/**
 * Get the preview post type from cookies
 */
export async function getPreviewPostType(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('wp_preview_post_type')?.value;
}

