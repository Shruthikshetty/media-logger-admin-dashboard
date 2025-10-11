'use client';
import { useQueryClient } from '@tanstack/react-query';
import { PenSquare, Star, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import BackButton from '~/components/back-button';
import CustomImage from '~/components/custom-image';
import {
  ListLoader,
  LoadingProvider,
  LoadingWrapper,
} from '~/components/custom-loaders';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { QueryKeys } from '~/constants/query-key.constants';
import {
  useDeleteEpisodeById,
  useFetchEpisodeDetailsById,
} from '~/services/tv-episode-service';
import { useSpinnerStore } from '~/state-management/spinner-store';

/**
 * This is the page for the episode details
 * contains all the episode details
 * Also has the edit and delete options
 * @returns {JSX.Element}
 */
const EpisodeDetails = () => {
  // get episode id from params
  const episodeId = useParams().episodeId as string;
  //initialize router
  const router = useRouter();
  //initialize query client
  const queryClient = useQueryClient();
  // import spinner state from store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // fetch episode details
  const { data, isLoading, isError, error } =
    useFetchEpisodeDetailsById(episodeId);
  //initialize custom delete hook
  const { mutate: deleteEpisodeMutate } = useDeleteEpisodeById();
  //catch any unexpected error while fetching
  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data.message ??
          error.message ??
          'Something went wrong',
        {
          classNames: {
            toast: '!bg-feedback-error',
          },
        },
      );
    }
  }, [isError, error]);

  /**
   * Handles the deletion of an episode.
   */
  const handleDelete = () => {
    if (!data?.data._id) return;
    //start loading
    setSpinner(true);
    // make api call
    deleteEpisodeMutate(data?.data._id, {
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
        // navigate back
        router.back();
      },
      onError: (error) => {
        toast.error(error.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
      onSettled: () => {
        // stop loading
        setSpinner(false);
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      <LoadingProvider
        isLoading={isLoading}
        defaultFallback={<Skeleton className="h-6 w-[60%] md:w-[40%]" />}
      >
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 gap-2 overflow-hidden bg-gradient-to-r">
          <CardContent className="flex flex-col gap-2">
            <LoadingWrapper>
              <p className="text-xl font-bold">
                #{data?.data?.episodeNumber}: {data?.data?.title}
              </p>
            </LoadingWrapper>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="flex flex-col gap-2">
                <CustomImage
                  alt="tv show poster"
                  src={data?.data?.stillUrl}
                  width={255}
                  height={170}
                  className="aspect-[3/2] rounded-lg"
                  placeHolderClassname="aspect-[3/2] px-4 [&_[data-slot='icon']]:text-ui-400"
                />
                <LoadingWrapper
                  fallback={
                    <ListLoader
                      className="flex-col gap-3"
                      itemClassName="w-50"
                      noOfItems={3}
                    />
                  }
                >
                  <p>
                    <span className="text-ui-400">Air Date:</span>{' '}
                    {data?.data?.releaseDate
                      ? moment(data?.data?.releaseDate).format('LL')
                      : '???'}
                  </p>
                  <p>
                    <span className="text-ui-400">Duration:</span>{' '}
                    {data?.data?.runTime ? data?.data?.runTime : '???'} min
                  </p>
                  <p className="flex flex-row gap-1">
                    <span className="text-ui-400">Rating:</span>{' '}
                    {data?.data?.averageRating ? (
                      <span className="flex items-center gap-1">
                        {data?.data?.averageRating}{' '}
                        <Star className="text-feedback-warning h-4 w-4" />
                      </span>
                    ) : (
                      '???'
                    )}
                  </p>
                </LoadingWrapper>
              </div>
              {/* Buttons */}
              <div className="flex flex-row gap-2 sm:flex-col sm:gap-3">
                <Button
                  variant={'blue'}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                  type="button"
                  aria-label="Edit Tv show"
                >
                  <PenSquare />
                  Edit Episode
                </Button>

                <Button
                  variant={'red'}
                  className="text-base-white flex-1 sm:flex-none"
                  type="button"
                  aria-label="Delete Tv show"
                  disabled={isLoading}
                  onClick={handleDelete}
                >
                  <Trash2 />
                  Delete Episode
                </Button>
              </div>
            </div>
            <p className="text-xl font-semibold sm:hidden">Overview</p>
            <LoadingWrapper>
              <p className="text-ui-400 text-lg">{data?.data?.description}</p>
            </LoadingWrapper>
          </CardContent>
        </Card>
      </LoadingProvider>
    </div>
  );
};

export default EpisodeDetails;
