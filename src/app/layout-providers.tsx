"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AppSideBar from "~/components/app-sidebar";
import AppTopBar from "~/components/app-top-bar";
import { SidebarProvider } from "~/components/ui/sidebar";

/**
 * This component contains all the providers for the app
 */
const AppLayoutProviders = ({ children }: { children: React.ReactNode }) => {
  //initialize query client
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSideBar />
        <div className="grow flex-col h-full w-full">
          <AppTopBar />
          <main className="bg-base-black h-full w-full overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default AppLayoutProviders;
