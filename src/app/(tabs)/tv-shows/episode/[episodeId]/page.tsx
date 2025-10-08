'use client';
import { Star } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React from 'react';
import BackButton from '~/components/back-button';
import CustomImage from '~/components/custom-image';
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
  const { data } = useFetchEpisodeDetailsById(episodeId);
  console.log(episodeId);
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 gap-2 overflow-hidden bg-gradient-to-r">
        <CardContent className="flex flex-col gap-2">
          <p className="text-xl font-bold">
            #{data?.data?.episodeNumber}: {data?.data?.title}
          </p>
          <CustomImage
            alt="tv show poster"
            src={data?.data.stillUrl}
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
            {data?.data.averageRating ? (
              <span className="flex items-center gap-1">
                {data?.data.averageRating}{' '}
                <Star className="text-feedback-warning h-4 w-4" />
              </span>
            ) : (
              '???'
            )}
          </p>
          <p className="text-ui-400 text-lg">{data?.data?.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EpisodeDetails;
