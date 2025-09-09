import React from 'react';
import CustomImage from './custom-image';
import { ListLoader, LoadingWrapper } from './custom-loaders';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';

export type InfoItem = {
  Icon?: LucideIcon;
  label: string;
  type?: 'badge' | 'text';
  value?: string;
  iconColor?: string;
};

type BackDropCardPros = {
  posterSrc?: string;
  title: string;
  backdropSrc?: string;
  infoData: InfoItem[];
};

const BackdropCard = ({
  posterSrc,
  backdropSrc,
  infoData = [],
  title,
}: BackDropCardPros) => {
  return (
    <div className="relative h-96 w-full overflow-clip rounded-t-2xl">
      {backdropSrc && (
        <Image
          alt={`Backdrop for ${title ?? 'movie'}`}
          fill
          src={backdropSrc}
          quality={75}
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
        />
      )}
      {/* poster */}
      <div className="absolute z-10 flex h-full w-full flex-col items-baseline justify-end p-5 md:pl-30">
        <div className="flex w-full flex-row items-end gap-1 sm:gap-2">
          <CustomImage
            alt={'poster image'}
            src={posterSrc}
            width={180}
            height={300}
            maxHeight={300}
            maxWidth={200}
            minHeight={120}
            minWidth={100}
            className="border-ui-600 rounded-xl border-1 shadow-2xl"
          />
          <div className="bg-base-black/80 rounded-xl p-3 pb-10">
            {/* Title */}
            <LoadingWrapper fallback={<Skeleton className="mb-5 h-6 w-40" />}>
              <p className="mb-2 text-2xl font-bold sm:text-3xl">{title}</p>
            </LoadingWrapper>
            {/* Additional info */}
            <LoadingWrapper
              fallback={<ListLoader noOfItems={4} itemClassName="w-10" />}
            >
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4">
                {infoData.map((item, index) =>
                  item.type !== 'badge' ? (
                    <p
                      className="text-md flex flex-row items-center gap-1 font-semibold"
                      key={index}
                    >
                      {item.Icon && (
                        <item.Icon
                          className="h-4 w-4"
                          color={item?.iconColor}
                        />
                      )}
                      {item.value}
                    </p>
                  ) : (
                    <Badge
                      className="bg-ui-700 hover:bg-ui-600 rounded-full border-0 px-2"
                      key={index}
                    >
                      {item.value}
                    </Badge>
                  ),
                )}
              </div>
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackdropCard;
