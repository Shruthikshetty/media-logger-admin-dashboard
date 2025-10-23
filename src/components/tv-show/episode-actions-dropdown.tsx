'use client';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { useRouter } from '@bprogress/next/app';
import React from 'react';
import {
  EpisodeBase,
  useDeleteEpisodeById,
} from '~/services/tv-episode-service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '~/lib/utils';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QueryKeys } from '~/constants/query-key.constants';
import EditEpisodeDialog from './edit-episode-dialog';

/**
 * This component is used to display the actions for a episode
 * mainly used in episode table performs actions like view details , edit , delete
 * @param param0 data - episode data
 * @returns
 */
const EpisodeActionsDropdown = ({ data }: { data: EpisodeBase }) => {
  // initialize router
  const router = useRouter();
  // initialize query client
  const queryClient = useQueryClient();
  // edit tv episode button ref
  const editButtonRef = React.useRef<HTMLButtonElement>(null!);
  //initialize custom delete hook
  const { mutate: deleteEpisodeMutate } = useDeleteEpisodeById();
  // import spinner state from store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // tv episode dropdown action items
  const tvEpisodeActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        // navigate to episode details
        router.push(`/tv-shows/episode/${data._id}`);
      },
    },
    {
      title: 'Edit episode',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {
        //open edit dialog
        editButtonRef.current?.click();
      },
    },
    {
      title: 'Delete Episode',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        //start loading
        setSpinner(true);
        // make api call
        deleteEpisodeMutate(data._id, {
          onSuccess: (data) => {
            // send message
            toast.success(data.message ?? 'Episode deleted successfully', {
              className: '!bg-feedback-success',
            });
            //invalidate query
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.fetchSeasonById, data.data.season],
            });
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.fetchTvShowById],
            });
          },
          onError: (error) => {
            toast.error(
              error.response?.data.message ?? 'Something went wrong',
              {
                classNames: {
                  toast: '!bg-feedback-error',
                },
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
                  onSelect={item.onClick}
                >
                  <item.icon className={cn('h-5 w-5', item.color)} />
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <EditEpisodeDialog
        existingData={data}
        onSuccess={() => {
          // invalidate query
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.fetchSeasonById, data.season],
          });
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.fetchTvShowById],
          });
        }}
      >
        <button type="button" hidden ref={editButtonRef} />
      </EditEpisodeDialog>
    </>
  );
};

export default EpisodeActionsDropdown;
