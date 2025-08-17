'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import AuthGuard from './AuthGuard';

/**
 * This component contains all the providers for the app
 */
const AppLayoutProviders = ({ children }: { children: React.ReactNode }) => {
  //initialize query client
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
    </QueryClientProvider>
  );
};

export default AppLayoutProviders;
