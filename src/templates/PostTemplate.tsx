/**
 * Post Template
 * 
 * Template for single blog posts (used by catch-all route)
 */

import Link from 'next/link';
import Image from 'next/image';
import type { TemplateProps } from './index';
import { ContentRenderer } from '@/components/blocks';

interface PostData {
  __typename?: 'Post';
  id: string;
  databaseId?: number;
  title?: string | null;
  content?: string | null;
  excerpt?: string | null;
  uri?: string | null;
  slug?: string | null;
  date?: string | null;
  modified?: string | null;
  featuredImage?: {
    node: {
      id: string;
      sourceUrl?: string | null;
      altText?: string | null;
    };
  } | null;
  categories?: {
    nodes: Array<{
      id: string;
      name?: string | null;
      slug?: string | null;
    }>;
  } | null;
  author?: {
    node: {
      id: string;
      name?: string | null;
      avatar?: {
        url?: string | null;
      } | null;
    };
  } | null;
}

export function PostTemplate({ data }: TemplateProps<PostData>) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-white truncate max-w-[200px]">{data.title}</li>
            </ol>
          </nav>

          {/* Categories */}
          {data.categories?.nodes && data.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {data.categories.nodes.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-semibold bg-amber-500 text-slate-900 px-3 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-6">
            {data.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-blue-100">
            {data.author?.node && (
              <div className="flex items-center gap-2">
                {data.author.node.avatar?.url && (
                  <Image
                    src={data.author.node.avatar.url}
                    alt={data.author.node.name || ''}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{data.author.node.name}</span>
              </div>
            )}
            {data.date && (
              <time>
                {new Date(data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {data.featuredImage?.node?.sourceUrl && (
        <div className="relative -mt-8 mx-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={data.featuredImage.node.sourceUrl}
                alt={data.featuredImage.node.altText || data.title || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <ContentRenderer content={data.content} size="lg" />
        </div>
      </article>

      {/* Back to Blog */}
      <div className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}

