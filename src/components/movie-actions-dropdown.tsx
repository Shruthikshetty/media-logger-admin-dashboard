import React from 'react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
} from './ui/dropdown-menu';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { cn } from '~/lib/utils';
/**
 * This component is used to display the actions for a movie
 * Mainly used in movie table performs actions like view details , edit , delete
 * @param movieId
 */
const MovieActionDropdown = ({ movieId }: { movieId: string }) => {
  // movie actions dropdown items
  const movieActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {}, // propagate event to parent
    },
    {
      title: 'Edit Movie',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        //@TODO open edit modal
      },
    },
    {
      title: 'Delete Movie',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        // @TODO open delete movie
      },
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open movie actions"
        type="button"
        className="hover:bg-ui-600 rounded-md p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 rounded-lg border p-1 pb-1 shadow-[0px_0px_15px]"
          align="center"
        >
          <DropdownMenuGroup>
            {movieActionItems.map((item) => (
              <DropdownMenuItem
                disabled={!movieId}
                key={item.title}
                className={cn(
                  'hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md flex flex-row gap-2 rounded-md p-2',
                  item.color,
                )}
                onClick={item.onClick}
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
