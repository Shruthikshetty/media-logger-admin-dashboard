import React from 'react';
import BackButton from '~/components/back-button';
import { Card } from '~/components/ui/card';
import Image from 'next/image';
const MovieDetails = () => {
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <BackButton className="min-w-40" />
      {/* All movie details */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r pt-0">
        {/* Back drop area */}
        <div className="relative h-96 w-full rounded-t-2xl overflow-clip">
          <Image
            alt="backdrop"
            fill
            src={
              'https://i.imgur.com/Hmys8kh_d.webp?maxwidth=520&shape=thumb&fidelity=high'
            }
            quality={100}
            className="absolute opacity-90"
          />
          {/* poster */}
          <div className="absolute z-10 h-full w-full">
            <p>Hello world</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetails;
