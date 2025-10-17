import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Skeleton } from './ui/skeleton';

type StatCardProps = {
  title: string;
  value?: number;
  changePercent?: number;
  className?: string;
  Icon?: LucideIcon;
  iconClassName?: string;
  changeDirection?: 'up' | 'down';
};

/**
 * A StatCard is a card component that displays a stat with a title.
 * It can display an icon above the stat and a description below the stat.
 *
 * @example
 * <StatCard
 *   title="Total Active Users"
 *   value={1000}
 *   change={100}
 * />
 *
 * @param {string} title - The title of the stat.
 * @param {number} value - The value of the stat.
 * @param {number} changePercent - The change from last month.
 * @param {string} [className] - The class name of the component.
 * @param {LucideIcon} [Icon] - The icon to display above the stat.
 * @param {string} [iconClassName] - The class name of the icon.
 */

const StatCard = ({
  changePercent,
  title,
  value,
  className,
  Icon,
  iconClassName,
  changeDirection = 'up',
}: StatCardProps) => {
  //in case data is not available
  if (value == undefined || value == null) {
    return <Skeleton className="bg-ui-600 h-20 w-full rounded-xl" />;
  }

  return (
    <Card
      className={cn(
        'bg-ui-600 from-base-black to-ui-900 border-ui-600 text-base-white gap-0.5 border bg-gradient-to-r',
        className,
      )}
    >
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          {/* Title */}
          <CardTitle className="text-base-white text-lg">{title}</CardTitle>
          {/* Icon */}
          {Icon && (
            <Icon
              className={cn('h-7 w-7', iconClassName)}
              aria-label="media-icon"
            />
          )}
        </div>
      </CardHeader>
      {/* stats */}
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex flex-row items-center gap-2">
          {changeDirection === 'up' ? (
            <TrendingUp
              className="text-feedback-success h-4 w-4"
              aria-label="trending-up"
            />
          ) : (
            <TrendingDown
              className="text-feedback-error h-4 w-4"
              aria-label="trending-down"
            />
          )}
          <p className="text-ui-400 text-sm">
            {changeDirection === 'up' ? '+' : '-'}
            {changePercent} from last month
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
