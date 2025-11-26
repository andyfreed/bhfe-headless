/**
 * Core List Block
 * 
 * Renders WordPress core/list and core/list-item blocks
 */

import { ComponentType, ReactNode } from 'react';

export interface CoreListProps {
  attributes?: {
    ordered?: boolean;
    values?: string;
    type?: string;
    start?: number;
    reversed?: boolean;
    placeholder?: string;
    style?: {
      typography?: {
        fontSize?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

export interface CoreListItemProps {
  attributes?: {
    content?: string;
    style?: {
      typography?: {
        fontSize?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

export const CoreList: ComponentType<CoreListProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const { ordered = false, values, start, reversed, style } = attributes || {};

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};
  if (style?.typography?.fontSize) {
    inlineStyle.fontSize = style.typography.fontSize;
  }

  const baseClasses = `
    my-6
    pl-6
    text-slate-700
    space-y-2
    ${ordered ? 'list-decimal' : 'list-disc'}
  `.trim();

  // If innerBlocks provided (modern format)
  if (innerBlocks) {
    if (ordered) {
      return (
        <ol
          className={`${baseClasses} ${className}`}
          start={start}
          reversed={reversed}
          style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        >
          {innerBlocks}
        </ol>
      );
    }
    return (
      <ul
        className={`${baseClasses} ${className}`}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      >
        {innerBlocks}
      </ul>
    );
  }

  // Legacy format: values as HTML string
  if (values) {
    if (ordered) {
      return (
        <ol
          className={`${baseClasses} ${className}`}
          start={start}
          reversed={reversed}
          style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
          dangerouslySetInnerHTML={{ __html: values }}
        />
      );
    }
    return (
      <ul
        className={`${baseClasses} ${className}`}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        dangerouslySetInnerHTML={{ __html: values }}
      />
    );
  }

  return null;
};

CoreList.displayName = 'CoreList';

export const CoreListItem: ComponentType<CoreListItemProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const { content, style } = attributes || {};

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};
  if (style?.typography?.fontSize) {
    inlineStyle.fontSize = style.typography.fontSize;
  }

  // If has nested content (innerBlocks)
  if (innerBlocks) {
    return (
      <li
        className={`text-slate-700 ${className}`}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      >
        {content && <span dangerouslySetInnerHTML={{ __html: content }} />}
        {innerBlocks}
      </li>
    );
  }

  if (!content) return null;

  return (
    <li
      className={`text-slate-700 ${className}`}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

CoreListItem.displayName = 'CoreListItem';

