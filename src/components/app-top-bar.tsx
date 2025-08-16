import React, { JSX } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

/**
 * A component that renders the top bar for the app.
 * It includes the sidebar trigger button.
 * @returns {JSX.Element}
 */
const AppTopBar = (): JSX.Element => {
  return (
    <div className="w-full bg-base-black h-15 border-b-1 border-base-white pl-1 pr-1 lg:pl-3 lg:pr-3 overflow-hidden lg:h-18">
      <div className="flex flex-row items-center justify-between h-full">
        <div className="flex flex-row items-center">
          {/* trigger */}
          <SidebarTrigger className="hover:bg-ui-700 " />
          {/* separator */}
          <div className="h-6 border-r-1 border-base-white mr-2 ml-4 lg:h-10" />
          {/* online status  */}
          <h1 className="text-ui-600 text-sm">System Online</h1>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          {/* notification icon */}
          <Bell className="h-5 w-5 text-base-white lg:h-7 lg:w-7" />
          {/* profile image */}
          <Avatar>
            {/* @TODO : add profile image from API */}
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="h-7 w-7 rounded-full lg:h-10 lg:w-10"
              alt="profile"
            />
            <AvatarFallback className="text-white text-sm">
              <User className="h-6 w-6 rounded-full bg-brand-200 p-1 lg:h-10 lg:w-10" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
