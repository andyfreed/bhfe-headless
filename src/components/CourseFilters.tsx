/**
 * Course Filters Component
 * 
 * Advanced search/filter UI for courses matching bhfe.com design.
 * Syncs filters with URL querystring for shareable links.
 */

'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

// Credit/designation types that courses can offer
const DESIGNATIONS = [
  { id: 'cpa', label: 'CPA', color: 'bg-blue-100 text-blue-800' },
  { id: 'cfp', label: 'CFP®', color: 'bg-green-100 text-green-800' },
  { id: 'ea-otrp', label: 'EA/OTRP', color: 'bg-purple-100 text-purple-800' },
  { id: 'erpa', label: 'ERPA', color: 'bg-orange-100 text-orange-800' },
  { id: 'cdfa', label: 'CDFA®', color: 'bg-pink-100 text-pink-800' },
  { id: 'iwi-cima', label: 'IWI/CIMA®', color: 'bg-teal-100 text-teal-800' },
  { id: 'iar', label: 'IAR', color: 'bg-indigo-100 text-indigo-800' },
] as const;

// Sort options
const SORT_OPTIONS = [
  { id: 'title-asc', label: 'Title (A-Z)' },
  { id: 'title-desc', label: 'Title (Z-A)' },
  { id: 'number-asc', label: 'Course Number' },
  { id: 'credits-desc', label: 'Most Credits' },
  { id: 'credits-asc', label: 'Fewest Credits' },
] as const;

interface CourseCredit {
  name?: string | null;
  credits?: string | null;
  type?: string | null;
}

interface Course {
  id: string;
  databaseId?: number;
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  courseNumber?: string | null;
  courseDescription?: string | null;
  courseCredits?: Array<CourseCredit | null> | null;
}

interface CourseFiltersProps {
  courses: Course[];
  totalCount?: number;
}

interface FilterState {
  search: string;
  designations: string[];
  minCredits: number;
  maxCredits: number;
  sort: string;
}

function parseCredits(credit: CourseCredit | null): number {
  if (!credit?.credits) return 0;
  const num = parseFloat(credit.credits);
  return isNaN(num) ? 0 : num;
}

function getCourseMaxCredits(course: Course): number {
  if (!course.courseCredits) return 0;
  return Math.max(...course.courseCredits.map(parseCredits), 0);
}

function matchesDesignation(course: Course, designations: string[]): boolean {
  if (designations.length === 0) return true;
  if (!course.courseCredits) return false;
  
  return designations.some((designation) => {
    return course.courseCredits?.some((credit) => {
      if (!credit?.name) return false;
      const name = credit.name.toLowerCase();
      
      switch (designation) {
        case 'cpa':
          return name.includes('cpa') || name.includes('cpe');
        case 'cfp':
          return name.includes('cfp');
        case 'ea-otrp':
          return name.includes('ea') || name.includes('otrp') || name.includes('irs');
        case 'erpa':
          return name.includes('erpa');
        case 'cdfa':
          return name.includes('cdfa');
        case 'iwi-cima':
          return name.includes('iwi') || name.includes('cima');
        case 'iar':
          return name.includes('iar');
        default:
          return false;
      }
    });
  });
}

export function CourseFilters({ courses, totalCount }: CourseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse initial state from URL
  const [filters, setFilters] = useState<FilterState>(() => ({
    search: searchParams.get('q') || '',
    designations: searchParams.get('d')?.split(',').filter(Boolean) || [],
    minCredits: parseInt(searchParams.get('min') || '1') || 1,
    maxCredits: parseInt(searchParams.get('max') || '50') || 50,
    sort: searchParams.get('sort') || 'title-asc',
  }));

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.designations.length > 0) params.set('d', newFilters.designations.join(','));
    if (newFilters.minCredits > 1) params.set('min', String(newFilters.minCredits));
    if (newFilters.maxCredits < 50) params.set('max', String(newFilters.maxCredits));
    if (newFilters.sort !== 'title-asc') params.set('sort', newFilters.sort);

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router]);

  // Debounced URL update for search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, updateURL]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Text search
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter((course) => {
        const title = course.title?.toLowerCase() || '';
        const number = course.courseNumber?.toLowerCase() || '';
        const description = course.courseDescription?.toLowerCase() || '';
        return title.includes(query) || number.includes(query) || description.includes(query);
      });
    }

    // Designation filter
    if (filters.designations.length > 0) {
      result = result.filter((course) => matchesDesignation(course, filters.designations));
    }

    // Credit range filter
    result = result.filter((course) => {
      const maxCredits = getCourseMaxCredits(course);
      return maxCredits >= filters.minCredits && maxCredits <= filters.maxCredits;
    });

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'number-asc':
          return (a.courseNumber || '').localeCompare(b.courseNumber || '');
        case 'credits-desc':
          return getCourseMaxCredits(b) - getCourseMaxCredits(a);
        case 'credits-asc':
          return getCourseMaxCredits(a) - getCourseMaxCredits(b);
        case 'title-asc':
        default:
          return (a.title || '').localeCompare(b.title || '');
      }
    });

    return result;
  }, [courses, filters]);

  const toggleDesignation = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      designations: prev.designations.includes(id)
        ? prev.designations.filter((d) => d !== id)
        : [...prev.designations, id],
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      designations: [],
      minCredits: 1,
      maxCredits: 50,
      sort: 'title-asc',
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.designations.length > 0 || 
    filters.minCredits > 1 || 
    filters.maxCredits < 50;

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by course title, number, or keyword..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-0 outline-none transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-100 rounded-lg text-slate-700 font-medium mb-4"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {hasActiveFilters && `(${filters.designations.length + (filters.search ? 1 : 0)})`}
          </span>
          <svg className={`w-5 h-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Filter Controls */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
          {/* Designation Tabs */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Filter by Designation
            </label>
            <div className="flex flex-wrap gap-2">
              {DESIGNATIONS.map((designation) => {
                const isActive = filters.designations.includes(designation.id);
                return (
                  <button
                    key={designation.id}
                    onClick={() => toggleDesignation(designation.id)}
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${isActive 
                        ? 'bg-amber-500 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }
                    `}
                  >
                    {designation.label}
                    {isActive && (
                      <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Credit Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Min Credits
              </label>
              <select
                value={filters.minCredits}
                onChange={(e) => setFilters((prev) => ({ ...prev, minCredits: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:ring-0 outline-none bg-white"
              >
                {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Max Credits
              </label>
              <select
                value={filters.maxCredits}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxCredits: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:ring-0 outline-none bg-white"
              >
                {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort & Clear */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-600">Sort by:</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 focus:ring-0 outline-none bg-white text-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
          <span>
            Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
            {hasActiveFilters && ' (filtered)'}
          </span>
          {filters.designations.length > 0 && (
            <span className="hidden md:inline">
              Filtering by: {filters.designations.map((d) => DESIGNATIONS.find((x) => x.id === d)?.label).join(', ')}
            </span>
          )}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No courses found</h3>
          <p className="text-slate-500 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const maxCredits = getCourseMaxCredits(course);

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="p-6">
        {/* Course Number */}
        {course.courseNumber && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block bg-slate-900 text-white font-mono text-xs font-bold px-2.5 py-1 rounded">
              #{course.courseNumber}
            </span>
            {maxCredits > 0 && (
              <span className="text-xs text-slate-500">
                {maxCredits} credits
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="font-playfair text-lg font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
          <Link href={course.uri || `/courses/${course.slug}/`}>
            {course.title}
          </Link>
        </h2>

        {/* Credits Badges */}
        {course.courseCredits && course.courseCredits.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.courseCredits
              .filter((c): c is CourseCredit => c !== null && !!c.name)
              .slice(0, 5)
              .map((credit, idx) => {
                const designation = DESIGNATIONS.find((d) => 
                  credit.name?.toLowerCase().includes(d.id.replace('-', '')) ||
                  credit.name?.toLowerCase().includes(d.label.toLowerCase().replace('®', ''))
                );
                return (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-2 py-1 rounded ${designation?.color || 'bg-slate-100 text-slate-700'}`}
                  >
                    {credit.credits} {credit.name}
                  </span>
                );
              })}
          </div>
        )}

        {/* Description */}
        {course.courseDescription && (
          <p className="text-slate-600 text-sm line-clamp-2 mb-4">
            {course.courseDescription.replace(/<[^>]*>/g, '').substring(0, 120)}...
          </p>
        )}

        {/* View Link */}
        <Link
          href={course.uri || `/courses/${course.slug}/`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 group-hover:gap-3 transition-all"
        >
          View Course
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
