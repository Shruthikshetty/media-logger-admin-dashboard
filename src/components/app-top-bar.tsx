import React, { JSX } from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

/**
 * A component that renders the top bar for the app.
 * It includes the sidebar trigger button.
 * @returns {JSX.Element}
 */
const AppTopBar = (): JSX.Element => {
  return (
    <div className="bg-base-black border-base-white h-16 w-full overflow-hidden border-b pr-1 pl-1 lg:h-[4.6rem] lg:pr-3 lg:pl-3">
      <div className="flex h-full flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {/* trigger */}
          <SidebarTrigger className="hover:bg-ui-700" />
          {/* separator */}
          <div className="border-base-white mr-4 ml-5 h-6 border-r lg:h-8 opacity-50" />
          {/* online status  */}
          <div className="flex flex-row items-center gap-2">
            <div className="bg-feedback-success-light h-3 w-3 animate-pulse rounded-full" />
            <h1 className="text-ui-600 text-sm">System Online</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          {/* notification icon */}
          <Bell className="text-base-white h-5 w-5 lg:h-7 lg:w-7" />
          {/* profile image */}
          <Avatar>
            {/* @TODO : add profile image from API */}
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="h-7 w-7 rounded-full lg:h-10 lg:w-10"
              alt="profile"
            />
            <AvatarFallback className="text-sm text-white">
              <User className="bg-brand-200 h-6 w-6 rounded-full p-1 lg:h-10 lg:w-10" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
