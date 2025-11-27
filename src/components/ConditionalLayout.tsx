'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { StagingBadge } from './StagingBadge';

const authRoutes = ['/login', '/register', '/forgot-password'];

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some(route => pathname?.startsWith(route));

  if (isAuthRoute) {
    return (
      <>
        <StagingBadge />
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

