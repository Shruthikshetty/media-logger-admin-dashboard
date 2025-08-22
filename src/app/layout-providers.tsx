'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import AuthGuard from './AuthGuard';
import { Toaster } from 'sonner';
import { SpinnerOverlay } from '~/components/app-spinner';
import ThemeProvider from '~/components/theme-provider';

/**
 * This component contains all the providers for the app
 */
const AppLayoutProviders = ({ children }: { children: React.ReactNode }) => {
  //initialize query client
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>{children}</AuthGuard>
        <Toaster
          theme="dark"
          toastOptions={{
            classNames: {
              toast: '!h-15',
              title: '!text-sm',
            },
          }}
        />
        <SpinnerOverlay />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppLayoutProviders;
