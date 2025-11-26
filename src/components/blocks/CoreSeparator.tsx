/**
 * Core Separator Block
 * 
 * Renders WordPress core/separator block
 */

import { ComponentType } from 'react';

export interface CoreSeparatorProps {
  attributes?: {
    opacity?: string;
    style?: {
      color?: {
        background?: string;
      };
    };
  };
  className?: string;
}

export const CoreSeparator: ComponentType<CoreSeparatorProps> = ({
  attributes,
  className = '',
}) => {
  const { opacity, style } = attributes || {};

  // Determine style variant
  const isWide = className.includes('is-style-wide');
  const isDots = className.includes('is-style-dots');

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};
  if (style?.color?.background) {
    inlineStyle.backgroundColor = style.color.background;
  }
  if (opacity) {
    inlineStyle.opacity = opacity;
  }

  // Dots style
  if (isDots) {
    return (
      <hr
        className={`
          my-8
          border-0
          h-auto
          text-center
          bg-transparent
          before:content-['···']
          before:text-slate-400
          before:text-2xl
          before:tracking-[0.5em]
          ${className}
        `}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      />
    );
  }

  // Wide or default style
  return (
    <hr
      className={`
        my-8
        border-0
        h-px
        bg-slate-300
        ${isWide ? 'w-full' : 'w-24 mx-auto'}
        ${className}
      `}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
    />
  );
};

CoreSeparator.displayName = 'CoreSeparator';

