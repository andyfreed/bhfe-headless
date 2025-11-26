/**
 * Exit Preview API Route
 * 
 * Disables preview mode and clears preview cookies.
 * Redirects back to the public version of the page.
 */

import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Get the redirect URL (where to go after exiting preview)
  const redirectUrl = searchParams.get('redirect') || '/';

  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  // Clear preview cookies
  const cookieStore = await cookies();
  cookieStore.delete('wp_preview_post_id');
  cookieStore.delete('wp_preview_post_type');

  // Redirect to the specified URL or homepage
  return redirect(redirectUrl);
}

export async function POST(request: NextRequest) {
  // Also support POST for programmatic exit
  const draft = await draftMode();
  draft.disable();

  const cookieStore = await cookies();
  cookieStore.delete('wp_preview_post_id');
  cookieStore.delete('wp_preview_post_type');

  return NextResponse.json({ success: true });
}

