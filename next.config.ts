import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  // Service Worker 파일의 위치
  dest: 'public',

  disable: process.env.NODE_ENV === 'development',

  // 캐시 지옥의 핵심
  // URL 요청이 발생하면, Service Worker가 어떻게 응답할지 정의
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-api',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1시간
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.ytimg.com',
      'media.formula1.com',
      'www.formula1.com',
      'axykebsdqztifmbbluzg.supabase.co',
    ],
  },
};

export default withPWA(nextConfig);
