"use client";
import React, { JSX, useEffect } from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useGetUserDetails } from '~/services/user-service';
import { useAuthStore } from '~/state-management/auth-store';
import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';
import ProfilePressDropdown from './profile-press-dropdown';

/**
 * A component that renders the top bar for the app.
 * It includes the sidebar trigger button.
 * @returns {JSX.Element}
 */
const AppTopBar = (): JSX.Element => {
  // fetch user details
  const { isLoading, data } = useGetUserDetails();
  // get zustand setter for user
  const setUser = useAuthStore((state) => state.setUser);
  //set the user details
  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  return (
    <header className="bg-base-black/80 border-ui-600 sticky top-0 z-50 h-16 w-full border-b pr-1 pl-1 backdrop-blur-sm lg:h-[4.6rem] lg:pr-3 lg:pl-3">
      <div className="flex h-full flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {/* trigger */}
          <SidebarTrigger className="hover:bg-ui-700" />
          {/* separator */}
          <div className="border-base-white mr-4 ml-5 h-6 border-r opacity-50 lg:h-8" />
          {/* online status  */}
          <div className="flex flex-row items-center gap-2">
            <div
              className={cn(
                'h-3 w-3 animate-pulse rounded-full',
                data?.data ? 'bg-feedback-success-light' : 'bg-feedback-error',
              )}
            />
            <h1 className="text-ui-400 text-sm">
              System Status:{' '}
              {isLoading ? 'Loading' : data?.data ? 'Online' : 'Offline'}
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          {/* notification icon */}
          <Bell className="text-base-white h-5 w-5 lg:h-7 lg:w-7" />
          {/* profile image */}
          <ProfilePressDropdown>
            <Avatar className="border-ui-600 border-1">
              {isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                <>
                  <AvatarImage
                    src={data?.data?.profileImg}
                    className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
                    alt="profile"
                  />
                  <AvatarFallback className="text-sm text-white">
                    <User className="bg-brand-200 h-8 w-8 rounded-full p-1 lg:h-10 lg:w-10" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
          </ProfilePressDropdown>
        </div>
      </div>
    </header>
  );
};

export default AppTopBar;
