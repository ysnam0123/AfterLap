'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppSplashGate from './splash/AppSplashGate';
import { useState } from 'react';
import AuthProvider from '@/context/AuthProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  // const queryClient = new QueryClient();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppSplashGate>{children}</AppSplashGate>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
