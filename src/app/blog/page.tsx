/**
 * Blog Archive Page
 * 
 * Displays paginated list of blog posts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getSiteData, extractNodes, hasData } from '@/lib/wp';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and insights from Beacon Hill Financial Educators',
};

export default async function BlogArchivePage() {
  const [postsResult, siteResult] = await Promise.all([
    getAllPosts({ first: 12 }),
    getSiteData(),
  ]);

  const posts = hasData(postsResult) ? extractNodes(postsResult.data.posts) : [];
  const pageInfo = postsResult.data?.posts?.pageInfo;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Insights, updates, and educational content for financial professionals
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {post.featuredImage?.node?.sourceUrl && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title || ''}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.categories?.nodes && post.categories.nodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.nodes.slice(0, 2).map((cat) => (
                          <span
                            key={cat.id}
                            className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-playfair text-xl font-bold mb-3 text-slate-800">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <div
                        className="text-slate-600 text-sm line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                        }}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <time className="text-xs text-slate-500">
                        {post.date
                          ? new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : ''}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-slate-500">No posts found.</p>
            </div>
          )}

          {/* Pagination placeholder */}
          {pageInfo?.hasNextPage && (
            <div className="text-center mt-12">
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

