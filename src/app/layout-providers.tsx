import React from "react";
import AppSideBar from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
/**
 * This component contains all the providers for the app
 */
const AppLayoutProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSideBar />
      {children}
    </SidebarProvider>
  );
};

export default AppLayoutProviders;
