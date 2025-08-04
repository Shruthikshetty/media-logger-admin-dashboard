import {
  Film,
  Gamepad2,
  LayoutDashboard,
  Settings,
  Tv,
  Users,
} from "lucide-react";

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

// Menu items.
const items = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Movies", href: "/movies", icon: Film },
  { title: "TV Shows", href: "/tv-shows", icon: Tv },
  { title: "Games", href: "/games", icon: Gamepad2 },
  { title: "Users", href: "/users", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
];
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
              {items.map((item) => (
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
