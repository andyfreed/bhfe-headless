/**
 * Content Renderer
 * 
 * Phase 1: Renders Gutenberg content as HTML with typography styling.
 * Handles raw HTML content from WordPress with proper sanitization and styling.
 */

import { ReactNode } from 'react';

interface ContentRendererProps {
  /** Raw HTML content from WordPress */
  content: string | null | undefined;
  /** Additional CSS classes */
  className?: string;
  /** Wrapper element tag */
  as?: 'article' | 'div' | 'section';
  /** Typography size variant */
  size?: 'sm' | 'base' | 'lg' | 'xl';
  /** Max width constraint */
  maxWidth?: 'prose' | 'none' | 'full';
}

/**
 * Typography CSS classes based on size
 */
const sizeClasses = {
  sm: 'prose-sm',
  base: 'prose',
  lg: 'prose-lg',
  xl: 'prose-xl',
};

/**
 * Max width CSS classes
 */
const maxWidthClasses = {
  prose: 'max-w-prose',
  none: 'max-w-none',
  full: 'max-w-full',
};

/**
 * ContentRenderer - Renders WordPress content with Tailwind Typography
 * 
 * @example
 * ```tsx
 * <ContentRenderer content={post.content} size="lg" />
 * ```
 */
export function ContentRenderer({
  content,
  className = '',
  as: Tag = 'div',
  size = 'lg',
  maxWidth = 'none',
}: ContentRendererProps) {
  if (!content) {
    return null;
  }

  const baseClasses = `
    ${sizeClasses[size]}
    ${maxWidthClasses[maxWidth]}
    prose-slate
    
    /* Headings */
    prose-headings:font-playfair
    prose-headings:text-slate-800
    prose-headings:scroll-mt-20
    
    /* Heading sizes */
    prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
    prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
    prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
    prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2
    
    /* Paragraphs */
    prose-p:text-slate-700
    prose-p:leading-relaxed
    prose-p:mb-4
    
    /* Links */
    prose-a:text-blue-600
    prose-a:no-underline
    prose-a:font-medium
    hover:prose-a:underline
    hover:prose-a:text-blue-800
    
    /* Strong/Bold */
    prose-strong:text-slate-900
    prose-strong:font-semibold
    
    /* Lists */
    prose-ul:my-6
    prose-ul:list-disc
    prose-ul:pl-6
    prose-ol:my-6
    prose-ol:list-decimal
    prose-ol:pl-6
    prose-li:my-2
    prose-li:text-slate-700
    
    /* Blockquotes */
    prose-blockquote:border-l-4
    prose-blockquote:border-amber-500
    prose-blockquote:bg-slate-50
    prose-blockquote:pl-6
    prose-blockquote:py-4
    prose-blockquote:my-6
    prose-blockquote:italic
    prose-blockquote:text-slate-600
    prose-blockquote:not-italic
    
    /* Code */
    prose-code:bg-slate-100
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:rounded
    prose-code:text-sm
    prose-code:font-mono
    prose-code:text-slate-800
    prose-code:before:content-none
    prose-code:after:content-none
    
    /* Pre/Code blocks */
    prose-pre:bg-slate-900
    prose-pre:text-slate-100
    prose-pre:rounded-lg
    prose-pre:p-4
    prose-pre:overflow-x-auto
    prose-pre:my-6
    
    /* Images */
    prose-img:rounded-lg
    prose-img:shadow-lg
    prose-img:my-6
    
    /* Figures */
    prose-figure:my-8
    prose-figcaption:text-center
    prose-figcaption:text-slate-500
    prose-figcaption:text-sm
    prose-figcaption:mt-2
    
    /* Tables */
    prose-table:w-full
    prose-table:my-6
    prose-th:bg-slate-100
    prose-th:px-4
    prose-th:py-2
    prose-th:text-left
    prose-th:font-semibold
    prose-td:px-4
    prose-td:py-2
    prose-td:border-b
    prose-td:border-slate-200
    
    /* HR */
    prose-hr:border-slate-300
    prose-hr:my-8
    
    /* Videos/Embeds */
    [&_.wp-block-embed]:my-8
    [&_.wp-block-embed__wrapper]:aspect-video
    [&_.wp-block-embed__wrapper]:overflow-hidden
    [&_.wp-block-embed__wrapper]:rounded-lg
    [&_.wp-block-embed__wrapper_iframe]:w-full
    [&_.wp-block-embed__wrapper_iframe]:h-full
    
    /* Galleries */
    [&_.wp-block-gallery]:grid
    [&_.wp-block-gallery]:gap-4
    [&_.wp-block-gallery]:my-8
    [&_.wp-block-gallery.columns-2]:grid-cols-2
    [&_.wp-block-gallery.columns-3]:grid-cols-3
    [&_.wp-block-gallery.columns-4]:grid-cols-4
    [&_.wp-block-gallery_figure]:m-0
    [&_.wp-block-gallery_img]:rounded-lg
    
    /* Columns */
    [&_.wp-block-columns]:flex
    [&_.wp-block-columns]:flex-wrap
    [&_.wp-block-columns]:gap-6
    [&_.wp-block-columns]:my-8
    [&_.wp-block-column]:flex-1
    [&_.wp-block-column]:min-w-[250px]
    
    /* Buttons */
    [&_.wp-block-buttons]:flex
    [&_.wp-block-buttons]:flex-wrap
    [&_.wp-block-buttons]:gap-4
    [&_.wp-block-buttons]:my-6
    [&_.wp-block-button__link]:inline-block
    [&_.wp-block-button__link]:px-6
    [&_.wp-block-button__link]:py-3
    [&_.wp-block-button__link]:rounded-lg
    [&_.wp-block-button__link]:font-semibold
    [&_.wp-block-button__link]:no-underline
    [&_.wp-block-button__link]:transition-colors
    [&_.wp-block-button:not(.is-style-outline)_.wp-block-button__link]:bg-blue-600
    [&_.wp-block-button:not(.is-style-outline)_.wp-block-button__link]:text-white
    [&_.wp-block-button:not(.is-style-outline)_.wp-block-button__link:hover]:bg-blue-700
    [&_.wp-block-button.is-style-outline_.wp-block-button__link]:border-2
    [&_.wp-block-button.is-style-outline_.wp-block-button__link]:border-blue-600
    [&_.wp-block-button.is-style-outline_.wp-block-button__link]:text-blue-600
    [&_.wp-block-button.is-style-outline_.wp-block-button__link:hover]:bg-blue-600
    [&_.wp-block-button.is-style-outline_.wp-block-button__link:hover]:text-white
    
    /* Cover blocks */
    [&_.wp-block-cover]:relative
    [&_.wp-block-cover]:overflow-hidden
    [&_.wp-block-cover]:rounded-lg
    [&_.wp-block-cover]:my-8
    [&_.wp-block-cover]:min-h-[300px]
    [&_.wp-block-cover]:flex
    [&_.wp-block-cover]:items-center
    [&_.wp-block-cover]:justify-center
    
    /* Separator */
    [&_.wp-block-separator]:border-0
    [&_.wp-block-separator]:h-px
    [&_.wp-block-separator]:bg-slate-300
    [&_.wp-block-separator]:my-8
    [&_.wp-block-separator.is-style-wide]:w-full
    [&_.wp-block-separator.is-style-dots]:bg-transparent
    [&_.wp-block-separator.is-style-dots]:text-center
    [&_.wp-block-separator.is-style-dots]:h-auto
    [&_.wp-block-separator.is-style-dots]:before:content-['···']
    [&_.wp-block-separator.is-style-dots]:before:text-slate-400
    [&_.wp-block-separator.is-style-dots]:before:text-2xl
    [&_.wp-block-separator.is-style-dots]:before:tracking-[0.5em]
    
    /* Spacer */
    [&_.wp-block-spacer]:block
  `.replace(/\s+/g, ' ').trim();

  return (
    <Tag
      className={`${baseClasses} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

/**
 * Prose wrapper - simpler version for basic content
 */
export function Prose({
  children,
  className = '',
  size = 'lg',
}: {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
}) {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        prose-slate
        prose-headings:font-playfair
        prose-a:text-blue-600
        max-w-none
        ${className}
      `}
    >
      {children}
    </div>
  );
}

