import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import EpisodeTable from './episode-table';
import { SeasonFull } from '~/services/tv-season-service';
import CustomImage from '../custom-image';
import { Calendar, MoveRight, Star } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

/**
 * SeasonAccordion component
 * @param {SeasonFull[]} seasons - an array of SeasonFull objects
 * @returns {JSX.Element} - a JSX element representing the SeasonAccordion component
 * @description
 * This component renders an accordion containing the details of the given seasons.
 * Each accordion item contains a poster image, title, number of episodes, average rating, release date, and a description.
 * The user can view full details of the season by clicking on the 'View Full details' button.
 */
const SeasonAccordion = ({ seasons }: { seasons?: SeasonFull[] }) => {
  // if no seasons, return null
  if (!seasons) return null;
  //ordered seasons by season number
  const seasonsOrdered = seasons.toSorted(
    (a, b) => a.seasonNumber - b.seasonNumber,
  );

  return (
    <Accordion type="multiple">
      {seasonsOrdered.map((season) => (
        <AccordionItem key={season._id} value={`item-${season._id}`}>
          <AccordionTrigger className="items-center hover:no-underline">
            <div className="flex grow flex-row items-center gap-3">
              <CustomImage
                alt="tv show poster"
                src={season.posterUrl}
                width={100}
                height={150}
                className="aspect-[2/3] rounded-lg"
                maxHeight={150}
                maxWidth={100}
                minHeight={150}
                minWidth={100}
                placeHolderClassname="aspect-[2/3] px-4 [&_[data-slot='icon']]:text-ui-400"
              />
              <div className="flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{season.title}</h3>
                    <p className="text-ui-400 text-sm">
                      {season.noOfEpisodes} episodes
                    </p>
                  </div>
                  <div>
                    <p className="text-normal text-ui-400 flex flex-row items-center gap-1 text-lg">
                      <Star className="text-feedback-warning h-5 w-5" />
                      {season.averageRating}
                    </p>

                    <p className="text-ui-400 flex flex-row items-center gap-2 text-base">
                      <Calendar className="h-5 w-5" />
                      {!!season.releaseDate
                        ? moment(season.releaseDate).format('DD/MM/YYYY')
                        : '???'}
                    </p>
                  </div>
                </div>
                <p className="text-ui-400 line-clamp-3">{season.description}</p>
                <Link
                  className="hover:text-accent-indigo flex flex-row items-center gap-2"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                  }}
                  href={`/tv-shows/season/${season._id}`}
                >
                  <span>View Full details</span>
                  <MoveRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <EpisodeTable episodes={season.episodes} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SeasonAccordion;
