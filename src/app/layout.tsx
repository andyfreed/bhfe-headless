import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '@/styles/globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'Beacon Hill Financial Educators',
    template: '%s | BHFE',
  },
  description: 'Professional continuing education courses for financial professionals',
  keywords: ['CPE', 'CFP', 'continuing education', 'financial education', 'tax courses'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

