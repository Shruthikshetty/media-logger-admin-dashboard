'use client';
import {
  Calendar,
  Clock,
  LucideIcon,
  PenSquare,
  Play,
  Star,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import BackButton from '~/components/back-button';
import BackdropCard, { InfoItem } from '~/components/backdrop-card';
import CollapsableBadgeList from '~/components/collapsable-badge-list';
import {
  ListLoader,
  LoadingProvider,
  LoadingWrapper,
} from '~/components/custom-loaders';
import TitleSubtitle from '~/components/title-subtitle';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import YoutubePlayer from '~/components/youtube-player';
import { AppColors } from '~/constants/colors.constants';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { cn } from '~/lib/utils';
import { useGetGameDetailsById } from '~/services/game-service';

/**
 * This is the main page containing the details of a single game
 */
const GameDetails = () => {
  //get the game id from params
  const movieId = (useParams()?.id as string) ?? '';
  // hold the trailer visibility state
  const [trailerVisible, setTrailerVisible] = useState(false);
  //fetch the game details
  const { data, isLoading } = useGetGameDetailsById(movieId);
  // returns the styled title with icon
  const renderMovieInfoTitle = useCallback(
    (title: string, Icon?: LucideIcon) => (
      <p className="flex flex-row items-center gap-2 text-lg">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{title}</span>
      </p>
    ),
    [],
  );
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      {/* All game details */}
      <LoadingProvider isLoading={isLoading}>
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r pt-0">
          <BackdropCard
            title={data?.data?.title ?? ''}
            backdropSrc={data?.data?.backdropUrl}
            posterSrc={data?.data?.posterUrl}
            infoData={
              [
                {
                  label: 'Rating',
                  value: data?.data?.averageRating?.toString() ?? '???',
                  Icon: Star,
                  iconColor: AppColors.feedback.warning,
                },
                {
                  label: 'Release Date',
                  value: moment(data?.data?.releaseDate).format('YYYY/MM/DD'),
                  Icon: Calendar,
                },
                {
                  label: 'Runtime',
                  value: data?.data?.avgPlaytime
                    ? `${data?.data?.avgPlaytime} min`
                    : '???',
                  Icon: Clock,
                },
                {
                  label: 'age Rating',
                  value:
                    data?.data?.ageRating !== undefined
                      ? `${data?.data?.ageRating}+`
                      : 'Un',

                  type: 'badge',
                },
              ] as InfoItem[]
            }
          />
          {/*  Inner cards  */}
          <CardContent className="grid w-full grid-cols-1 gap-3 px-5 md:grid-cols-10">
            {/* game information  */}
            <Card className="border-0 bg-transparent md:col-span-6">
              <CardHeader className="p-0">
                {/* youtube trailer */}
                <Card className="from-brand-600/30 to-base-black border-brand-500/50 bg-gradient-to-r transition">
                  <CardHeader>
                    <div className="text-base-white flex flex-row justify-between gap-5">
                      <p className="flex flex-row flex-wrap items-center gap-1 sm:gap-3">
                        <Play className="text-brand-600 h-7 w-7" />
                        <span>
                          {!data?.data?.youtubeVideoId
                            ? 'Sorry Trailer Not Available'
                            : 'Watch Official Trailer'}
                        </span>
                      </p>
                      <Button
                        className="border-ui-600"
                        variant={'outline'}
                        disabled={isLoading || !data?.data?.youtubeVideoId}
                        onClick={() => setTrailerVisible((s) => !s)}
                      >
                        {trailerVisible ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        {trailerVisible ? 'Hide Trailer' : 'Show Trailer'}
                      </Button>
                    </div>
                  </CardHeader>
                  {trailerVisible && data?.data?.youtubeVideoId && (
                    <CardContent>
                      <YoutubePlayer videoId={data?.data?.youtubeVideoId} />
                    </CardContent>
                  )}
                </Card>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 p-0">
                <div className="flex flex-col-reverse justify-between gap-2 sm:flex-row">
                  <LoadingWrapper
                    fallback={
                      <ListLoader noOfItems={2} vertical itemClassName="w-39" />
                    }
                  >
                    <TitleSubtitle
                      title="Overview"
                      subtitle={
                        data?.data?.description ?? 'No description available.'
                      }
                      customStyles={{
                        title: 'text-2xl font-bold mb-1',
                        subtitle: 'text-md',
                      }}
                    />
                  </LoadingWrapper>
                  {/* Edit  and Delete button */}
                  <div className="flex flex-row gap-2 sm:flex-col sm:gap-3">
                    <Button
                      variant={'blue'}
                      disabled={isLoading}
                      className="flex-1 sm:flex-none"
                      type="button"
                      aria-label="Edit Game"
                    >
                      <PenSquare />
                      Edit Game
                    </Button>
                    <Button
                      variant={'red'}
                      className="text-base-white flex-1 sm:flex-none"
                      type="button"
                      aria-label="Delete Game"
                      disabled={isLoading}
                    >
                      <Trash2 />
                      Delete Game
                    </Button>
                  </div>
                </div>
                {/* genre badges */}
                <div className="flex flex-col gap-2">
                  {data?.data?.genre && data?.data?.genre.length > 0 && (
                    <p className="text-base-white font-semi text-lg">Genres</p>
                  )}
                  <LoadingWrapper
                    fallback={<ListLoader noOfItems={4} itemClassName="w-15" />}
                  >
                    <CollapsableBadgeList
                      list={data?.data?.genre ?? []}
                      maxDisplayed={10}
                      style={{
                        buttonBadge: 'bg-ui-700 border-0 hover:bg-ui-600',
                        itemBadge: 'bg-ui-700 border-0 hover:bg-ui-600',
                      }}
                    />
                  </LoadingWrapper>
                </div>
                {/* platform badges*/}
                <div className="flex flex-col gap-2">
                  {data?.data?.platforms &&
                    data?.data?.platforms.length > 0 && (
                      <p className="text-base-white font-semi text-lg">Tags</p>
                    )}
                  <LoadingWrapper
                    fallback={<ListLoader noOfItems={3} itemClassName="w-15" />}
                  >
                    <CollapsableBadgeList
                      list={data?.data?.platforms ?? []}
                      maxDisplayed={10}
                      style={{
                        buttonBadge:
                          'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                        itemBadge:
                          'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                      }}
                    />
                  </LoadingWrapper>
                </div>
              </CardContent>
            </Card>
            {/* Additional information  */}
            <Card className="border-ui-600 gap-2 bg-transparent md:col-span-4">
              <CardHeader className="text-base-white text-2xl font-bold">
                Game Info
              </CardHeader>
              <CardContent className="text-base-white">
                <div className="flex flex-col gap-4">
                  {/* Developer */}
                  <div>
                    {renderMovieInfoTitle('Developer', Users)}
                    <LoadingWrapper
                      fallback={<Skeleton className="h-5 w-15 rounded-full" />}
                    >
                      <p className="text-md text-ui-400">
                        {data?.data?.developer ?? '???'}
                      </p>
                    </LoadingWrapper>
                  </div>
                  {/* Release date */}
                  <div>
                    {renderMovieInfoTitle('Release Date', Calendar)}
                    <LoadingWrapper
                      fallback={<Skeleton className="h-5 w-20 rounded-2xl" />}
                    >
                      <p className="text-md text-ui-400">
                        {moment(data?.data.releaseDate).format('MMM DD, YYYY')}
                      </p>
                    </LoadingWrapper>
                  </div>
                  <div>
                    {renderMovieInfoTitle('Release Date', Clock)}
                    <LoadingWrapper
                      fallback={<Skeleton className="h-5 w-20 rounded-2xl" />}
                    >
                      <p className="text-md text-ui-400">
                        {data?.data?.avgPlaytime
                          ? `${data?.data.avgPlaytime} hours`
                          : '???'}
                      </p>
                    </LoadingWrapper>
                  </div>
                  {/*Status */}
                  <div className="flex flex-col gap-2">
                    {renderMovieInfoTitle('Status')}
                    <LoadingWrapper
                      fallback={<Skeleton className="h-5 w-15 rounded-full" />}
                    >
                      <Badge
                        className={cn(
                          'text-base-white rounded-full px-2',
                          data?.data?.status === 'released'
                            ? 'bg-brand-600'
                            : 'bg-ui-600',
                        )}
                      >
                        {capitalizeFirstLetter(data?.data?.status ?? '')}
                      </Badge>
                    </LoadingWrapper>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </LoadingProvider>
    </div>
  );
};

export default GameDetails;
