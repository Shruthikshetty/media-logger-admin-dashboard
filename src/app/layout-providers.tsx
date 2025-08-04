"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AppSideBar from "~/components/app-sidebar";
import AppTopBar from "~/components/app-top-bar";
import { SidebarProvider } from "~/components/ui/sidebar";

//initialize query client
const queryClient = new QueryClient();

/**
 * This component contains all the providers for the app
 */
const AppLayoutProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSideBar />
        <div className="flex-grow flex-col ">
          <AppTopBar />
          <main className="bg-base-black h-full">{children}</main>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default AppLayoutProviders;
