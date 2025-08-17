'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import AppSideBar from '~/components/app-sidebar';
import AppTopBar from '~/components/app-top-bar';
import { SidebarProvider } from '~/components/ui/sidebar';

// This component is used to protect routes that require authentication
// in case the user is not logged in all navigation will be redirected to the login page
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = true;
  const router = useRouter();
  const pathname = usePathname();

  // if the user is not logged in redirect to the login page
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    } else if (pathname === '/login') {
      router.replace('/');
    }
  }, [isLoggedIn, router, pathname]);

  // if the user is not logged in return the login page
  if (isLoggedIn) {
    return children;
  }

  // if the user is logged in return the sidebar with the tabs
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className="h-full w-full grow flex-col">
        <AppTopBar />
        <main className="bg-base-black h-full w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuthGuard;
