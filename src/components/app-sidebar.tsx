'use client';

import { Film } from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { NAVIGATION_ICONS } from '~/constants/screen.constants';

/**
 * this component is the sidebar for the app
 * @returns {JSX.Element}
 */
function AppSideBar() {
  return (
    <Sidebar className="border-r-2 border-gray-500">
      <SidebarContent className="bg-base-black text-base-white">
        {/* logo  */}
        <SidebarGroup className="border-base-white border-b pt-3 pb-4 pl-5">
          <div className="flex flex-row items-center gap-3">
            <div>
              <Film className="from-accent-indigo to-accent-purple h-7 w-7 rounded-sm bg-gradient-to-r p-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Media Logger</h1>
              <h2 className="text-ui-600 text-sm font-light">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </SidebarGroup>
        {/* navigation's */}
        <SidebarGroup className="pt-1">
          <SidebarGroupLabel className="text-base-white text-base ml-1 opacity-80">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {NAVIGATION_ICONS.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-base-white p-0.5"
                >
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-ui-700 hover:text-base-white"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span className="ml-1 text-lg">{item.title}</span>
                    </Link>
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
