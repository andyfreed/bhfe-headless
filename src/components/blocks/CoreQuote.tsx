/**
 * Core Quote Block
 * 
 * Renders WordPress core/quote block
 */

import { ComponentType, ReactNode } from 'react';

export interface CoreQuoteProps {
  attributes?: {
    value?: string;
    citation?: string;
    align?: 'left' | 'center' | 'right';
    style?: {
      color?: {
        text?: string;
        background?: string;
      };
      typography?: {
        fontSize?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

export const CoreQuote: ComponentType<CoreQuoteProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const { value, citation, align, style } = attributes || {};

  // Determine if this is a large quote style
  const isLarge = className.includes('is-style-large');

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

  const alignClass = align ? `text-${align}` : '';

  return (
    <blockquote
      className={`
        my-8
        ${isLarge ? 'text-2xl' : 'text-lg'}
        ${isLarge ? 'border-l-0 text-center' : 'border-l-4 border-amber-500 pl-6'}
        ${isLarge ? '' : 'bg-slate-50 py-4 pr-6'}
        rounded-r-lg
        ${alignClass}
        ${className}
      `.trim()}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
    >
      {/* Modern format with innerBlocks */}
      {innerBlocks ? (
        <div className="space-y-4">
          {innerBlocks}
        </div>
      ) : value ? (
        <div
          className="text-slate-600 italic"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : null}

      {citation && (
        <cite
          className={`
            block mt-4
            text-sm text-slate-500
            not-italic
            ${isLarge ? 'font-semibold' : ''}
          `}
        >
          — <span dangerouslySetInnerHTML={{ __html: citation }} />
        </cite>
      )}
    </blockquote>
  );
};

CoreQuote.displayName = 'CoreQuote';

