/**
 * Page Template
 * 
 * Standard template for WordPress pages
 */

import Link from 'next/link';
import Image from 'next/image';
import type { TemplateProps } from './index';
import { ContentRenderer } from '@/components/blocks';

interface PageData {
  __typename?: 'Page';
  id: string;
  databaseId?: number;
  title?: string | null;
  content?: string | null;
  uri?: string | null;
  slug?: string | null;
  date?: string | null;
  modified?: string | null;
  featuredImage?: {
    node: {
      id: string;
      sourceUrl?: string | null;
      altText?: string | null;
      mediaDetails?: {
        width?: number | null;
        height?: number | null;
      } | null;
    };
  } | null;
  parent?: {
    node: {
      id?: string;
      title?: string | null;
      uri?: string | null;
    };
  } | null;
  children?: {
    nodes: Array<{
      id?: string;
      title?: string | null;
      uri?: string | null;
    }>;
  } | null;
}

export function PageTemplate({ data }: TemplateProps<PageData>) {
  const hasChildren = data.children?.nodes && data.children.nodes.length > 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
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
              {data.parent?.node && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={data.parent.node.uri || '#'}
                      className="hover:text-white"
                    >
                      {data.parent.node.title}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-white">{data.title}</li>
            </ol>
          </nav>

          <h1 className="font-playfair text-3xl md:text-5xl font-bold">
            {data.title}
          </h1>
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
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={hasChildren ? 'lg:grid lg:grid-cols-4 lg:gap-12' : ''}>
            {/* Main Content */}
            <article className={hasChildren ? 'lg:col-span-3' : ''}>
              {data.content ? (
                <ContentRenderer content={data.content} size="lg" />
              ) : (
                <p className="text-slate-500">No content available.</p>
              )}
            </article>

            {/* Sidebar with child pages */}
            {hasChildren && (
              <aside className="lg:col-span-1 mt-12 lg:mt-0">
                <div className="bg-slate-50 rounded-xl p-6 sticky top-6">
                  <h3 className="font-playfair text-lg font-bold text-slate-800 mb-4">
                    In This Section
                  </h3>
                  <ul className="space-y-2">
                    {data.children!.nodes.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.uri || '#'}
                          className="text-slate-600 hover:text-blue-600 text-sm block py-1"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

