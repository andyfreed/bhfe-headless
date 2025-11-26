import Link from 'next/link';
import { getFeaturedCourses, getSiteData, extractNodes, hasData } from '@/lib/wp';

export default async function HomePage() {
  // Fetch data using typed fetchers
  const [coursesResult, settingsResult] = await Promise.all([
    getFeaturedCourses(6),
    getSiteData(),
  ]);

  const courses = hasData(coursesResult) 
    ? extractNodes(coursesResult.data.flmsCourses) 
    : [];
  
  const settings = hasData(settingsResult) 
    ? settingsResult.data.generalSettings 
    : null;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            {settings?.title || 'Beacon Hill Financial Educators'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            {settings?.description || 'Professional continuing education for financial professionals'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/courses/"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 px-8 rounded-lg transition-colors"
            >
              Browse Courses
            </Link>
            <Link 
              href="/about/"
              className="border-2 border-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-4 text-slate-800">
            Featured Courses
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Earn CPE and CFP credits with our comprehensive continuing education courses
          </p>

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <article 
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    {course.courseNumber && (
                      <span className="text-amber-600 font-mono text-sm font-bold">
                        #{course.courseNumber}
                      </span>
                    )}
                    <h3 className="font-playfair text-xl font-bold mt-2 mb-3 text-slate-800">
                      {course.title}
                    </h3>
                    
                    {course.courseCredits && course.courseCredits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.courseCredits.map((credit, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                          >
                            {credit?.credits} {credit?.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {course.courseDescription && (
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {course.courseDescription.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                    )}

                    <Link 
                      href={course.uri || `/course/${course.databaseId}/`}
                      className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      View Course
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-slate-500">
                {coursesResult.error ? 'Unable to connect to WordPress. Check your .env.local configuration.' : 'No courses found.'}
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/courses/"
              className="inline-block border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6 text-slate-900">
            Ready to advance your career?
          </h2>
          <p className="text-xl text-slate-800 mb-8">
            Join thousands of financial professionals who trust BHFE for their continuing education needs.
          </p>
          <Link 
            href="/courses/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-lg transition-colors text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-playfair text-2xl text-white mb-4">
            Beacon Hill Financial Educators
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} BHFE. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

