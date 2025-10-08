'use client';
import { PenSquare, Star, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React from 'react';
import BackButton from '~/components/back-button';
import CustomImage from '~/components/custom-image';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { useFetchEpisodeDetailsById } from '~/services/tv-episode-service';

/**
 * This is the page for the episode details
 * contains all the episode details
 * Also has the edit and delete options
 * @returns {JSX.Element}
 */
const EpisodeDetails = () => {
  // get episode id from params
  const episodeId = useParams().episodeId as string;
  // fetch episode details
  const { data, isLoading } = useFetchEpisodeDetailsById(episodeId);

  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 gap-2 overflow-hidden bg-gradient-to-r">
        <CardContent className="flex flex-col gap-2">
          <p className="text-xl font-bold">
            #{data?.data?.episodeNumber}: {data?.data?.title}
          </p>
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
              >
                <Trash2 />
                Delete Episode
              </Button>
            </div>
          </div>
          <p className="text-xl font-semibold sm:hidden">Overview</p>
          <p className="text-ui-400 text-lg">{data?.data?.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EpisodeDetails;
