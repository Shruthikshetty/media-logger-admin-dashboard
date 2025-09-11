'use client';
import Image from 'next/image';

/**
 * A component to display all the attributions.
 * @returns {React.ReactElement}
 */
const Attributions = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-ui-400 mb-2 text-xs">
        This product uses the TMDB API but is not endorsed or certified by TMDB.{' '}
        <br />
      </p>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/tmdb-attribution.svg"
          alt="The Movie Database API Logo"
          width={100}
          height={20}
        />
      </a>
    </div>
  );
};

export default Attributions;
