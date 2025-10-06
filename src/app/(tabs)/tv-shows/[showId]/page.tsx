'use client';
import { Calendar, Clock, Star } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React from 'react';
import BackdropCard, { InfoItem } from '~/components/backdrop-card';
import { LoadingProvider } from '~/components/custom-loaders';
import { Card } from '~/components/ui/card';
import { AppColors } from '~/constants/colors.constants';
import { useFetchTvShowById } from '~/services/tv-show-service';

/**
 * This screen displays the details of a TV show.
 * With seasons and episodes
 * @returns {JSX.Element}
 */
const TvShowDetails = () => {
  // get the tv show id from route params
  const showId = useParams().showId as string;
  const { data } = useFetchTvShowById<true>(showId, true);
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      {/* All tv show  details */}
      <LoadingProvider isLoading={false}>
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r pt-0">
          <BackdropCard
            title={data?.data?.title ?? ''}
            backdropSrc={data?.data?.backdropUrl}
            posterSrc={data?.data?.posterUrl}
            infoData={
              [
                {
                  label: 'Release Date',
                  value: moment(data?.data?.releaseDate).format('YYYY/MM/DD'),
                  Icon: Calendar,
                },
                {
                  label: 'Rating',
                  value: data?.data?.averageRating?.toString() ?? '???',
                  Icon: Star,
                  iconColor: AppColors.feedback.warning,
                },
                {
                  label: 'Avg Runtime',
                  value: data?.data?.avgRunTime
                    ? `${data?.data?.avgRunTime} min`
                    : '???',
                  Icon: Clock,
                },
                {
                  label: 'age Rating',
                  value:
                    data?.data?.ageRating !== undefined
                      ? `${data?.data?.ageRating}+`
                      : '???',

                  type: 'badge',
                },
              ] as InfoItem[]
            }
          />
        </Card>
      </LoadingProvider>
    </div>
  );
};

export default TvShowDetails;
