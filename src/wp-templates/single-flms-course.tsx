import { gql } from '@apollo/client';
import Link from 'next/link';

export default function CourseTemplate({ data }: { data: any }) {
  const { flmsCourse } = data || {};

  if (!flmsCourse) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Course not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Course Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            {flmsCourse.courseNumber && (
              <span className="bg-amber-500 text-slate-900 font-mono text-sm font-bold px-3 py-1 rounded">
                #{flmsCourse.courseNumber}
              </span>
            )}
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold">
            {flmsCourse.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-slate-200">
                <nav className="flex">
                  <button className="px-6 py-4 font-semibold text-slate-800 border-b-2 border-amber-500">
                    Description
                  </button>
                  <button className="px-6 py-4 text-slate-500 hover:text-slate-700">
                    Details
                  </button>
                  <button className="px-6 py-4 text-slate-500 hover:text-slate-700">
                    Materials
                  </button>
                </nav>
              </div>
              
              <div className="p-8">
                {flmsCourse.courseDescription ? (
                  <div 
                    className="wp-content"
                    dangerouslySetInnerHTML={{ __html: flmsCourse.courseDescription }}
                  />
                ) : flmsCourse.content ? (
                  <div 
                    className="wp-content"
                    dangerouslySetInnerHTML={{ __html: flmsCourse.content }}
                  />
                ) : (
                  <p className="text-slate-500">Course description not available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credits Box */}
            {flmsCourse.courseCredits?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 pb-3 border-b-2 border-amber-500">
                  Course Credits
                </h3>
                <div className="space-y-3">
                  {flmsCourse.courseCredits.map((credit: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-600">{credit.name}</span>
                      <span className="font-bold text-slate-800">{credit.credits}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Box */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 pb-3 border-b-2 border-amber-500">
                Get This Course
              </h3>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">
                Add to Cart
              </button>
              <p className="text-sm text-slate-500 mt-3 text-center">
                Instant access after purchase
              </p>
            </div>

            {/* Materials */}
            {flmsCourse.courseMaterials?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 pb-3 border-b-2 border-amber-500">
                  Course Materials
                </h3>
                <ul className="space-y-2">
                  {flmsCourse.courseMaterials.map((material: any, idx: number) => (
                    <li key={idx}>
                      <a 
                        href={material.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {material.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link 
            href="/courses/"
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            ← Back to All Courses
          </Link>
        </div>
      </div>
    </main>
  );
}

CourseTemplate.query = gql`
  query GetCourse($uri: String!) {
    flmsCourse(id: $uri, idType: URI) {
      id
      databaseId
      title
      content
      uri
      courseNumber
      courseDescription
      coursePreview
      courseCredits {
        type
        name
        credits
      }
      courseMaterials {
        title
        file
      }
      wooProductId
      masterCourseListFields {
        iarApprovalDate
        notes
      }
    }
  }
`;

CourseTemplate.variables = ({ uri }: { uri: string }) => ({
  uri,
});

