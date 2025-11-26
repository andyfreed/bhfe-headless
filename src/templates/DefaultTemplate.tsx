/**
 * Default Template
 * 
 * Fallback template for unknown content types
 */

import Link from 'next/link';
import type { TemplateProps } from './index';

interface DefaultData {
  __typename?: string;
  id?: string;
  uri?: string;
  title?: string;
  content?: string;
  [key: string]: unknown;
}

export function DefaultTemplate({ data }: TemplateProps<DefaultData>) {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{data.title || 'Page'}</li>
            </ol>
          </nav>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold">
            {data.title || 'Untitled'}
          </h1>
          {data.__typename && (
            <p className="mt-4 text-blue-200 text-sm">
              Content Type: {data.__typename}
            </p>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {data.content ? (
            <div
              className="prose prose-lg prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-slate-500 text-center py-8">
              No content available for this page.
            </p>
          )}
        </div>
      </article>
    </main>
  );
}

