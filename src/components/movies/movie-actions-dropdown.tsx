'use client';
import React, { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
} from '../ui/dropdown-menu';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Movie, useDeleteMovie } from '~/services/movies-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';
import EditMovieDialog from './edit-movie-dialog';
import { useRouter } from 'next/navigation';
/**
 * This component is used to display the actions for a movie
 * Mainly used in movie table performs actions like view details , edit , delete
 * @param movieId
 */
const MovieActionDropdown = ({
  movieId,
  data,
}: {
  movieId: string;
  data: Movie;
}) => {
  // get the query client
  const queryClient = useQueryClient();
  // initialize delete movie custom hook
  const { mutate: deleteMovieMutate } = useDeleteMovie();
  // get show spinner
  const toggleSpinner = useSpinnerStore((s) => s.toggleSpinner);
  // edit button ref
  const editButtonRef = useRef<HTMLButtonElement>(null!);
  //initialize router
  const router = useRouter();
  // movie actions dropdown items
  const movieActionItems = [
    {
      title: 'View Details',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        router.push(`/movies/${movieId}`);
      },
    },
    {
      title: 'Edit Movie',
      icon: SquarePen,
      color: 'text-base-white',
      onClick: () => {
        // open edit movie dialog
        editButtonRef.current?.click();
      },
    },
    {
      title: 'Delete Movie',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        // start loading
        toggleSpinner();
        // make delete movie request
        deleteMovieMutate(movieId, {
          onSuccess: () => {
            toast.success('Movie deleted successfully', {
              className: '!bg-feedback-success text-base-white',
            });
            //invalidate filter data
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.filterMovies],
            });
          },
          onError: (error) => {
            toast.error(
              error?.response?.data.message ?? 'Something went wrong',
              {
                className: '!bg-feedback-error text-base-white',
              },
            );
          },
          onSettled: () => {
            // stop loading
            toggleSpinner();
          },
        });
      },
    },
  ];
  return (
    <>
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
      {/* edit movie dialog  */}
      <EditMovieDialog existingData={data}>
        <button
          hidden
          type="button"
          ref={editButtonRef}
          aria-label="open edit movie dialog"
        />
      </EditMovieDialog>
    </>
  );
};

export default MovieActionDropdown;
