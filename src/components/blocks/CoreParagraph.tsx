/**
 * Core Paragraph Block
 * 
 * Renders WordPress core/paragraph block
 */

import { ComponentType } from 'react';

export interface CoreParagraphProps {
  attributes?: {
    content?: string;
    dropCap?: boolean;
    align?: 'left' | 'center' | 'right';
    fontSize?: string;
    textColor?: string;
    backgroundColor?: string;
    style?: {
      color?: {
        text?: string;
        background?: string;
      };
      typography?: {
        fontSize?: string;
        lineHeight?: string;
      };
    };
  };
  className?: string;
}

export const CoreParagraph: ComponentType<CoreParagraphProps> = ({
  attributes,
  className = '',
}) => {
  const {
    content = '',
    dropCap = false,
    align,
    textColor,
    backgroundColor,
    style,
  } = attributes || {};

  if (!content) return null;

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
  if (style?.typography?.lineHeight) {
    inlineStyle.lineHeight = style.typography.lineHeight;
  }

  // Build classes
  const alignClass = align ? `text-${align}` : '';
  const dropCapClass = dropCap
    ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1'
    : '';
  const colorClass = textColor ? `text-${textColor}` : 'text-slate-700';
  const bgClass = backgroundColor ? `bg-${backgroundColor}` : '';

  return (
    <p
      className={`
        leading-relaxed mb-4
        ${alignClass}
        ${dropCapClass}
        ${colorClass}
        ${bgClass}
        ${className}
      `.trim()}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

CoreParagraph.displayName = 'CoreParagraph';

