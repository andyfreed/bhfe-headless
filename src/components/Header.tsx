/**
 * Site Header
 * 
 * Main navigation header matching bhfe.com structure.
 * Includes logo, nav menu with dropdowns, login, cart, and search.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

/**
 * Navigation structure matching bhfe.com
 * TODO: Replace with WPGraphQL menu fetch when menus are exposed
 */
const navigation = {
  main: [
    { label: 'Contact', href: '/contact/' },
    {
      label: 'Shop Courses',
      href: '/courses/',
      children: [
        { label: 'All Courses', href: '/courses/' },
        { label: 'Ethics Courses', href: '/course-category/ethics/' },
        { label: 'CFP® Courses', href: '/course-category/cfp/' },
        { label: 'CPA Courses', href: '/course-category/cpa/' },
        { label: 'CDFA Courses', href: '/course-category/cdfa/' },
        { label: 'EA/OTRP Courses', href: '/course-category/ea-otrp/' },
        { label: 'ERPA Courses', href: '/course-category/erpa/' },
        { label: 'IWI/CIMA Courses', href: '/course-category/iwi-cima/' },
        { label: 'IAR Courses', href: '/course-category/iar/' },
      ],
    },
    { label: 'About Us', href: '/about/' },
    { label: 'Support', href: '/support/' },
  ],
  utility: [
    { label: 'Log In', href: '/login/', icon: 'user' },
    { label: 'Cart', href: '/cart/', icon: 'cart' },
    { label: 'Search', href: '#', icon: 'search', isSearch: true },
  ],
};

function UserIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CartIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface DropdownMenuProps {
  items: { label: string; href: string }[];
  isOpen: boolean;
}

function DropdownMenu({ items, isOpen }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search/?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close search"
        >
          <CloseIcon />
        </button>
        
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:ring-0 outline-none transition-colors"
            />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Enter</kbd> to search or <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Esc</kbd> to close
          </p>
        </form>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  // Placeholder cart count - connect to WooCommerce later
  const cartCount = 0;

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">BH</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-playfair text-xl font-bold text-slate-900 block leading-tight">
                  Beacon Hill
                </span>
                <span className="text-amber-600 text-sm font-medium -mt-1 block">
                  Financial Educators
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-slate-50"
                  >
                    {item.label}
                    {item.children && <ChevronDownIcon className="w-4 h-4" />}
                  </Link>
                  {item.children && (
                    <DropdownMenu items={item.children} isOpen={openDropdown === item.label} />
                  )}
                </div>
              ))}
            </nav>

            {/* Utility Navigation */}
            <div className="flex items-center gap-2">
              {/* Desktop utility links */}
              <div className="hidden md:flex items-center gap-1">
                {/* Log In */}
                <Link
                  href="/login/"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-slate-50"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden xl:inline">Log In</span>
                </Link>

                {/* Cart */}
                <Link
                  href="/cart/"
                  className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-slate-50"
                >
                  <CartIcon className="w-5 h-5" />
                  <span className="hidden xl:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-slate-50"
                  aria-label="Search"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>

              {/* CTA Button - Desktop */}
              <Link
                href="/courses/"
                className="hidden lg:inline-flex items-center px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors shadow-sm"
              >
                Browse Courses
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* Search bar - mobile */}
              <div className="pb-4 mb-4 border-b border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.querySelector('input') as HTMLInputElement;
                    if (input.value.trim()) {
                      window.location.href = `/search/?q=${encodeURIComponent(input.value)}`;
                    }
                  }}
                  className="relative"
                >
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </form>
              </div>

              {/* Main nav items */}
              {navigation.main.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDownIcon 
                          className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === item.label ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      {mobileSubmenuOpen === item.label && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600 rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-slate-200 my-4" />

              {/* Utility links - mobile */}
              <Link
                href="/login/"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserIcon className="w-5 h-5" />
                <span>Log In</span>
              </Link>

              <Link
                href="/cart/"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CartIcon className="w-5 h-5" />
                <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
              </Link>

              {/* CTA - mobile */}
              <div className="pt-4">
                <Link
                  href="/courses/"
                  className="block w-full text-center px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
