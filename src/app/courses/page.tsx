/**
 * Courses Archive Page
 * 
 * Displays all available FLMS courses
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCourses, hasData, extractNodes } from '@/lib/wp';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our comprehensive continuing education courses for financial professionals',
};

export default async function CoursesArchivePage() {
  const result = await getAllCourses({ first: 50 });
  const courses = hasData(result) ? extractNodes(result.data.flmsCourses) : [];
  const pageInfo = result.data?.flmsCourses?.pageInfo;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            All Courses
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Earn CPE and CFP credits with our comprehensive continuing education courses
            designed for financial professionals.
          </p>
        </div>
      </header>

      {/* Courses Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    {/* Course Number */}
                    {course.courseNumber && (
                      <span className="inline-block bg-amber-100 text-amber-800 font-mono text-sm font-bold px-2 py-1 rounded mb-3">
                        #{course.courseNumber}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="font-playfair text-xl font-bold text-slate-800 mb-3">
                      <Link
                        href={course.uri || `/courses/${course.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {course.title}
                      </Link>
                    </h2>

                    {/* Credits */}
                    {course.courseCredits && course.courseCredits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.courseCredits
                          .filter(Boolean)
                          .slice(0, 4)
                          .map((credit, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                            >
                              {credit?.credits} {credit?.name}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Description Preview */}
                    {course.courseDescription && (
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {course.courseDescription
                          .replace(/<[^>]*>/g, '')
                          .substring(0, 150)}
                        ...
                      </p>
                    )}

                    {/* View Link */}
                    <Link
                      href={course.uri || `/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
                    >
                      View Course
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-slate-500">No courses found.</p>
            </div>
          )}

          {/* Pagination placeholder */}
          {pageInfo?.hasNextPage && (
            <div className="text-center mt-12">
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Load More Courses
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
