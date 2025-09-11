'use client';
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

/**
 * YoutubePlayer is a component that displays a YouTube video based on the
 * given videoId. By default, the video will not autoplay and will show
 * controls. The `autoplay`, `controls`, and `rel` props can be used to
 * customize this behavior.
 *
 * @param {string} videoId - the id of the YouTube video to display
 * @param {number} [autoplay=0] - whether to autoplay the video (1 for yes, 0 for no)
 * @param {number} [controls=1] - whether to show video controls (1 for yes, 0 for no)
 * @param {number} [rel=0] - whether to show related videos at the end (same channel if 0 as it can not be completely disabled)
 * @param {string} [iframeClassName] - additional classnames to apply to the iframe element
 * @param {string} [className] - additional classnames to apply to the outer div element
 * @returns {JSX.Element} custom component to handle the youtube player
 */
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
