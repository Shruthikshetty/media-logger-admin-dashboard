'use client';

import { Film } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
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
import { cn } from '~/lib/utils';

/**
 * this component is the sidebar for the app
 * @returns {JSX.Element}
 */
function AppSideBar() {
  const pathName = usePathname();

  // get the current selected tab
  const currentTab = useMemo(() => {
    return (
      NAVIGATION_ICONS.find(
        (item) => item.href.replace('/', '') == pathName.split('/')[1],
      )?.title ?? NAVIGATION_ICONS[0].title
    );
  }, [pathName]);

  return (
    <Sidebar className="border-r-2 border-ui-600">
      <SidebarContent className="bg-base-black text-base-white">
        {/* logo  */}
        <SidebarGroup className="border-ui-600 border-b pt-3 pb-4 pl-5">
          <div className="flex flex-row items-center gap-3">
            <div>
              <Film className="to-accent-purple h-8 w-9 rounded-md bg-gradient-to-r from-blue-600 p-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Media Logger</h1>
              <h2 className="text-ui-400 text-sm font-light">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </SidebarGroup>
        {/* navigation's */}
        <SidebarGroup className="pt-1">
          <SidebarGroupLabel className="text-base-white ml-1 text-base opacity-80">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {NAVIGATION_ICONS.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    'text-base-white p-0.5',
                    currentTab === item.title
                      ? 'bg-brand-500 text-base-black rounded-md'
                      : '',
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'hover:bg-ui-700 hover:text-base-white active:bg-brand-200',
                      currentTab === item.title ? 'hover:bg-brand-200' : '',
                    )}
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
