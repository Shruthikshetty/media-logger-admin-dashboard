'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { LucideIcon, Image as LucideImage } from 'lucide-react';
import { getRandomColor } from '~/lib/color';

//@TODO make the image max , min height and width configurable so as to make it reusable in other areas
/** this is a custom image component
 * its a wrapper on next/image
 * it handles any broken link and replaces it with a default image
 * it also handles lazy loading
 */
const CustomImage = ({
  Icon = LucideImage,
  alt = 'custom image',
  width,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  src = '',
  ...restProps
}: Omit<React.ComponentProps<typeof Image>, 'onError' | 'width' | 'height'> & {
  Icon?: LucideIcon;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  width: number;
  height: number;
}) => {
  // hold the error state
  const [error, setError] = useState(false);
  // hold the loading state for images
  const [loading, setLoading] = useState(true);
  // get placeholder color
  const placeholderColor = useMemo(() => getRandomColor(), []);

  // construct the min and max height and width
  const heightWidthStyle = {
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
    maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    minHeight: minHeight ? `${minHeight}px` : undefined,
    minWidth: minWidth ? `${minWidth}px` : undefined,
  };

  // in case of broken link or nullish src
  if (!src || error)
    return (
      <div
        className="bg-ui-600 flex h-full w-full flex-col items-center justify-center rounded-lg p-2"
        style={heightWidthStyle}
      >
        <Icon className="h-full w-full" />
      </div>
    );
  // render the image
  return (
    <>
      <div
        className="flex h-full w-full rounded-lg"
        style={{
          backgroundColor: loading ? placeholderColor : undefined,
          ...heightWidthStyle,
        }}
      >
        <Image
          className="rounded-lg"
          onError={() => setError(true)}
          alt={alt}
          width={width}
          height={height}
          src={src}
          style={{
            opacity: loading ? 0 : 1,
            ...heightWidthStyle,
          }}
          onLoad={() => setLoading(false)}
          {...restProps}
        />
      </div>
    </>
  );
};

export default CustomImage;
