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
} satisfies ChartConfig;

//slate time for analytics data
export const AnalyticsDataStaleTime = 1 * 60 * 1000; //1 min

//slate time for user data
export const UserDataStaleTime = 5 * 60 * 1000; //5 min

// image upload max size
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2mb
