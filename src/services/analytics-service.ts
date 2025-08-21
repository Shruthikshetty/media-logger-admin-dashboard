// this file contains the analytics related services

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import { useAuthStore } from '~/state-management/auth-store';
import { ApiError } from '~/types/global.types';

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
  return useQuery<ResponseAnalyticsData, AxiosError<ApiError>>({
    queryKey: [QueryKeys.dashboardAnalytics],
    queryFn: async () =>
      axios<ResponseAnalyticsData>(Endpoints.analyticsDashboard, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      }).then((res) => res.data),
  });
};
