/**
 * Core Columns Block
 * 
 * Renders WordPress core/columns and core/column blocks
 */

import { ComponentType, ReactNode } from 'react';

export interface CoreColumnsProps {
  attributes?: {
    verticalAlignment?: 'top' | 'center' | 'bottom';
    isStackedOnMobile?: boolean;
    style?: {
      spacing?: {
        blockGap?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

export interface CoreColumnProps {
  attributes?: {
    width?: string;
    verticalAlignment?: 'top' | 'center' | 'bottom';
    style?: {
      spacing?: {
        padding?: {
          top?: string;
          right?: string;
          bottom?: string;
          left?: string;
        };
      };
      color?: {
        background?: string;
      };
    };
  };
  innerBlocks?: ReactNode;
  className?: string;
}

const verticalAlignClasses = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
};

export const CoreColumns: ComponentType<CoreColumnsProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const {
    verticalAlignment = 'top',
    isStackedOnMobile = true,
    style,
  } = attributes || {};

  const alignClass = verticalAlignClasses[verticalAlignment];
  const stackClass = isStackedOnMobile ? 'flex-col md:flex-row' : 'flex-row';
  
  // Parse gap from style
  const gap = style?.spacing?.blockGap || '1.5rem';

  return (
    <div
      className={`
        flex
        flex-wrap
        ${stackClass}
        ${alignClass}
        my-8
        ${className}
      `.trim()}
      style={{ gap }}
    >
      {innerBlocks}
    </div>
  );
};

CoreColumns.displayName = 'CoreColumns';

export const CoreColumn: ComponentType<CoreColumnProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const { width, verticalAlignment, style } = attributes || {};

  // Build inline styles
  const inlineStyle: React.CSSProperties = {};
  
  if (width) {
    // Convert percentage to flex-basis
    inlineStyle.flexBasis = width;
    inlineStyle.flexGrow = 0;
    inlineStyle.flexShrink = 0;
  } else {
    inlineStyle.flex = '1 1 0%';
  }

  if (style?.spacing?.padding) {
    const { top, right, bottom, left } = style.spacing.padding;
    if (top) inlineStyle.paddingTop = top;
    if (right) inlineStyle.paddingRight = right;
    if (bottom) inlineStyle.paddingBottom = bottom;
    if (left) inlineStyle.paddingLeft = left;
  }

  if (style?.color?.background) {
    inlineStyle.backgroundColor = style.color.background;
  }

  const alignClass = verticalAlignment
    ? verticalAlignClasses[verticalAlignment]
    : '';

  return (
    <div
      className={`
        min-w-0
        ${alignClass}
        ${className}
      `.trim()}
      style={inlineStyle}
    >
      {innerBlocks}
    </div>
  );
};

CoreColumn.displayName = 'CoreColumn';

