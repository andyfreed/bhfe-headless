/**
 * Courses Archive Page
 * 
 * Displays all available FLMS courses with advanced filtering.
 * Filters sync with URL querystring for shareable links.
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllCourses, hasData, extractNodes } from '@/lib/wp';
import { CourseFilters } from '@/components/CourseFilters';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our comprehensive continuing education courses for CPAs, CFPs, and other financial professionals. Earn CPE, CFP, EA, and other credits.',
};

// Loading skeleton for courses
function CoursesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter skeleton */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-12 bg-slate-200 rounded-xl mb-6" />
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-10 w-20 bg-slate-200 rounded-lg" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-10 bg-slate-200 rounded-lg" />
          <div className="h-10 bg-slate-200 rounded-lg" />
        </div>
      </div>
      
      {/* Course cards skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-6 w-24 bg-slate-200 rounded mb-3" />
            <div className="h-6 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-3/4 bg-slate-200 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-slate-200 rounded" />
              <div className="h-6 w-16 bg-slate-200 rounded" />
            </div>
            <div className="h-4 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Courses content component
async function CoursesContent() {
  const result = await getAllCourses({ first: 200 });
  const courses = hasData(result) ? extractNodes(result.data.flmsCourses) : [];
  const error = result.error;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-xl font-bold text-red-800 mb-2">Unable to load courses</h2>
        <p className="text-red-600 mb-4">There was a problem connecting to the course database.</p>
        <details className="text-left max-w-lg mx-auto">
          <summary className="text-red-500 cursor-pointer text-sm">Technical details</summary>
          <pre className="mt-2 text-xs bg-red-100 p-3 rounded overflow-auto">{error.message}</pre>
        </details>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-lg">
        <svg className="w-20 h-20 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">No courses available</h2>
        <p className="text-slate-500">Check back soon for new courses!</p>
      </div>
    );
  }

  return <CourseFilters courses={courses} totalCount={courses.length} />;
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white">Courses</span>
          </nav>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Continuing Education Courses
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Earn CPE, CFP®, EA, CDFA®, and other credits with our comprehensive 
            library of self-study courses designed for financial professionals.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg">
              <span className="text-2xl font-bold">100+</span>
              <span className="text-blue-200 ml-2">Courses</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg">
              <span className="text-2xl font-bold">7</span>
              <span className="text-blue-200 ml-2">Designations</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg">
              <span className="text-2xl font-bold">Self-Paced</span>
              <span className="text-blue-200 ml-2">Learning</span>
            </div>
          </div>
        </div>
      </header>

      {/* Designation Quick Links */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            <span className="text-sm font-medium text-slate-500 flex-shrink-0">Quick filters:</span>
            {[
              { label: 'All Courses', href: '/courses/' },
              { label: 'CPA/CPE', href: '/courses/?d=cpa' },
              { label: 'CFP®', href: '/courses/?d=cfp' },
              { label: 'EA/OTRP', href: '/courses/?d=ea-otrp' },
              { label: 'CDFA®', href: '/courses/?d=cdfa' },
              { label: 'Ethics', href: '/courses/?q=ethics' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-amber-100 hover:text-amber-700 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<CoursesSkeleton />}>
            <CoursesContent />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-4">
            Need help choosing a course?
          </h2>
          <p className="text-lg text-slate-800 mb-6">
            Our team is here to help you find the right courses for your continuing education needs.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
