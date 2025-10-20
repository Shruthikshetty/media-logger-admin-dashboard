'use client';
import { TvShowBase, useDeleteTvShowById } from '~/services/tv-show-service';
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
import { useRouter } from 'next/navigation';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { toast } from 'sonner';

/**
 * This component is used to display the actions for a Tv show
 * Mainly used in Tv show table performs actions like view details , edit , delete
 * @param data [TvShowBase data]
 */
const TvShowActionDropdown = ({ data }: { data: TvShowBase }) => {
  // initialize router
  const router = useRouter();
  //initialize the custom hook to delete a tv show by id
  const { mutateAsync: deleteTvShowMutation } = useDeleteTvShowById();
  //get the spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // tv show dropdown action items
  const tvShowActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        // navigate to tv show details
        router.push(`/tv-shows/${data._id}`);
      },
    },
    {
      title: 'Edit Tv Show',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {
        // @TODO
      },
    },
    {
      title: 'Delete TV Show',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        //set loading
        setSpinner(true);
        // make api call
        deleteTvShowMutation(data._id, {
          onSuccess: (data) => {
            //send toast
            toast.success(data?.message ?? 'Tv Show deleted successfully', {
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
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open TV show actions"
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
            {tvShowActionItems.map((item) => (
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

export default TvShowActionDropdown;
