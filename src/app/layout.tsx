import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { StagingBadge } from '@/components/StagingBadge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * STAGING ENVIRONMENT METADATA
 * 
 * This is a staging-only deployment. All pages are set to noindex/nofollow.
 */
export const metadata: Metadata = {
  title: {
    default: '[STAGING] Beacon Hill Financial Educators',
    template: '[STAGING] %s | BHFE',
  },
  description: 'STAGING - Professional continuing education courses for financial professionals',
  keywords: ['CPE', 'CFP', 'continuing education', 'financial education', 'tax courses'],
  
  // STAGING: Prevent all search engine indexing
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  
  // Additional meta tags for staging
  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* STAGING: Explicit noindex meta tag */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {/* STAGING: Visible staging indicator */}
        <StagingBadge />
        
        {/* Site Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
