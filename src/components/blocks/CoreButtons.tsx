/**
 * Core Buttons Block
 * 
 * Renders WordPress core/buttons and core/button blocks
 */

import { ComponentType, ReactNode } from 'react';
import Link from 'next/link';

export interface CoreButtonsProps {
  attributes?: {
    layout?: {
      type?: 'flex';
      justifyContent?: 'left' | 'center' | 'right' | 'space-between';
      orientation?: 'horizontal' | 'vertical';
    };
    style?: {
      spacing?: {
        blockGap?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

export interface CoreButtonProps {
  attributes?: {
    text?: string;
    url?: string;
    linkTarget?: string;
    rel?: string;
    placeholder?: string;
    backgroundColor?: string;
    textColor?: string;
    gradient?: string;
    width?: number;
    style?: {
      color?: {
        background?: string;
        text?: string;
      };
      border?: {
        radius?: string;
        width?: string;
        color?: string;
      };
      spacing?: {
        padding?: {
          top?: string;
          right?: string;
          bottom?: string;
          left?: string;
        };
      };
    };
  };
  className?: string;
}

const justifyClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  'space-between': 'justify-between',
};

export const CoreButtons: ComponentType<CoreButtonsProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const { layout, style } = attributes || {};

  const justifyClass = layout?.justifyContent
    ? justifyClasses[layout.justifyContent]
    : 'justify-start';
  const orientationClass =
    layout?.orientation === 'vertical' ? 'flex-col' : 'flex-row';
  const gap = style?.spacing?.blockGap || '1rem';

  return (
    <div
      className={`
        flex
        flex-wrap
        ${orientationClass}
        ${justifyClass}
        my-6
        ${className}
      `.trim()}
      style={{ gap }}
    >
      {innerBlocks}
    </div>
  );
};

CoreButtons.displayName = 'CoreButtons';

export const CoreButton: ComponentType<CoreButtonProps> = ({
  attributes,
  className = '',
}) => {
  const {
    text,
    url,
    linkTarget,
    rel,
    backgroundColor,
    textColor,
    gradient,
    width,
    style,
  } = attributes || {};

  if (!text) return null;

  // Determine if this is an outline button
  const isOutline = className.includes('is-style-outline');

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};

  // Background
  if (gradient) {
    inlineStyle.background = gradient;
  } else if (style?.color?.background) {
    inlineStyle.backgroundColor = style.color.background;
  } else if (backgroundColor && !isOutline) {
    // Use predefined color if no custom color
    inlineStyle.backgroundColor = backgroundColor;
  }

  // Text color
  if (style?.color?.text) {
    inlineStyle.color = style.color.text;
  } else if (textColor) {
    inlineStyle.color = textColor;
  }

  // Border
  if (style?.border?.radius) {
    inlineStyle.borderRadius = style.border.radius;
  }
  if (style?.border?.width) {
    inlineStyle.borderWidth = style.border.width;
  }
  if (style?.border?.color) {
    inlineStyle.borderColor = style.border.color;
    inlineStyle.borderStyle = 'solid';
  }

  // Padding
  if (style?.spacing?.padding) {
    const { top, right, bottom, left } = style.spacing.padding;
    if (top) inlineStyle.paddingTop = top;
    if (right) inlineStyle.paddingRight = right;
    if (bottom) inlineStyle.paddingBottom = bottom;
    if (left) inlineStyle.paddingLeft = left;
  }

  // Width
  if (width) {
    inlineStyle.width = `${width}%`;
  }

  // Base classes
  const baseClasses = `
    inline-block
    px-6 py-3
    rounded-lg
    font-semibold
    text-center
    transition-all
    duration-200
    ${isOutline
      ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
      : 'bg-blue-600 text-white hover:bg-blue-700'
    }
  `.trim();

  const content = (
    <span
      className={`${baseClasses} ${className}`}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );

  if (!url) {
    return content;
  }

  // Check if internal or external link
  const isInternal = url.startsWith('/') || url.startsWith('#');

  if (isInternal) {
    return (
      <Link href={url} className="no-underline">
        {content}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target={linkTarget || undefined}
      rel={rel || (linkTarget === '_blank' ? 'noopener noreferrer' : undefined)}
      className="no-underline"
    >
      {content}
    </a>
  );
};

CoreButton.displayName = 'CoreButton';

