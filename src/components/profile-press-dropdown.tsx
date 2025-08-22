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

//@TODO inProgress
type ProfilePressDropdownProps = {
  children: React.ReactNode;
};
const ProfilePressDropdown = ({ children }: ProfilePressDropdownProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 min-w-50 rounded-lg border p-0.5 pb-1 shadow-[0px_0px_15px] lg:min-w-80"
          align="start"
        >
          <DropdownMenuLabel className="p-2">
            <p className="text-base-white text-base font-semibold">
              Admin User
            </p>
            <p className="text-ui-400 text-sm">Admin@gmail.com</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-ui-600" />
          <DropdownMenuGroup>
            {ProfileMenuItems.map((item) => (
              <DropdownMenuItem
                onClick={() => router.push(item.href)}
                key={item.name}
                className="hover:bg-ui-800 flex flex-row gap-2 rounded-md p-2"
              >
                <item.icon className="text-base-white size-5" />
                <p className="text-sm">{item.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-ui-600" />
          <DropdownMenuItem className="hover:bg-ui-800 flex flex-row gap-2 rounded-md p-2">
            <LogOut className="text-base-white size-5" />
            <p className="test-sm">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default ProfilePressDropdown;
