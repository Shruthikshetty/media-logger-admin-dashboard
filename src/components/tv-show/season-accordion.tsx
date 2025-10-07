import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import EpisodeTable from './episode-table';
import { SeasonFull } from '~/services/tv-season-service';

const SeasonAccordion = ({ seasons }: { seasons?: SeasonFull[] }) => {
  // if no seasons, return null
  if (!seasons) return null;

  return (
    <Accordion type="multiple">
      {seasons.map((season) => (
        <AccordionItem key={season._id} value={`item-${season._id}`}>
          <AccordionTrigger>Season {season.seasonNumber}</AccordionTrigger>
          <AccordionContent>
            <EpisodeTable />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SeasonAccordion;
