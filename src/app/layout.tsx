import type { Metadata, Viewport } from 'next';
import './globals.css';
import './root.css';
import Provider from './Provider';
import LayoutWrapper from './components/common/ui/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://afterlap.vercel.app'
      : 'http://localhost:3000',
  ),
  title: 'AfterLap',
  description: 'F1의 결과를 한눈에 확인하세요.',
  openGraph: {
    title: 'AfterLap',
    description: 'F1의 결과를 한눈에 확인하세요.',
    images: [
      {
        url: '/icons/icon-192.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/AfterLapLogo.svg',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 안드로아드/크롬 계열 브라우저에서 pwa를 허용 */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* ios safari에서 pwa를 허용 */}
        {/* ios는 manifest.json 만으로는 부족하다. */}
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* ios에서 상태바 스타일 제어 */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* 여기서 부턴, 기기 별로 사용되는 스플래시 이미지 */}
        {/* iPhone 14 / 15 Pro Max */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-1290-2796.jpg"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />

        {/* iPhone 14 / 15 Pro  */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-1179-2556.jpg"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />

        {/* iPhone 12 / 13 / 14  */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-1170-2532.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        {/* iPad Pro 12.9  */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-2048-2732.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        {/* iPad Pro 11  */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-1668-2388.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </head>
      <body className="bg-(--color-bg-primary) text-white">
        <Provider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
