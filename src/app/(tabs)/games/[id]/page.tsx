"use client";
import { useParams } from 'next/navigation';
import React from 'react';
import BackButton from '~/components/back-button';
import { Card } from '~/components/ui/card';

/**
 * This is the main page containing the details of a single game
 */
const GameDetails = () => {
  //get the game id from params
  const movieId = (useParams()?.id as string) ?? '';
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      {/* All game details */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r pt-0">
        <p>movieId: {movieId}</p>
      </Card>
    </div>
  );
};

export default GameDetails;
