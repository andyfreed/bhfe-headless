/**
 * Staging Badge
 * 
 * Prominent badge shown on all pages to indicate staging environment.
 */

'use client';

export function StagingBadge() {
  return (
    <div
      className="
        fixed top-0 left-0 z-[99999]
        bg-red-600 text-white
        text-xs font-bold uppercase tracking-wider
        px-3 py-1.5
        shadow-lg
        rotate-[-45deg]
        origin-center
        -translate-x-8 translate-y-3
        pointer-events-none
        select-none
      "
      style={{
        transform: 'rotate(-45deg) translateX(-30%) translateY(50%)',
      }}
      aria-hidden="true"
    >
      STAGING
    </div>
  );
}

/**
 * Alternative: Top banner style staging indicator
 */
export function StagingBanner() {
  return (
    <div
      className="
        fixed top-0 left-0 right-0 z-[99998]
        bg-red-600 text-white
        text-center text-xs font-bold uppercase tracking-wider
        py-1
        pointer-events-none
        select-none
      "
      aria-hidden="true"
    >
      ⚠️ STAGING ENVIRONMENT - NOT FOR PRODUCTION ⚠️
    </div>
  );
}

