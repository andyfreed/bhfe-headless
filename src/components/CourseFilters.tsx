/**
 * Course Filters Component
 * 
 * Client-side search and filtering for courses.
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  databaseId?: number;
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  courseNumber?: string | null;
  courseDescription?: string | null;
  courseCredits?: Array<{
    name?: string | null;
    credits?: string | null;
  } | null> | null;
}

interface CourseFiltersProps {
  courses: Course[];
}

export function CourseFilters({ courses }: CourseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreditType, setSelectedCreditType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'number'>('title');

  // Extract unique credit types from all courses
  const creditTypes = useMemo(() => {
    const types = new Set<string>();
    courses.forEach((course) => {
      course.courseCredits?.forEach((credit) => {
        if (credit?.name) {
          types.add(credit.name);
        }
      });
    });
    return Array.from(types).sort();
  }, [courses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((course) => {
        const title = course.title?.toLowerCase() || '';
        const number = course.courseNumber?.toLowerCase() || '';
        const description = course.courseDescription?.toLowerCase() || '';
        return (
          title.includes(query) ||
          number.includes(query) ||
          description.includes(query)
        );
      });
    }

    // Credit type filter
    if (selectedCreditType !== 'all') {
      result = result.filter((course) =>
        course.courseCredits?.some(
          (credit) => credit?.name === selectedCreditType
        )
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'number') {
        const numA = a.courseNumber || '';
        const numB = b.courseNumber || '';
        return numA.localeCompare(numB);
      }
      const titleA = a.title || '';
      const titleB = b.title || '';
      return titleA.localeCompare(titleB);
    });

    return result;
  }, [courses, searchQuery, selectedCreditType, sortBy]);

  return (
    <div>
      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">
              Search Courses
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by title, number, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Credit Type Filter */}
          <div>
            <label htmlFor="creditType" className="block text-sm font-medium text-slate-700 mb-1">
              Credit Type
            </label>
            <select
              id="creditType"
              value={selectedCreditType}
              onChange={(e) => setSelectedCreditType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="all">All Credit Types</option>
              {creditTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'number')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="title">Title (A-Z)</option>
              <option value="number">Course Number</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredCourses.length} of {courses.length} courses
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCreditType !== 'all' && ` with ${selectedCreditType} credits`}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-500 text-lg mb-2">No courses found</p>
          <p className="text-slate-400">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCreditType('all');
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

