/**
 * Contact Page Template
 * 
 * Template for contact pages with form support
 */

import Link from 'next/link';
import type { TemplateProps } from './index';

interface ContactPageData {
  __typename?: 'Page';
  id: string;
  title?: string | null;
  content?: string | null;
  uri?: string | null;
  acfContactFields?: {
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    hours?: string | null;
    mapEmbed?: string | null;
  } | null;
}

export function ContactTemplate({ data }: TemplateProps<ContactPageData>) {
  const contactFields = data.acfContactFields;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{data.title || 'Contact'}</li>
            </ol>
          </nav>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold">
            {data.title || 'Contact Us'}
          </h1>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Contact Info */}
            <div className="mb-12 lg:mb-0">
              {/* Page Content */}
              {data.content && (
                <div
                  className="prose prose-slate max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}

              {/* Contact Details from ACF */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-slate-800">
                  Get in Touch
                </h2>

                {contactFields?.address && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Address</h3>
                      <p
                        className="text-slate-600"
                        dangerouslySetInnerHTML={{ __html: contactFields.address }}
                      />
                    </div>
                  </div>
                )}

                {contactFields?.phone && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Phone</h3>
                      <a
                        href={`tel:${contactFields.phone.replace(/\D/g, '')}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {contactFields.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contactFields?.email && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Email</h3>
                      <a
                        href={`mailto:${contactFields.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {contactFields.email}
                      </a>
                    </div>
                  </div>
                )}

                {contactFields?.hours && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Hours</h3>
                      <p
                        className="text-slate-600"
                        dangerouslySetInnerHTML={{ __html: contactFields.hours }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Map */}
              {contactFields?.mapEmbed && (
                <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="aspect-video"
                    dangerouslySetInnerHTML={{ __html: contactFields.mapEmbed }}
                  />
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="credits">Credit Questions</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

