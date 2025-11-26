/**
 * Core Heading Block
 * 
 * Renders WordPress core/heading block
 */

import { ComponentType } from 'react';

export interface CoreHeadingProps {
  attributes?: {
    content?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    textAlign?: 'left' | 'center' | 'right';
    anchor?: string;
    textColor?: string;
    backgroundColor?: string;
    style?: {
      color?: {
        text?: string;
        background?: string;
      };
      typography?: {
        fontSize?: string;
        fontWeight?: string;
      };
    };
  };
  className?: string;
}

const headingStyles = {
  1: 'text-4xl md:text-5xl font-bold mb-6 mt-8',
  2: 'text-3xl md:text-4xl font-bold mb-4 mt-12',
  3: 'text-2xl md:text-3xl font-semibold mb-3 mt-8',
  4: 'text-xl md:text-2xl font-semibold mb-2 mt-6',
  5: 'text-lg md:text-xl font-medium mb-2 mt-4',
  6: 'text-base md:text-lg font-medium mb-2 mt-4',
};

export const CoreHeading: ComponentType<CoreHeadingProps> = ({
  attributes,
  className = '',
}) => {
  const {
    content = '',
    level = 2,
    textAlign,
    anchor,
    textColor,
    style,
  } = attributes || {};

  if (!content) return null;

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};
  
  if (style?.color?.text) {
    inlineStyle.color = style.color.text;
  }
  if (style?.color?.background) {
    inlineStyle.backgroundColor = style.color.background;
  }
  if (style?.typography?.fontSize) {
    inlineStyle.fontSize = style.typography.fontSize;
  }
  if (style?.typography?.fontWeight) {
    inlineStyle.fontWeight = style.typography.fontWeight;
  }

  // Build classes
  const alignClass = textAlign ? `text-${textAlign}` : '';
  const colorClass = textColor ? `text-${textColor}` : 'text-slate-800';
  const sizeClass = headingStyles[level];

  return (
    <Tag
      id={anchor || undefined}
      className={`
        font-playfair
        scroll-mt-20
        ${sizeClass}
        ${alignClass}
        ${colorClass}
        ${className}
      `.trim()}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

CoreHeading.displayName = 'CoreHeading';

