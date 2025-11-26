/**
 * Preview Banner
 * 
 * Displays a prominent banner when preview mode is active.
 * Provides a button to exit preview mode.
 */

'use client';

import { usePathname } from 'next/navigation';

interface PreviewBannerProps {
  /** Whether preview/draft mode is currently enabled */
  isPreview: boolean;
  /** Optional post type being previewed */
  postType?: string;
  /** Optional post ID being previewed */
  postId?: string | number;
}

export function PreviewBanner({ isPreview, postType, postId }: PreviewBannerProps) {
  const pathname = usePathname();

  if (!isPreview) {
    return null;
  }

  // Build the exit URL with redirect back to public version
  const publicPath = pathname?.replace('/preview', '') || '/';
  const exitUrl = `/api/exit-preview?redirect=${encodeURIComponent(publicPath)}`;

  return (
    <div 
      className="
        fixed top-0 left-0 right-0 z-[9999]
        bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500
        text-white
        py-3 px-4
        shadow-lg
        animate-pulse-subtle
      "
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Preview indicator */}
        <div className="flex items-center gap-3">
          {/* Eye icon */}
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          
          <div>
            <span className="font-bold text-lg">Preview Mode</span>
            {postType && (
              <span className="ml-2 text-white/90 text-sm">
                ({postType}
                {postId && <span> #{postId}</span>})
              </span>
            )}
          </div>
        </div>

        {/* Info text */}
        <p className="text-sm text-white/90 hidden sm:block">
          You are viewing unpublished content. This page is not visible to the public.
        </p>

        {/* Exit button */}
        <a
          href={exitUrl}
          className="
            inline-flex items-center gap-2
            bg-white text-orange-600
            font-semibold
            px-4 py-2
            rounded-lg
            hover:bg-orange-100
            transition-colors
            shadow-md
            flex-shrink-0
          "
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Exit Preview
        </a>
      </div>

      {/* Animated border at bottom */}
      <div 
        className="
          absolute bottom-0 left-0 right-0 h-1
          bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400
          animate-gradient
        "
      />

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

/**
 * Preview Mode Wrapper
 * 
 * Wraps content and adds padding when preview banner is shown.
 */
export function PreviewWrapper({
  children,
  isPreview,
}: {
  children: React.ReactNode;
  isPreview: boolean;
}) {
  return (
    <div className={isPreview ? 'pt-16' : ''}>
      {children}
    </div>
  );
}

