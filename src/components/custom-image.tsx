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
  src = '',
  ...restProps
}: Omit<React.ComponentProps<typeof Image>, 'onError'> & {
  Icon?: LucideIcon;
}) => {
  // hold the error state
  const [error, setError] = useState(false);
  // hold the loading state for images
  const [loading, setLoading] = useState(true);
  // get placeholder color
  const placeholderColor = useMemo(() => getRandomColor(), []);
  // in case of broken link or nullish src

  //get the numeric height and width
  const numericWidth = typeof width === 'number' ? width : undefined;
  const numericHeight = typeof height === 'number' ? height : undefined;
  if (!src || error)
    return (
      <div
        className="bg-ui-600 flex h-full w-full flex-col items-center justify-center rounded-lg p-2"
        style={{
          maxHeight: numericHeight ? `${numericHeight}px` : undefined,
          maxWidth: numericWidth ? `${numericWidth}px` : undefined,
          minHeight: numericHeight ? `${numericHeight / 2}px` : undefined,
        }}
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
          maxHeight: numericHeight ? `${numericHeight}px` : undefined,
          maxWidth: numericWidth ? `${numericWidth}px` : undefined,
          minHeight: numericHeight ? `${numericHeight / 2}px` : undefined,
        }}
      >
        <Image
          className="rounded-lg"
          onError={() => setError(true)}
          alt={alt}
          width={width}
          height={height}
          src={src}
          hidden={loading}
          style={{
            minHeight: numericHeight ? `${numericHeight / 2}px` : undefined,
          }}
          onLoad={() => setLoading(false)}
          {...restProps}
        />
      </div>
    </>
  );
};

export default CustomImage;
