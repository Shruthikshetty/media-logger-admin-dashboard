import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { cn } from '~/lib/utils';

interface YoutubePlayerProps extends Omit<YouTubeProps, 'videoId' | 'opts'> {
  videoId: string;
  autoplay?: 1 | 0;
  controls?: 1 | 0;
  rel?: 1 | 0;
  modestbranding?: 1 | 0;
}

const YoutubePlayer = ({
  videoId,
  autoplay = 0,
  controls = 1,
  rel = 0,
  iframeClassName,
  className,
  ...reset
}: YoutubePlayerProps) => {
  // case of no video id return
  if (!videoId) {
    return null;
  }
  //create player options
  const playerOptions = {
    playerVars: {
      autoplay, // autoplay setting
      controls, // player controls
      rel, // related videos at the end (same channel if 0)
    },
  };

  return (
    <div className={cn('relative aspect-video w-full', className)}>
      <YouTube
        videoId={videoId}
        opts={playerOptions}
        iframeClassName={cn(
          'absolute top-0 left-0 h-full w-full rounded-md',
          iframeClassName,
        )}
        {...reset}
      />
    </div>
  );
};

export default YoutubePlayer;
