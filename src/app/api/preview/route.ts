/**
 * Preview API Route
 * 
 * Enables WordPress draft preview functionality.
 * Validates the preview token from WordPress and sets preview cookies.
 * 
 * How it works:
 * 1. Editor clicks "Preview" in WordPress
 * 2. WordPress redirects to /api/preview?p=123&preview=true&token=xxx
 * 3. This route validates the token with WordPress
 * 4. If valid, sets preview mode cookies and redirects to the preview URL
 */

import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://beacon-hill-staging.local';
const FAUST_SECRET = process.env.FAUST_SECRET_KEY;

/**
 * Verify the preview token with WordPress
 */
async function verifyPreviewToken(token: string): Promise<{
  valid: boolean;
  postId?: number;
  postType?: string;
  uri?: string;
}> {
  if (!FAUST_SECRET) {
    console.error('FAUST_SECRET_KEY is not configured');
    return { valid: false };
  }

  try {
    // Verify token with WordPress Faust plugin
    const response = await fetch(`${WORDPRESS_URL}/wp-json/faustwp/v1/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: token,
        secret: FAUST_SECRET,
      }),
    });

    if (!response.ok) {
      console.error('Token verification failed:', response.status);
      return { valid: false };
    }

    const data = await response.json();
    
    return {
      valid: true,
      postId: data.post_id,
      postType: data.post_type,
      uri: data.uri,
    };
  } catch (error) {
    console.error('Error verifying preview token:', error);
    return { valid: false };
  }
}

/**
 * Build the preview URL based on post type and ID
 */
function buildPreviewUrl(postId: number, postType: string, uri?: string): string {
  // If we have a URI, use it
  if (uri) {
    return `/preview${uri.startsWith('/') ? uri : `/${uri}`}`;
  }

  // Build URL based on post type
  switch (postType) {
    case 'post':
      return `/preview/post/${postId}`;
    case 'page':
      return `/preview/page/${postId}`;
    case 'flms-courses':
      return `/preview/course/${postId}`;
    default:
      return `/preview/${postType}/${postId}`;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Get preview parameters
  const postId = searchParams.get('p') || searchParams.get('post_id');
  const previewToken = searchParams.get('preview_id') || searchParams.get('token');
  const postType = searchParams.get('post_type') || 'post';
  const uri = searchParams.get('uri');

  // Validate required parameters
  if (!postId && !previewToken) {
    return NextResponse.json(
      { error: 'Missing preview parameters' },
      { status: 400 }
    );
  }

  // If we have a token, verify it
  if (previewToken) {
    const verification = await verifyPreviewToken(previewToken);
    
    if (!verification.valid) {
      return NextResponse.json(
        { error: 'Invalid preview token' },
        { status: 401 }
      );
    }

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    // Set preview cookies
    const cookieStore = await cookies();
    cookieStore.set('wp_preview_post_id', String(verification.postId || postId), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    cookieStore.set('wp_preview_post_type', verification.postType || postType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    // Build and redirect to preview URL
    const previewUrl = buildPreviewUrl(
      verification.postId || Number(postId),
      verification.postType || postType,
      verification.uri || uri || undefined
    );

    return redirect(previewUrl);
  }

  // Fallback: Enable preview without token verification (less secure)
  // This is useful for development or when Faust plugin isn't configured
  if (postId) {
    const draft = await draftMode();
    draft.enable();

    const cookieStore = await cookies();
    cookieStore.set('wp_preview_post_id', postId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    cookieStore.set('wp_preview_post_type', postType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    const previewUrl = buildPreviewUrl(Number(postId), postType, uri || undefined);
    return redirect(previewUrl);
  }

  return NextResponse.json(
    { error: 'Missing post ID' },
    { status: 400 }
  );
}

