/**
 * Block Registry
 * 
 * Registry for mapping WordPress block names to React components.
 * Used by Faust.js for block rendering.
 */

import { ComponentType } from 'react';

// Import block components
import { CoreParagraph } from './CoreParagraph';
import { CoreHeading } from './CoreHeading';
import { CoreImage } from './CoreImage';
import { CoreGallery } from './CoreGallery';
import { CoreColumns, CoreColumn } from './CoreColumns';
import { CoreButtons, CoreButton } from './CoreButtons';
import { CoreEmbed } from './CoreEmbed';
import { CoreList, CoreListItem } from './CoreList';
import { CoreQuote } from './CoreQuote';
import { CoreSeparator } from './CoreSeparator';
import { CoreSpacer } from './CoreSpacer';

/**
 * Block component type
 */
export type BlockComponent = ComponentType<{
  attributes?: Record<string, unknown>;
  innerBlocks?: React.ReactNode;
  className?: string;
}>;

/**
 * Block registry map
 */
const blockRegistry = new Map<string, BlockComponent>();

/**
 * Register core blocks
 */
function initializeRegistry() {
  // Text blocks
  blockRegistry.set('core/paragraph', CoreParagraph as BlockComponent);
  blockRegistry.set('core/heading', CoreHeading as BlockComponent);
  blockRegistry.set('core/list', CoreList as BlockComponent);
  blockRegistry.set('core/list-item', CoreListItem as BlockComponent);
  blockRegistry.set('core/quote', CoreQuote as BlockComponent);

  // Media blocks
  blockRegistry.set('core/image', CoreImage as BlockComponent);
  blockRegistry.set('core/gallery', CoreGallery as BlockComponent);
  blockRegistry.set('core/embed', CoreEmbed as BlockComponent);
  
  // Embed variations
  blockRegistry.set('core-embed/youtube', CoreEmbed as BlockComponent);
  blockRegistry.set('core-embed/vimeo', CoreEmbed as BlockComponent);
  blockRegistry.set('core-embed/twitter', CoreEmbed as BlockComponent);

  // Layout blocks
  blockRegistry.set('core/columns', CoreColumns as BlockComponent);
  blockRegistry.set('core/column', CoreColumn as BlockComponent);
  blockRegistry.set('core/buttons', CoreButtons as BlockComponent);
  blockRegistry.set('core/button', CoreButton as BlockComponent);
  blockRegistry.set('core/separator', CoreSeparator as BlockComponent);
  blockRegistry.set('core/spacer', CoreSpacer as BlockComponent);
}

// Initialize on module load
initializeRegistry();

/**
 * Get a block component by name
 */
export function getBlock(name: string): BlockComponent | undefined {
  return blockRegistry.get(name);
}

/**
 * Register a custom block component
 */
export function registerBlock(name: string, component: BlockComponent): void {
  blockRegistry.set(name, component);
}

/**
 * Check if a block is registered
 */
export function hasBlock(name: string): boolean {
  return blockRegistry.has(name);
}

/**
 * Get all registered block names
 */
export function getRegisteredBlocks(): string[] {
  return Array.from(blockRegistry.keys());
}

/**
 * Export the blocks map for Faust.js configuration
 */
export const blocks = Object.fromEntries(blockRegistry);

