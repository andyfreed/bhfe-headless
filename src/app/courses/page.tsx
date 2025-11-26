/**
 * Courses Archive Page
 * 
 * Displays all available FLMS courses with search and filters.
 */

import { Metadata } from 'next';
import { getAllCourses, hasData, extractNodes } from '@/lib/wp';
import { CourseFilters } from '@/components/CourseFilters';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our comprehensive continuing education courses for financial professionals',
};

export default async function CoursesArchivePage() {
  const result = await getAllCourses({ first: 100 });
  const courses = hasData(result) ? extractNodes(result.data.flmsCourses) : [];
  const error = result.error;

  return (
    <div className="min-h-screen bg-slate-50">
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

      {/* Courses Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <svg
                className="w-12 h-12 mx-auto text-red-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-red-800 mb-2">
                Unable to load courses
              </h2>
              <p className="text-red-600 mb-4">
                There was a problem connecting to the course database.
              </p>
              <details className="text-left max-w-lg mx-auto">
                <summary className="text-red-500 cursor-pointer text-sm">
                  Technical details
                </summary>
                <pre className="mt-2 text-xs bg-red-100 p-3 rounded overflow-auto">
                  {error.message}
                </pre>
              </details>
            </div>
          ) : courses.length > 0 ? (
            <CourseFilters courses={courses} />
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <svg
                className="w-16 h-16 mx-auto text-slate-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-slate-500 text-lg">No courses available yet.</p>
              <p className="text-slate-400 mt-2">Check back soon for new courses!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
