'use client';
import React, { useState } from 'react';
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
  if (!src || error)
    return (
      <div className="bg-ui-600 flex h-full max-h-[150px] min-h-[80px] w-full max-w-[80px] flex-col items-center justify-center rounded-lg p-2">
        <Icon className="h-full w-full" />
      </div>
    );
  return (
    <>
      {loading && (
        <div
          className="bg-ui-600 flex h-full max-h-[150px] min-h-[80px] w-full max-w-[80px] rounded-lg p-2"
          style={{
            background: getRandomColor(),
          }}
        ></div>
      )}
      <Image
        className={cn('rounded-lg', !loading && 'hidden')}
        onError={() => setError(true)}
        alt={alt}
        src={src}
        onLoad={() => setLoading(false)}
        {...restProps}
      />
    </>
  );
};

export default CustomImage;
