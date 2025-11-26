/**
 * Single Blog Post Page
 * 
 * Displays individual blog post content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPost, getAllPostSlugs, hasData } from '@/lib/wp';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  const result = await getAllPostSlugs();
  
  if (!hasData(result) || !result.data.posts?.nodes) {
    return [];
  }

  return result.data.posts.nodes
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug!,
    }));
}

/**
 * Generate metadata for the post
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);

  if (!hasData(result) || !result.data.post) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = result.data.post;

  return {
    title: post.title || 'Blog Post',
    description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
    openGraph: {
      title: post.title || '',
      description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getPost(slug);

  if (!hasData(result) || !result.data.post) {
    notFound();
  }

  const post = result.data.post;

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
              <li className="text-white truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Categories */}
          {post.categories?.nodes && post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.nodes.map((cat) => (
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
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-blue-100">
            {post.author?.node && (
              <div className="flex items-center gap-2">
                {post.author.node.avatar?.url && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name || ''}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.node.name}</span>
              </div>
            )}
            {post.date && (
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
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
      {post.featuredImage?.node?.sourceUrl && (
        <div className="relative -mt-8 mx-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title || ''}
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
          <div
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-playfair prose-headings:text-slate-800
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
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

