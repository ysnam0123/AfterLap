'use client';

import { Analytics } from '@vercel/analytics/next';
import Header from './Header';
import Footer from './Footer';
import MobileFooter from '../../mobile/MobileFooter';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hiddenHeaderRoutes = ['/login'];
  const showHeader = !hiddenHeaderRoutes.includes(pathname);

  const hiddenFooterRoutes = ['/preference', '/login'];
  const showFooter = !hiddenFooterRoutes.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className={`flex-1 ${showFooter ? 'pb-17.5 lg:pb-0' : ''}`}>
        {children}
      </main>
      <Analytics />
      {showFooter && (
        <>
          <div className="desktop">
            <Footer />
          </div>
          <div className="mobile">
            <MobileFooter />
          </div>
        </>
      )}
    </div>
  );
}
