/**
 * Site Footer
 */

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">BH</span>
              </div>
              <div>
                <span className="font-playfair text-xl font-bold text-white">Beacon Hill</span>
                <span className="text-amber-400 text-sm block -mt-1">Financial Educators</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md">
              Professional continuing education courses for financial professionals. 
              Earn CPE, CFP, and other credits with our comprehensive course library.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="hover:text-amber-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>support@beaconhillfe.com</li>
              <li>1-800-BHFE-EDU</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Beacon Hill Financial Educators. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

