import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Game, useDeleteGameById } from '~/services/game-service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import EditGameDialog from './edit-game-dialog';

/**
 * This component is the actions dropdown for the games table
 * contains action like delete view , edit for games
 * mainly used in games table
 */
const GamesActionsDropdown = ({ game }: { game: Game }) => {
  // edit dialog button ref
  const editButtonRef = React.useRef<HTMLButtonElement>(null!);
  // initialize router
  const router = useRouter();
  //initialize delete custom hook
  const { mutate: deleteGameMutate } = useDeleteGameById();
  // get show spinner
  const setSpinner = useSpinnerStore((s) => s.setShowSpinner);
  // game action items
  const GameActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        //navigate to details screen
        router.push(`/games/${game._id}`);
      },
    },
    {
      title: 'Edit Game',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {
        //open edit dialog
        editButtonRef.current?.click();
      },
    },
    {
      title: 'Delete Game',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        // start loading
        setSpinner(true);
        //call api
        deleteGameMutate(game._id, {
          onSuccess: () => {
            //send toast
            toast.success('Game deleted successfully', {
              className: '!bg-feedback-success',
            });
          },
          onError: (error) => {
            toast.error(
              error?.response?.data.message ?? 'Something went wrong',
              {
                className: '!bg-feedback-error',
              },
            );
          },
          onSettled: () => {
            // stop loading
            setSpinner(false);
          },
        });
      },
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open game actions"
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
              {GameActionItems.map((item) => (
                <DropdownMenuItem
                  disabled={!game._id}
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
      {/* hidden edit game dialog trigger */}
      <EditGameDialog existingData={game}>
        <button type="button" hidden ref={editButtonRef} />
      </EditGameDialog>
    </>
  );
};

export default GamesActionsDropdown;
