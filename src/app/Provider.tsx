'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppSplashGate from './splash/AppSplashGate';
import { useState } from 'react';
import AuthProvider from '@/context/AuthProvider';
import { ThemeProvider } from 'next-themes';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={['light', 'dark', 'red_bull', 'ferrari']}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppSplashGate>{children}</AppSplashGate>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
