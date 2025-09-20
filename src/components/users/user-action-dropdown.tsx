import { Crown, Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '~/lib/utils';

/**
 * This component is used to display the actions for a user
 * Mainly used in user table performs actions like view details , delete , edit role
 * @param movieId
 */
const UserActionsDropdown = ({ userId }: { userId: string }) => {
  //user action items
  const userActionItems = [
    {
      title: 'View profile',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {}, //@TODO
    },
    {
      title: 'Edit User',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {}, //@TODO
    },
    {
      title: 'Change Role',
      icon: Crown,
      color: 'text-base-white',
      onClick: () => {}, //@TODO
    },
    {
      title: 'Delete User',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {}, //@TODO
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={!userId}
        aria-label="Open user actions"
        type="button"
        className="hover:bg-ui-600 rounded-md p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 rounded-lg border p-1 pb-1 shadow-[0px_0px_15px]"
        align="center"
      >
        <DropdownMenuGroup>
          {userActionItems.map((item) => (
            <DropdownMenuItem
              disabled={!userId}
              key={item.title}
              className={cn(
                `hover:bg-ui-800 focus:bg-ui-800 focus:${item.color} text-md flex flex-row gap-2 rounded-md p-2`,
                item.color,
              )}
              onClick={item.onClick}
            >
              <item.icon className={cn('h-5 w-5', item.color)} />
              <p>{item.title}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsDropdown;
