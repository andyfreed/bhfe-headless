import { gql } from '@apollo/client';
import Link from 'next/link';

export default function FrontPageTemplate({ data }: { data: any }) {
  const { page, flmsCourses, generalSettings } = data || {};

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            {generalSettings?.title || 'Beacon Hill Financial Educators'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            {generalSettings?.description}
          </p>
          <Link 
            href="/courses/"
            className="btn-primary text-lg"
          >
            Browse Courses
          </Link>
        </div>
      </section>

      {/* Page Content */}
      {page?.content && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto wp-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        </section>
      )}

      {/* Featured Courses */}
      {flmsCourses?.nodes?.length > 0 && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl font-bold text-center mb-12 text-slate-800">
              Featured Courses
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flmsCourses.nodes.map((course: any) => (
                <article key={course.id} className="card p-6">
                  {course.courseNumber && (
                    <span className="text-amber-600 font-mono text-sm font-bold">
                      #{course.courseNumber}
                    </span>
                  )}
                  <h3 className="font-playfair text-xl font-bold mt-2 mb-4">
                    {course.title}
                  </h3>
                  <Link href={course.uri || '#'} className="btn-secondary inline-block">
                    View Course
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

FrontPageTemplate.query = gql`
  query GetFrontPage($uri: String!) {
    page(id: $uri, idType: URI) {
      id
      title
      content
    }
    flmsCourses(first: 6) {
      nodes {
        id
        databaseId
        title
        uri
        courseNumber
      }
    }
    generalSettings {
      title
      description
    }
  }
`;

FrontPageTemplate.variables = ({ uri }: { uri: string }) => ({
  uri: uri || '/',
});

