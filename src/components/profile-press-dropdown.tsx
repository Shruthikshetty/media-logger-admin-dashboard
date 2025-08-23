'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { ProfileMenuItems } from '~/constants/screen.constants';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '~/state-management/auth-store';
import { CookieNames } from '~/constants/config.constants';
import Cookies from 'js-cookie';

type ProfilePressDropdownProps = {
  children: React.ReactNode;
};

/**
 * Dropdown menu for profile press
 * This open up the menu items on click of the Profile image
 */
const ProfilePressDropdown = ({ children }: ProfilePressDropdownProps) => {
  const router = useRouter();
  //get the user details from the store
  const userDetails = useAuthStore((s) => s.user);
  //get reset auth details
  const resetAuth = useAuthStore((s) => s.resetAuth);

  //handle logout
  const handleLogout = () => {
    //reset auth details
    resetAuth();
    //remove cookies
    Cookies.remove(CookieNames.token);
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="open profile menu"
          disabled={!!userDetails}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 min-w-50 rounded-lg border p-0.5 pb-1 shadow-[0px_0px_15px] lg:min-w-80"
          align="start"
        >
          <DropdownMenuLabel className="p-2">
            <p className="text-base-white text-base font-semibold">
              {userDetails?.name}
            </p>
            <p className="text-ui-400 text-sm">{userDetails?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-ui-600" />
          <DropdownMenuGroup>
            {ProfileMenuItems.map((item) => (
              <DropdownMenuItem
                onClick={() => router.push(item.href)}
                key={item.name}
                className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white flex flex-row gap-2 rounded-md p-2"
              >
                <item.icon className="text-base-white size-5" />
                <p className="text-sm">{item.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-ui-600" />
          <DropdownMenuItem
            className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white flex flex-row gap-2 rounded-md p-2"
            onClick={handleLogout}
          >
            <LogOut className="text-base-white size-5" />
            <p className="test-sm">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default ProfilePressDropdown;
