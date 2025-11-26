import { gql } from '@apollo/client';

export default function PageTemplate({ data }: { data: any }) {
  const { page } = data || {};

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Page not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold">
            {page.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <article className="py-12 px-6">
        <div 
          className="max-w-4xl mx-auto wp-content"
          dangerouslySetInnerHTML={{ __html: page.content || '' }}
        />
      </article>
    </main>
  );
}

PageTemplate.query = gql`
  query GetPage($uri: String!) {
    page(id: $uri, idType: URI) {
      id
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

PageTemplate.variables = ({ uri }: { uri: string }) => ({
  uri,
});

