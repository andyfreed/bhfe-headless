/**
 * Block Renderer
 * 
 * Renders WordPress Gutenberg blocks as React components.
 * Falls back to ContentRenderer for unsupported blocks.
 */

import { ReactNode } from 'react';
import { getBlock, hasBlock } from './registry';
import { ContentRenderer } from './ContentRenderer';

/**
 * Block data structure from WPGraphQL
 */
export interface Block {
  name: string;
  attributes?: Record<string, unknown>;
  innerBlocks?: Block[];
  renderedHtml?: string;
  originalContent?: string;
}

export interface BlockRendererProps {
  /** Array of blocks from WPGraphQL */
  blocks: Block[];
  /** Fallback to HTML content if blocks fail */
  fallbackContent?: string;
  /** Additional CSS classes for wrapper */
  className?: string;
}

/**
 * Render inner blocks recursively
 */
function renderInnerBlocks(innerBlocks: Block[] | undefined): ReactNode {
  if (!innerBlocks || innerBlocks.length === 0) {
    return null;
  }

  return innerBlocks.map((block, index) => (
    <RenderBlock key={`${block.name}-${index}`} block={block} />
  ));
}

/**
 * Render a single block
 */
function RenderBlock({ block }: { block: Block }): ReactNode {
  const { name, attributes, innerBlocks, renderedHtml, originalContent } = block;

  // Check if we have a registered component for this block
  if (hasBlock(name)) {
    const BlockComponent = getBlock(name)!;
    
    return (
      <BlockComponent
        attributes={attributes}
        innerBlocks={renderInnerBlocks(innerBlocks)}
        className=""
      />
    );
  }

  // Fallback: render HTML if available
  if (renderedHtml) {
    return (
      <div
        className="wp-block-fallback"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  // Last resort: render original content
  if (originalContent) {
    return (
      <div
        className="wp-block-fallback"
        dangerouslySetInnerHTML={{ __html: originalContent }}
      />
    );
  }

  // Unknown block with no content
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Unknown block: ${name}`, { attributes, innerBlocks });
  }

  return null;
}

/**
 * BlockRenderer - Main component for rendering WordPress blocks
 * 
 * @example
 * ```tsx
 * // With blocks array from WPGraphQL
 * <BlockRenderer blocks={post.editorBlocks} fallbackContent={post.content} />
 * ```
 */
export function BlockRenderer({
  blocks,
  fallbackContent,
  className = '',
}: BlockRendererProps) {
  // If no blocks, fall back to content renderer
  if (!blocks || blocks.length === 0) {
    if (fallbackContent) {
      return <ContentRenderer content={fallbackContent} className={className} />;
    }
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <RenderBlock key={`${block.name}-${index}`} block={block} />
      ))}
    </div>
  );
}

