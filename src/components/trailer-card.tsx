"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Play, X } from 'lucide-react';
import { Button } from './ui/button';
import YoutubePlayer from './youtube-player';

/**
 * TrailerCard component for displaying trailers
 * @param {Object} props - component props
 * @param {string} [props.youtubeVideoId] - youtube video id
 * @param {boolean} [props.loading] - loading state
 * @returns {ReactElement} - TrailerCard component
 * @example
 * <TrailerCard youtubeVideoId="VIDEO_ID" />
 */
const TrailerCard = ({
  youtubeVideoId,
  loading = false,
}: {
  youtubeVideoId?: string;
  loading?: boolean;
}) => {
  // hold the trailer visibility state
  const [trailerVisible, setTrailerVisible] = useState(false);
  return (
    <Card className="from-brand-600/30 to-base-black border-brand-500/50 bg-gradient-to-r transition">
      <CardHeader>
        <div className="text-base-white flex flex-row justify-between gap-5">
          <p className="flex flex-row flex-wrap items-center gap-1 sm:gap-3">
            <Play className="text-brand-600 h-7 w-7" />
            <span>
              {!youtubeVideoId
                ? 'Sorry Trailer Not Available'
                : 'Watch Official Trailer'}
            </span>
          </p>
          <Button
            className="border-ui-600"
            variant={'outline'}
            disabled={loading || !youtubeVideoId}
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
      {trailerVisible && youtubeVideoId && (
        <CardContent>
          <YoutubePlayer videoId={youtubeVideoId} />
        </CardContent>
      )}
    </Card>
  );
};

export default TrailerCard;
