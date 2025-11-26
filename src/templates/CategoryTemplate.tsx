/**
 * Category Template
 * 
 * Template for category and tag archive pages
 */

import Link from 'next/link';
import type { TemplateProps } from './index';

interface CategoryData {
  __typename?: 'Category' | 'Tag';
  id: string;
  databaseId?: number;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  count?: number | null;
}

export function CategoryTemplate({ data }: TemplateProps<CategoryData>) {
  const isTag = data.__typename === 'Tag';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
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
              <li className="text-white">
                {isTag ? 'Tag' : 'Category'}: {data.name}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                isTag
                  ? 'bg-emerald-500 text-emerald-900'
                  : 'bg-amber-500 text-amber-900'
              }`}
            >
              {isTag ? 'Tag' : 'Category'}
            </span>
            {data.count !== undefined && data.count !== null && (
              <span className="text-blue-200 text-sm">
                {data.count} {data.count === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>

          <h1 className="font-playfair text-3xl md:text-5xl font-bold">
            {data.name}
          </h1>

          {data.description && (
            <p className="mt-4 text-xl text-blue-100 max-w-2xl">
              {data.description}
            </p>
          )}
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-slate-500">
              Posts in this {isTag ? 'tag' : 'category'} will be displayed here.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Archive pagination coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="pb-12 px-6">
        <div className="max-w-6xl mx-auto">
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

