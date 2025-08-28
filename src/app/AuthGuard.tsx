'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import AppSideBar from '~/components/app-sidebar';
import AppTopBar from '~/components/app-top-bar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { CookieNames } from '~/constants/config.constants';
import { useAuthStore } from '~/state-management/auth-store';
import { useSpinnerStore } from '~/state-management/spinner-store';

// This component is used to protect routes that require authentication
// in case the user is not logged in all navigation will be redirected to the login page
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  //get check if the user is logged in
  const isTokenSet = useAuthStore((state) => state.tokenSet);
  const setToken = useAuthStore((state) => state.setToken);

  const resetSpinner = useSpinnerStore((state) => state.resetSpinner);
  // if the user is not logged in redirect to the login page
  useEffect(() => {
    const cookieToken = Cookies.get(CookieNames.token);
    // check for token in cookies
    if (!cookieToken) {
      setToken(''); // ensure tokenSet becomes false
      router.replace('/login');
    } else if (pathname === '/login') {
      setToken(cookieToken);
      router.replace('/');
    } else {
      setToken(cookieToken);
    }
    // set loading false
    resetSpinner();
  }, [router, pathname, resetSpinner, setToken]);

  // if the user is not logged in return the login page
  if (!isTokenSet) {
    if (pathname === '/login') return children;
    return null;
  } else if (pathname === '/login') {
    return null;
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
