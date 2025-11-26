import { gql } from '@apollo/client';
import Link from 'next/link';

export default function ArchiveTemplate({ data }: { data: any }) {
  const { posts, nodeByUri } = data || {};
  const archive = nodeByUri;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold">
            {archive?.name || 'Archive'}
          </h1>
          {archive?.description && (
            <p className="text-slate-300 mt-4 text-lg">
              {archive.description}
            </p>
          )}
        </div>
      </header>

      {/* Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {posts?.nodes?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.nodes.map((post: any) => (
                <article key={post.id} className="card p-6">
                  <h2 className="font-playfair text-xl font-bold mb-3">
                    <Link href={post.uri || '#'} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <div 
                      className="text-slate-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                  <Link 
                    href={post.uri || '#'}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-12">
              No posts found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

ArchiveTemplate.query = gql`
  query GetArchive($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        description
      }
      ... on Tag {
        name
        description
      }
    }
    posts(first: 20) {
      nodes {
        id
        title
        uri
        excerpt
        date
      }
    }
  }
`;

ArchiveTemplate.variables = ({ uri }: { uri: string }) => ({
  uri,
});

