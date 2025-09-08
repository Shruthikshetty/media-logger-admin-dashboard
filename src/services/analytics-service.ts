// this file contains the analytics related services

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AnalyticsDataStaleTime } from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import { useAuthStore } from '~/state-management/auth-store';
import { ApiError } from '~/types/global.types';
import apiClient from '~/lib/api-client';

type ChangeData = {
  percentage: number;
  change: 'up' | 'down';
};

type SingleDayData = {
  date: string;
  movies: number;
  tvShows: number;
  games: number;
  weekday: string;
};

type PercentageChangeFromLastMonth = {
  users: ChangeData;
  movies: ChangeData;
  tvShows: ChangeData;
  games: ChangeData;
};

export type AnalyticsData = {
  totalUsers: number;
  totalGames: number;
  totalMovies: number;
  totalTvShows: number;
  totalMedia: number;
  currentMonthData: SingleDayData[];
  weeklyMediaCount: SingleDayData[];
  percentageChangeFromLastMonth: PercentageChangeFromLastMonth;
};

type ResponseAnalyticsData = {
  success: boolean;
  data: AnalyticsData;
};

/**
 * custom hook to fetch the analytics data for dashboard
 */
export const useDashboardAnalyticsData = () => {
  //get if token is set
  const isTokenSet = useAuthStore((s) => s.tokenSet);
  return useQuery<ResponseAnalyticsData, AxiosError<ApiError>>({
    queryKey: [QueryKeys.dashboardAnalytics],
    enabled: Boolean(isTokenSet), // no token do not fetch
    staleTime: AnalyticsDataStaleTime,
    queryFn: async ({ signal }) =>
      apiClient<ResponseAnalyticsData>(Endpoints.analyticsDashboard, {
        signal,
      }).then((res) => res.data),
  });
};
