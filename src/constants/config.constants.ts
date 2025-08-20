/**
 * This file contains configurations constants
 */

import type { ChartConfig } from '~/components/ui/chart';
import { AppColors } from './colors.constants';

export const CookieNames = {
  token: 'token',
};

export const TokenExpiry = 1; //days

//config for the bar chart used in dashboard
export const WeeklyAdditionsConfig = {
  movies: {
    label: 'Movies',
    color: AppColors.brand[500],
  },
  tvShows: {
    label: 'Tv Shows',
    color: AppColors.accent.purple,
  },
  games: {
    label: 'Games',
    color: AppColors.feedback.successLight,
  },
} satisfies ChartConfig;

//config for pie chart
export const PieChartMediaDistributionConfig = {
  movies: {
    label: 'Movies',
    color: AppColors.brand[500],
  },
  tvShows: {
    label: 'Tv Shows',
    color: AppColors.accent.purple,
  },
  games: {
    label: 'Games',
    color: AppColors.feedback.successLight,
  },
};
