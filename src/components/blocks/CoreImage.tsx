/**
 * Core Image Block
 * 
 * Renders WordPress core/image block with Next.js Image optimization
 */

import { ComponentType } from 'react';
import Image from 'next/image';

export interface CoreImageProps {
  attributes?: {
    url?: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
    sizeSlug?: string;
    align?: 'left' | 'center' | 'right' | 'wide' | 'full';
    href?: string;
    linkTarget?: string;
    linkClass?: string;
    id?: number;
    title?: string;
    style?: {
      border?: {
        radius?: string;
      };
    };
  };
  className?: string;
}

const alignClasses = {
  left: 'mr-auto',
  center: 'mx-auto',
  right: 'ml-auto',
  wide: 'w-full max-w-4xl mx-auto',
  full: 'w-full',
};

export const CoreImage: ComponentType<CoreImageProps> = ({
  attributes,
  className = '',
}) => {
  const {
    url,
    alt = '',
    caption,
    width,
    height,
    align = 'center',
    href,
    linkTarget,
    title,
    style,
  } = attributes || {};

  if (!url) return null;

  // Determine dimensions
  const imgWidth = width || 800;
  const imgHeight = height || 600;

  // Build styles
  const imageStyle: React.CSSProperties = {};
  if (style?.border?.radius) {
    imageStyle.borderRadius = style.border.radius;
  }

  const alignClass = alignClasses[align] || alignClasses.center;

  const imageElement = (
    <Image
      src={url}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      title={title}
      className={`rounded-lg shadow-lg ${style?.border?.radius ? '' : 'rounded-lg'}`}
      style={Object.keys(imageStyle).length > 0 ? imageStyle : undefined}
    />
  );

  const wrappedImage = href ? (
    <a
      href={href}
      target={linkTarget || undefined}
      rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
      className="block"
    >
      {imageElement}
    </a>
  ) : (
    imageElement
  );

  return (
    <figure className={`my-8 ${alignClass} ${className}`}>
      {wrappedImage}
      {caption && (
        <figcaption
          className="text-center text-slate-500 text-sm mt-3"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};

CoreImage.displayName = 'CoreImage';

