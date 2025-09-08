'use client';
import React, { useCallback, useState } from 'react';
import BackButton from '~/components/back-button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import {
  Calendar,
  Clock,
  Globe,
  LucideIcon,
  PenSquare,
  Play,
  Star,
  Users,
  X,
} from 'lucide-react';
import TitleSubtitle from '~/components/title-subtitle';
import CollapsableBadgeList from '~/components/collapsable-badge-list';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';
import { capitalizeFirstLetter } from '~/lib/formatting';
import CustomImage from '~/components/custom-image';
import YoutubePlayer from '~/components/youtube-player';
import { useGetMovieDetails } from '~/services/movies-service';
import { useParams } from 'next/navigation';

const MovieDetails = () => {
  // hold the trailer visibility state
  const [trailerVisible, setTrailerVisible] = useState(false);
  //get the movie id from params
  const movieId = (useParams()?.id as string) ?? '';
  //fetch the movie details
  const { data, isLoading } = useGetMovieDetails(movieId);

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
      {/* All movie details */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r pt-0">
        {/* Back drop area */}
        <div className="relative h-96 w-full overflow-clip rounded-t-2xl">
          <Image
            alt={`Backdrop for ${data?.data.title ?? 'movie'}`}
            fill
            src={
              data?.data.backdropUrl ||
              'https://i.imgur.com/sNxxSMr_d.webp?maxwidth=520&shape=thumb&fidelity=high'
            }
            quality={75}
            sizes="100vw"
            className="absolute inset-0 object-cover object-center"
          />
          {/* poster */}
          <div className="absolute z-10 flex h-full w-full flex-col items-baseline justify-end p-5 md:pl-30">
            <div className="flex w-full flex-row items-end gap-2">
              <CustomImage
                alt={'poster image'}
                src={data?.data.posterUrl}
                width={180}
                height={300}
                maxHeight={300}
                maxWidth={200}
                className="border-ui-600 rounded-xl border-1 shadow-2xl"
              />
              <div className="bg-base-black/80 rounded-xl p-3 pb-10">
                <p className="mb-2 text-3xl font-bold">{data?.data.title}</p>
                <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                  <p className="text-md flex flex-row items-center gap-1 font-semibold">
                    <Star className="text-feedback-warning h-4 w-4" />
                    {data?.data?.averageRating}
                  </p>
                  <p className="text-md flex flex-row items-center gap-1 font-semibold">
                    <Calendar className="h-4 w-4" />
                    {data?.data?.releaseDate}
                  </p>
                  <p className="text-md flex flex-row items-center gap-1 font-semibold">
                    <Clock className="h-4 w-4" />
                    {data?.data?.runTime} min
                  </p>
                  <Badge className="bg-ui-700 hover:bg-ui-600 rounded-full border-0 px-2">
                    {data?.data.ageRating}+
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Inner cards  */}
        <CardContent className="grid w-full grid-cols-1 gap-3 px-5 md:grid-cols-10">
          {/* movie information  */}
          <Card className="border-0 bg-transparent md:col-span-6">
            <CardHeader className="p-0">
              {/* youtube trailer */}
              <Card className="from-brand-600/30 to-base-black border-brand-500/50 bg-gradient-to-r transition">
                <CardHeader>
                  <div className="text-base-white flex flex-row justify-between gap-5">
                    <p className="flex flex-row items-center gap-3">
                      <Play className="text-brand-600 h-7 w-7" />
                      <span>Watch Official Trailer</span>
                    </p>
                    <Button
                      className="border-ui-600"
                      variant={'outline'}
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
                {trailerVisible && (
                  <CardContent>
                    <YoutubePlayer videoId={'e-ORhEE9VVg'} />
                  </CardContent>
                )}
              </Card>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-0">
              <div className="flex flex-row justify-between gap-2">
                <TitleSubtitle
                  title="Overview"
                  subtitle={data?.data?.description}
                  customStyles={{
                    title: 'text-2xl font-bold mb-1',
                    subtitle: 'text-md',
                  }}
                />
                {/* Edit button */}
                <Button variant={'blue'}>
                  <PenSquare />
                  Edit Movie
                </Button>
              </div>
              {/* genre badges */}
              <div className="flex flex-col gap-2">
                <p className="text-base-white font-semi text-lg">Genres</p>
                <CollapsableBadgeList
                  list={data?.data?.genre ?? []}
                  maxDisplayed={10}
                  style={{
                    buttonBadge: 'bg-ui-700 border-0 hover:bg-ui-600',
                    itemBadge: 'bg-ui-700 border-0 hover:bg-ui-600',
                  }}
                />
              </div>
              {/* tag badges*/}
              <div className="flex flex-col gap-2">
                <p className="text-base-white font-semi text-lg">Tags</p>
                <CollapsableBadgeList
                  list={data?.data?.tags ?? []}
                  maxDisplayed={10}
                  style={{
                    buttonBadge:
                      'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                    itemBadge:
                      'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                  }}
                />
              </div>
            </CardContent>
          </Card>
          {/* Additional information  */}
          <Card className="border-ui-600 gap-2 bg-transparent md:col-span-4">
            <CardHeader className="text-base-white text-2xl font-bold">
              Movie Info
            </CardHeader>
            <CardContent className="text-base-white">
              <div className="flex flex-col gap-4">
                {/* Directors */}
                <div>
                  {renderMovieInfoTitle('Director', Users)}
                  <p className="text-md text-ui-400">John Doe</p>
                </div>
                {/* Casts */}
                <div>
                  {renderMovieInfoTitle('Cast', Users)}
                  <p className="text-md text-ui-400">John Doe</p>
                </div>
                {/* Languages */}
                <div className="flex flex-col gap-2">
                  {renderMovieInfoTitle('Languages', Globe)}
                  <CollapsableBadgeList
                    list={data?.data.languages ?? []}
                    maxDisplayed={5}
                    style={{
                      buttonBadge:
                        'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                      itemBadge:
                        'bg-ui-transparent border-ui-600 hover:border-ui-400 border-1',
                    }}
                  />
                </div>
                {/*Status */}
                <div className="flex flex-col gap-2">
                  {renderMovieInfoTitle('Status')}
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
                </div>
                {/* Release date */}
                <div>
                  {renderMovieInfoTitle('Release Date')}
                  <p className="text-md text-ui-400">
                    {data?.data.releaseDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetails;
