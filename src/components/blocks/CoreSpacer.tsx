/**
 * Core Spacer Block
 * 
 * Renders WordPress core/spacer block
 */

import { ComponentType } from 'react';

export interface CoreSpacerProps {
  attributes?: {
    height?: string;
  };
  className?: string;
}

export const CoreSpacer: ComponentType<CoreSpacerProps> = ({
  attributes,
  className = '',
}) => {
  const { height = '100px' } = attributes || {};

  return (
    <div
      className={`block ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  );
};

CoreSpacer.displayName = 'CoreSpacer';

