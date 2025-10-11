'use client';
import { capitalize } from 'lodash';
import { Calendar, PenSquare, Plus, Star, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import BackButton from '~/components/back-button';
import CustomImage from '~/components/custom-image';
import {
  ListLoader,
  LoadingProvider,
  LoadingWrapper,
  TableSkeleton,
} from '~/components/custom-loaders';
import TrailerCard from '~/components/trailer-card';
import AddEpisodeDialog from '~/components/tv-show/add-episode-dialog';
import EpisodeTable from '~/components/tv-show/episode-table';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { AppColors } from '~/constants/colors.constants';
import { SEASON_STATUS } from '~/constants/config.constants';
import { cn } from '~/lib/utils';
import { useFetchSeasonById } from '~/services/tv-season-service';

/**
 * This component displays All the details of a TV show season.
 * @returns {JSX.Element}
 */
const SeasonDetails = () => {
  // get season id from params
  const seasonId = useParams().seasonId as string;
  //fetch season details
  const { data, isLoading, isError, error } = useFetchSeasonById<true>(
    seasonId,
    true,
  );
  //catch any unexpected error while fetching season
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
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      <LoadingProvider
        isLoading={isLoading}
        defaultFallback={<Skeleton className="h-5 w-[60%]" />}
      >
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 gap-2 overflow-hidden bg-gradient-to-r">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex grow flex-row gap-2">
                <CustomImage
                  alt={'poster image'}
                  src={data?.data?.posterUrl}
                  width={180}
                  height={300}
                  maxHeight={300}
                  maxWidth={200}
                  minHeight={120}
                  minWidth={100}
                  className="border-ui-600 aspect-2/3 rounded-xl border-1 shadow-2xl"
                />
                {/* season details */}
                <LoadingWrapper
                  fallback={
                    <ListLoader
                      noOfItems={4}
                      itemClassName=" w-40"
                      className="mt-4 flex flex-col gap-3"
                    />
                  }
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">{data?.data?.title}</p>
                    {/* release date */}

                    <p className="text-ui-400 flex flex-row items-center gap-1 text-base">
                      <Calendar className="h-4 min-h-4 w-4 min-w-4" />

                      <span>
                        {data?.data?.releaseDate
                          ? moment(data?.data?.releaseDate).format('LL')
                          : '???'}
                      </span>
                    </p>
                    {/* average rating */}
                    <p className="text-ui-400 flex flex-row items-center gap-1 text-lg">
                      <Star
                        className="text-feedback-warning h-4 min-h-4 w-4 min-w-4"
                        fill={AppColors.feedback.warning}
                      />
                      <span>{data?.data?.averageRating ?? '???'}</span>
                    </p>
                    {data?.data.episodes?.length && (
                      <p className="text-ui-400 text-base">
                        {data?.data.episodes?.length} Episodes
                      </p>
                    )}
                    {/* Status */}
                    <Badge
                      className={cn(
                        'text-base-white mt-1 rounded-full p-0.5 px-3 text-sm',
                        data?.data?.status === SEASON_STATUS[0]
                          ? 'bg-ui-600'
                          : 'bg-brand-600',
                      )}
                    >
                      {capitalize(data?.data?.status)}
                    </Badge>
                  </div>
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
                  Edit Season
                </Button>

                <Button
                  variant={'red'}
                  className="text-base-white flex-1 sm:flex-none"
                  type="button"
                  aria-label="Delete Tv show"
                  disabled={isLoading}
                >
                  <Trash2 />
                  Delete Season
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-xl font-semibold">Overview</p>
            <LoadingWrapper>
              <p className="text-ui-400 text-base">
                {data?.data?.description
                  ? data?.data?.description
                  : 'No Overview available'}
              </p>
            </LoadingWrapper>
            <TrailerCard
              loading={isLoading}
              youtubeVideoId={data?.data?.youtubeVideoId}
            />
          </CardContent>
        </Card>
        {/* Episodes */}
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 gap-2 bg-gradient-to-r p-3">
          <CardHeader className="p-0">
            <div className="flex flex-row justify-between gap-2">
              <LoadingWrapper>
                <CardTitle className="text-xl font-semibold">
                  {' '}
                  {data?.data?.noOfEpisodes} Episodes
                </CardTitle>
              </LoadingWrapper>
              <AddEpisodeDialog>
                <Button
                  variant={'blue'}
                  disabled={isLoading}
                  aria-label="add a episode"
                >
                  <Plus /> Add Episode
                </Button>
              </AddEpisodeDialog>
            </div>
          </CardHeader>
          <LoadingWrapper fallback={<TableSkeleton />}>
            <EpisodeTable episodes={data?.data?.episodes} />
          </LoadingWrapper>
        </Card>
      </LoadingProvider>
    </div>
  );
};

export default SeasonDetails;
