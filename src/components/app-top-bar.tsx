import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

/**
 * A component that renders the top bar for the app.
 * It includes the sidebar trigger button.
 * @returns {JSX.Element}
 */
const AppTopBar = () => {
  return (
    <div className="w-full bg-base-black h-12">
      <SidebarTrigger />
    </div>
  );
};

export default AppTopBar;
