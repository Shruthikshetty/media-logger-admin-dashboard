import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { EpisodeBase } from '~/services/tv-episode-service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '~/lib/utils';

const EpisodeActionsDropdown = ({ data }: { data: EpisodeBase }) => {
  // initialize router
  const router = useRouter();
  // tv episode dropdown action items
  const tvEpisodeActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        //@TODO
      },
    },
    {
      title: 'Edit episode',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {
        // @TODO
      },
    },
    {
      title: 'Delete Episode',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        // @TODO
      },
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open Episode actions"
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
            {tvEpisodeActionItems.map((item) => (
              <DropdownMenuItem
                disabled={!data._id}
                key={item.title}
                className={cn(
                  `hover:bg-ui-800 focus:bg-ui-800 focus:${item.color} text-md flex flex-row gap-2 rounded-md p-2`,
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

export default EpisodeActionsDropdown;
