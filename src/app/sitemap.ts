/**
 * Sitemap - DISABLED for staging
 * 
 * Returns empty sitemap to prevent search engine indexing.
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Staging: Return empty sitemap
  return [];
}

