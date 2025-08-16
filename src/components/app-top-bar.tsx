import React, { JSX } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Bell } from "lucide-react";

/**
 * A component that renders the top bar for the app.
 * It includes the sidebar trigger button.
 * @returns {JSX.Element}
 */
const AppTopBar = (): JSX.Element => {
  return (
    <div className="w-full bg-base-black h-12 border-b-1 border-base-white pl-1 pr-1">
      <div className="flex flex-row items-center justify-between h-full">
        <div className="flex flex-row items-center">
          {/* trigger */}
          <SidebarTrigger className="hover:bg-ui-700 " />
          {/* separator */}
          <div className="h-6 border-r-1 border-base-white mr-2 ml-4"/>
          {/* online status  */}
          <h1 className="text-ui-600 text-sm">System Online</h1>
        </div>
        <div>
          {/* notification icon */}
          <Bell className="h-5 w-5 text-base-white" />
          {/* profile image */}
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
