/**
 * Block Components
 * 
 * Exports all Gutenberg block components for Faust.js block mapping.
 */

// Phase 1: Content Renderer (HTML with Typography)
export { ContentRenderer, Prose } from './ContentRenderer';

// Phase 2: Individual Block Components
export { CoreParagraph } from './CoreParagraph';
export type { CoreParagraphProps } from './CoreParagraph';

export { CoreHeading } from './CoreHeading';
export type { CoreHeadingProps } from './CoreHeading';

export { CoreImage } from './CoreImage';
export type { CoreImageProps } from './CoreImage';

export { CoreGallery } from './CoreGallery';
export type { CoreGalleryProps } from './CoreGallery';

export { CoreColumns, CoreColumn } from './CoreColumns';
export type { CoreColumnsProps, CoreColumnProps } from './CoreColumns';

export { CoreButtons, CoreButton } from './CoreButtons';
export type { CoreButtonsProps, CoreButtonProps } from './CoreButtons';

export { CoreEmbed } from './CoreEmbed';
export type { CoreEmbedProps } from './CoreEmbed';

export { CoreList, CoreListItem } from './CoreList';
export type { CoreListProps, CoreListItemProps } from './CoreList';

export { CoreQuote } from './CoreQuote';
export type { CoreQuoteProps } from './CoreQuote';

export { CoreSeparator } from './CoreSeparator';
export type { CoreSeparatorProps } from './CoreSeparator';

export { CoreSpacer } from './CoreSpacer';
export type { CoreSpacerProps } from './CoreSpacer';

// Block Renderer
export { BlockRenderer } from './BlockRenderer';
export type { Block, BlockRendererProps } from './BlockRenderer';

// Block Registry for Faust.js
export {
  blocks,
  registerBlock,
  getBlock,
  hasBlock,
  getRegisteredBlocks,
} from './registry';
export type { BlockComponent } from './registry';

