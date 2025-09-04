import React from 'react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
} from './ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { MOVIE_ACTIONS_DROPDOWN_ITEMS } from '~/constants/screen.constants';
import { cn } from '~/lib/utils';
//@TODO functionality in progress
/**
 * This component is used to display the actions for a movie
 * Mainly used in movie table performs actions like view details , edit , delete
 * @param movieId
 */
const MovieActionDropdown = ({ movieId }: { movieId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="hover:bg-ui-600 rounded-md p-1"
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 rounded-lg border p-1 pb-1 shadow-[0px_0px_15px]"
          align="center"
        >
          <DropdownMenuGroup>
            {MOVIE_ACTIONS_DROPDOWN_ITEMS.map((item) => (
              <DropdownMenuItem
                disabled={!movieId}
                key={item.title}
                className={cn(
                  'hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md flex flex-row gap-2 rounded-md p-2',
                  item.color,
                )}
              >
                <item.icon className={cn('h-5 w-5', item.color)} />
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default MovieActionDropdown;
