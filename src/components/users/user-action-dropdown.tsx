import { Ellipsis } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

//@TODO in progress
/**
 * This component is used to display the actions for a user
 * Mainly used in user table performs actions like view details , delete , edit role
 * @param movieId
 */
const UserActionsDropdown = ({}: { userId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open user actions"
        type="button"
        className="hover:bg-ui-600 rounded-md p-1"
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 rounded-lg border p-1 pb-1 shadow-[0px_0px_15px]"
        align="center"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <p>Add</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <p>edit</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsDropdown;
