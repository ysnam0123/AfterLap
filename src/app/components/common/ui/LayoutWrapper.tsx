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
  const isLogin = pathname === '/login';
  return (
    <>
      {!isLogin && <Header />}
      <div className="min-h-screen lg:pb-0">{children}</div>
      <Analytics />
      {!isLogin && (
        <>
          <Footer />
          <MobileFooter />
        </>
      )}
    </>
  );
}
