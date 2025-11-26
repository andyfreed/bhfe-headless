/**
 * Core Embed Block
 * 
 * Renders WordPress core/embed block for YouTube, Vimeo, Twitter, etc.
 */

import { ComponentType } from 'react';

export interface CoreEmbedProps {
  attributes?: {
    url?: string;
    caption?: string;
    type?: string;
    providerNameSlug?: string;
    responsive?: boolean;
    previewable?: boolean;
    align?: 'left' | 'center' | 'right' | 'wide' | 'full';
  };
  className?: string;
}

/**
 * Extract video ID from various embed URLs
 */
function getEmbedUrl(url: string, provider?: string): string | null {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Already an embed URL
  if (url.includes('/embed/') || url.includes('player.vimeo.com')) {
    return url;
  }

  return null;
}

/**
 * Check if URL is a video embed
 */
function isVideoEmbed(url: string, provider?: string): boolean {
  if (!url) return false;
  return (
    url.includes('youtube') ||
    url.includes('youtu.be') ||
    url.includes('vimeo') ||
    provider === 'youtube' ||
    provider === 'vimeo'
  );
}

const alignClasses = {
  left: 'mr-auto',
  center: 'mx-auto',
  right: 'ml-auto',
  wide: 'w-full max-w-4xl mx-auto',
  full: 'w-full',
};

export const CoreEmbed: ComponentType<CoreEmbedProps> = ({
  attributes,
  className = '',
}) => {
  const {
    url,
    caption,
    type,
    providerNameSlug,
    responsive = true,
    align = 'center',
  } = attributes || {};

  if (!url) return null;

  const alignClass = alignClasses[align] || alignClasses.center;
  const embedUrl = getEmbedUrl(url, providerNameSlug);
  const isVideo = isVideoEmbed(url, providerNameSlug);

  // Video embed (YouTube, Vimeo)
  if (isVideo && embedUrl) {
    return (
      <figure className={`my-8 ${alignClass} ${className}`}>
        <div
          className={`
            relative overflow-hidden rounded-lg shadow-lg
            ${responsive ? 'aspect-video' : ''}
          `}
        >
          <iframe
            src={embedUrl}
            title={caption || 'Embedded video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`
              ${responsive ? 'absolute inset-0 w-full h-full' : 'w-full'}
            `}
          />
        </div>
        {caption && (
          <figcaption
            className="text-center text-slate-500 text-sm mt-3"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </figure>
    );
  }

  // Twitter embed
  if (providerNameSlug === 'twitter' || url.includes('twitter.com') || url.includes('x.com')) {
    return (
      <figure className={`my-8 ${alignClass} max-w-lg ${className}`}>
        <div className="bg-slate-100 rounded-lg p-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            View on Twitter/X →
          </a>
        </div>
        {caption && (
          <figcaption
            className="text-center text-slate-500 text-sm mt-3"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </figure>
    );
  }

  // Generic embed fallback
  return (
    <figure className={`my-8 ${alignClass} ${className}`}>
      <div className="bg-slate-100 rounded-lg p-6 text-center">
        <p className="text-slate-600 mb-2">Embedded content</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all text-sm"
        >
          {url}
        </a>
      </div>
      {caption && (
        <figcaption
          className="text-center text-slate-500 text-sm mt-3"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};

CoreEmbed.displayName = 'CoreEmbed';

