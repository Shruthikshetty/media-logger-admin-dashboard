'use client';
import Image from 'next/image';

/**
 * A component to display all the attributions.
 * @returns {React.ReactElement}
 */
const Attributions = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Single Attribution Text */}
      <p className="text-ui-400 mb-2 text-center text-xs">
        This product uses data and images from <b>TMDB</b>, <b>IGDB</b>, and{' '}
        <b>RAWG</b>. We are not endorsed or certified by these providers. Logos
        are trademarks of their respective owners.
      </p>
      {/* Logo Row */}
      <div className="flex flex-row items-center space-x-4">
        {/* TMDB Logo */}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Movie Database"
        >
          <Image
            src="/tmdb-attribution.svg"
            alt="TMDB Logo"
            width={100}
            height={20}
          />
        </a>
        {/* IGDB Logo */}
        <a
          href="https://www.igdb.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="IGDB Logo"
        >
          <Image
            src="/igdb-attribution.svg"
            alt="IGDB Logo"
            width={100}
            height={24}
          />
        </a>
        {/* RAWG "Logo"*/}
        <a
          href="https://rawg.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RAWG Logo"
        >
          <Image
            src="/rawg-attribution.svg"
            alt="RAWG Logo"
            width={100}
            height={24}
          />
        </a>
      </div>
    </div>
  );
};

export default Attributions;
