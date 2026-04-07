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
    <>
      {showHeader && <Header />}
      <div className="lg:pb-0">{children}</div>
      <Analytics />
      {showFooter && (
        <>
          <Footer />
          <div className="mobile">
            <MobileFooter />
          </div>
        </>
      )}
    </>
  );
}
