/**
 * Core Gallery Block
 * 
 * Renders WordPress core/gallery block
 */

import { ComponentType, ReactNode } from 'react';
import Image from 'next/image';

interface GalleryImage {
  url?: string;
  alt?: string;
  caption?: string;
  id?: number;
  link?: string;
}

export interface CoreGalleryProps {
  attributes?: {
    images?: GalleryImage[];
    columns?: number;
    caption?: string;
    imageCrop?: boolean;
    linkTo?: 'none' | 'media' | 'attachment';
    sizeSlug?: string;
    align?: 'left' | 'center' | 'right' | 'wide' | 'full';
  };
  innerBlocks?: ReactNode;
  className?: string;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};

export const CoreGallery: ComponentType<CoreGalleryProps> = ({
  attributes,
  innerBlocks,
  className = '',
}) => {
  const {
    images = [],
    columns = 3,
    caption,
    imageCrop = true,
    linkTo = 'none',
    align,
  } = attributes || {};

  // If innerBlocks are provided (newer format), render those
  if (innerBlocks) {
    return (
      <figure className={`my-8 ${className}`}>
        <div className={`grid gap-4 ${columnClasses[columns as keyof typeof columnClasses] || columnClasses[3]}`}>
          {innerBlocks}
        </div>
        {caption && (
          <figcaption
            className="text-center text-slate-500 text-sm mt-4"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </figure>
    );
  }

  // Legacy format: images array
  if (!images || images.length === 0) return null;

  const colClass = columnClasses[columns as keyof typeof columnClasses] || columnClasses[3];

  return (
    <figure className={`my-8 ${className}`}>
      <div className={`grid gap-4 ${colClass}`}>
        {images.map((image, index) => {
          if (!image.url) return null;

          const imageElement = (
            <div
              key={image.id || index}
              className={`relative overflow-hidden rounded-lg ${imageCrop ? 'aspect-square' : ''}`}
            >
              <Image
                src={image.url}
                alt={image.alt || ''}
                fill={imageCrop}
                width={imageCrop ? undefined : 400}
                height={imageCrop ? undefined : 300}
                className={`${imageCrop ? 'object-cover' : ''} hover:scale-105 transition-transform duration-300`}
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
                  {image.caption}
                </div>
              )}
            </div>
          );

          if (linkTo === 'media' && image.url) {
            return (
              <a
                key={image.id || index}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {imageElement}
              </a>
            );
          }

          if (linkTo === 'attachment' && image.link) {
            return (
              <a key={image.id || index} href={image.link} className="block">
                {imageElement}
              </a>
            );
          }

          return imageElement;
        })}
      </div>
      {caption && (
        <figcaption
          className="text-center text-slate-500 text-sm mt-4"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};

CoreGallery.displayName = 'CoreGallery';

