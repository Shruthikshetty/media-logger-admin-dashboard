'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { LucideIcon, Image as LucideImage } from 'lucide-react';
import { cn } from '~/lib/utils';
import { getRandomColor } from '~/lib/color';

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
  // in case of broken link or nullish src
  // get placeholder color
  const placeholderColor = useMemo(() => getRandomColor(), []);
  if (!src || error)
    return (
      <div
        className="bg-ui-600 flex h-full w-full flex-col items-center justify-center rounded-lg p-2"
        style={{
          maxHeight: `${height}px`,
          maxWidth: `${width}px`,
          minHeight: `${(height as number) / 2}px`,
        }}
      >
        <Icon className="h-full w-full" />
      </div>
    );
  return (
    <>
      <div
        className="flex h-full w-full rounded-lg"
        style={{
          backgroundColor: loading ? placeholderColor : undefined,
          maxHeight: `${height}px`,
          maxWidth: `${width}px`,
          minHeight: `${(height as number) / 2}px`,
        }}
      >
        <Image
          className={cn('rounded-lg', !loading && 'hidden')}
          onError={() => setError(true)}
          alt={alt}
          width={width}
          height={height}
          src={src}
          style={{
            minHeight: `${(height as number) / 2}px`,
          }}
          onLoad={() => setLoading(false)}
          {...restProps}
        />
      </div>
    </>
  );
};

export default CustomImage;
