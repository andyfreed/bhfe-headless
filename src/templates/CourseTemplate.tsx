/**
 * Course Template
 * 
 * Template for FLMS Course single pages
 */

import Link from 'next/link';
import type { TemplateProps } from './index';

interface CourseData {
  __typename?: 'FlmsCourse';
  id: string;
  databaseId?: number;
  title?: string | null;
  uri?: string | null;
  slug?: string | null;
  date?: string | null;
  modified?: string | null;
  courseNumber?: string | null;
  courseDescription?: string | null;
  coursePreview?: string | null;
  wooProductId?: number | null;
  courseCredits?: Array<{
    type?: string | null;
    name?: string | null;
    credits?: string | null;
  } | null> | null;
  courseMaterials?: Array<{
    title?: string | null;
    file?: string | null;
  } | null> | null;
  masterCourseListFields?: {
    iarApprovalDate?: string | null;
    notes?: string | null;
  } | null;
}

export function CourseTemplate({ data }: TemplateProps<CourseData>) {
  const credits = data.courseCredits?.filter(Boolean) || [];
  const materials = data.courseMaterials?.filter(Boolean) || [];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/courses" className="hover:text-white">
                  Courses
                </Link>
              </li>
              <li>/</li>
              <li className="text-white truncate max-w-[300px]">{data.title}</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Course Number Badge */}
              {data.courseNumber && (
                <span className="inline-block bg-amber-500 text-slate-900 font-mono font-bold text-sm px-3 py-1 rounded mb-4">
                  #{data.courseNumber}
                </span>
              )}

              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                {data.title}
              </h1>

              {/* Credits */}
              {credits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {credits.map((credit, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      {credit?.credits} {credit?.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price/Enroll Box */}
            <div className="bg-white text-slate-800 rounded-xl p-6 shadow-xl lg:w-80">
              <h3 className="font-bold text-lg mb-4">Get This Course</h3>
              {data.wooProductId ? (
                <a
                  href={`/checkout/?add-to-cart=${data.wooProductId}`}
                  className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg text-center transition-colors"
                >
                  Enroll Now
                </a>
              ) : (
                <p className="text-slate-500 text-sm">
                  Contact us for enrollment options
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-slate-200">
                  <nav className="flex">
                    <button className="px-6 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600">
                      Course Details
                    </button>
                    <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-slate-700">
                      Preview
                    </button>
                    {materials.length > 0 && (
                      <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Materials
                      </button>
                    )}
                  </nav>
                </div>

                {/* Course Description */}
                <div className="p-6">
                  {data.courseDescription ? (
                    <div
                      className="prose prose-slate max-w-none
                        prose-headings:font-playfair
                        prose-a:text-blue-600"
                      dangerouslySetInnerHTML={{ __html: data.courseDescription }}
                    />
                  ) : (
                    <p className="text-slate-500">
                      No description available for this course.
                    </p>
                  )}
                </div>
              </div>

              {/* Course Preview */}
              {data.coursePreview && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                  <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-4">
                    Course Preview
                  </h2>
                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.coursePreview }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">
              {/* Credits Detail Card */}
              {credits.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-slate-800 mb-4">
                    Credits Offered
                  </h3>
                  <ul className="space-y-3">
                    {credits.map((credit, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-600">{credit?.name}</span>
                        <span className="font-bold text-slate-800">
                          {credit?.credits}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Course Materials */}
              {materials.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-slate-800 mb-4">
                    Course Materials
                  </h3>
                  <ul className="space-y-2">
                    {materials.map((material, idx) => (
                      <li key={idx}>
                        {material?.file ? (
                          <a
                            href={material.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {material.title || 'Download'}
                          </a>
                        ) : (
                          <span className="text-slate-500">
                            {material?.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Info */}
              {data.masterCourseListFields?.notes && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="font-bold text-amber-800 mb-2">Note</h3>
                  <p className="text-amber-700 text-sm">
                    {data.masterCourseListFields.notes}
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </main>
  );
}

