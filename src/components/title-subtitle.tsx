import React from 'react';
import { cn } from '~/lib/utils';

type TitleSubtitleProps = {
  title?: string;
  subtitle?: string;
  customStyles?: {
    root?: React.CSSProperties;
    title?: React.CSSProperties;
    subtitle?: React.CSSProperties;
  };
};

/**
 * A simple component that displays a title and subtitle
 * @param {string} title The title.
 * @param {string} subtitle The subtitle.
 * @param {object} customStyles An object of custom styles.
 */
const TitleSubtitle = ({
  title,
  subtitle,
  customStyles,
}: TitleSubtitleProps) => {
  // custom styles
  const styles = {
    root: cn('gap flex w-full flex-col justify-center', customStyles?.root),
    title: cn('text-base-white text-3xl font-bold', customStyles?.title),
    subtitle: cn('text-ui-400 text-lg', customStyles?.subtitle),
  };

  return (
    <div className={styles.root}>
      {title && <p className={styles.title}>{title}</p>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default TitleSubtitle;
