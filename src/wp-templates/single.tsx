import { gql } from '@apollo/client';

export default function SingleTemplate({ data }: { data: any }) {
  const { post } = data || {};

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Post not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <time className="text-slate-300">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* Content */}
      <article className="py-12 px-6">
        <div 
          className="max-w-4xl mx-auto wp-content"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>
    </main>
  );
}

SingleTemplate.query = gql`
  query GetPost($uri: String!) {
    post(id: $uri, idType: URI) {
      id
      title
      content
      date
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

SingleTemplate.variables = ({ uri }: { uri: string }) => ({
  uri,
});

