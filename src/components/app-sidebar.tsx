"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { NAVIGATION_ICONS } from "~/constants/screen.constants";

/**
 * this component is the sidebar for the app
 * @returns {JSX.Element}
 */
function AppSideBar() {
  return (
    <Sidebar className="border-r-2 border-gray-500">
      <SidebarContent className="bg-base-black text-base-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base-white">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION_ICONS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSideBar;
