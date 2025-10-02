/**
 * This file contains configurations constants
 */

import type { ChartConfig } from '~/components/ui/chart';
import { AppColors } from './colors.constants';
import { FilterConfig } from '~/components/media-filters';
import {
  BookA,
  CalendarDays,
  Clock,
  FunnelPlus,
  Star,
  Tag,
  UserRound,
} from 'lucide-react';
import { UserRoles } from './screen.constants';
import {
  GENRE_MOVIE_TV,
  LANGUAGES,
  TAGS,
  GAME_GENRES,
  GAME_PLATFORMS,
} from './data.constants';

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

//slate time for all users data
export const AllUsersDataStaleTime = 1 * 60 * 1000; //1 min

// image upload max size
export const MaxImageSize = 2 * 1024 * 1024; // 2mb

// fetch all movies slate time for analytics data
export const FetchAllMoviesStaleTime = 1 * 60 * 1000; //1 min

//fetch single movie details
export const FetchMovieDetailsStaleTime = 1 * 60 * 1000; //1 min

// user table page item limit
export const UserTablePageItemLimit = 20;

//all games data slate time
export const FetchAllGamesSlateTime = 1 * 60 * 1000; //1 min

//fetch game details slate time
export const FetchGameDetailsSlateTime = 1 * 60 * 1000; //1 min

export const MEDIA_STATUS = ['released', 'upcoming'];

// movie filter config
export const MovieFilterConfig: FilterConfig[] = [
  {
    key: 'genre',
    label: 'Genres',
    type: 'dropdown',
    multiselect: true,
    options: GENRE_MOVIE_TV,
    icon: FunnelPlus,
  },
  {
    key: 'languages',
    label: 'Languages',
    type: 'dropdown',
    multiselect: true,
    options: LANGUAGES,
    icon: BookA,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    multiselect: false,
    options: MEDIA_STATUS,
    icon: FunnelPlus,
  },
  {
    key: 'averageRating',
    label: 'Average Rating',
    type: 'number-input',
    min: 0,
    max: 10,
    icon: Star,
    iconClassName: 'text-yellow-500',
    helperText: 'Average rating between 0 to 10',
  },
  {
    key: 'tags',
    label: 'Tags',
    type: 'search-dropdown',
    multiselect: true,
    options: TAGS,
    icon: Tag,
  },
  {
    key: 'ageRating',
    label: 'Age Rating',
    type: 'range',
    max: 22,
    min: 0,
    step: 1,
    icon: UserRound,
    unitLabel: 'years',
  },
  {
    key: 'runTime',
    label: 'Runtime',
    type: 'range',
    max: 600, // 10 hours
    min: 0,
    step: 1,
    icon: Clock,
    unitLabel: 'min',
  },
  {
    key: 'releaseDate',
    label: 'Release Date',
    type: 'date',
    icon: CalendarDays,
  },
];

// user roles array
export const UserRolesArray = Object.values(UserRoles);

// user filter config
export const UsersFilterConfig: FilterConfig[] = [
  {
    key: 'role',
    label: 'Role',
    type: 'dropdown',
    multiselect: false,
    options: UserRolesArray,
    icon: UserRound,
  },
];

//games filter config
export const GamesFilterConfig: FilterConfig[] = [
  {
    key: 'genre',
    label: 'Genres',
    type: 'dropdown',
    multiselect: true,
    options: GAME_GENRES,
    icon: FunnelPlus,
  },
  {
    key: 'averageRating',
    label: 'Average Rating',
    type: 'number-input',
    min: 0,
    max: 10,
    icon: Star,
    iconClassName: 'text-yellow-500',
    helperText: 'Average rating between 0 to 10',
  },
  {
    key: 'ageRating',
    label: 'Age Rating',
    type: 'range',
    max: 22,
    min: 0,
    step: 1,
    icon: UserRound,
    unitLabel: 'years',
  },
  {
    key: 'releaseDate',
    label: 'Release Date',
    type: 'date',
    icon: CalendarDays,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    multiselect: false,
    options: MEDIA_STATUS,
    icon: FunnelPlus,
  },
  {
    key: 'platforms',
    label: 'Platforms',
    type: 'dropdown',
    multiselect: true,
    options: GAME_PLATFORMS,
    icon: FunnelPlus,
  },
];

//tv show filter config
export const TvShowsFilterConfig: FilterConfig[] = [
  {
    key: 'genre',
    label: 'Genres',
    type: 'dropdown',
    multiselect: true,
    options: GENRE_MOVIE_TV,
    icon: FunnelPlus,
  },
  {
    key: 'languages',
    label: 'Languages',
    type: 'dropdown',
    multiselect: true,
    options: LANGUAGES,
    icon: BookA,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    multiselect: false,
    options: MEDIA_STATUS,
    icon: FunnelPlus,
  },
  {
    key: 'averageRating',
    label: 'Average Rating',
    type: 'number-input',
    min: 0,
    max: 10,
    icon: Star,
    iconClassName: 'text-yellow-500',
    helperText: 'Average rating between 0 to 10',
  },
  {
    key: 'releaseDate',
    label: 'Release Date',
    type: 'date',
    icon: CalendarDays,
  },
  {
    key: 'tags',
    label: 'Tags',
    type: 'search-dropdown',
    multiselect: true,
    options: TAGS,
    icon: Tag,
  },
  {
    key: 'ageRating',
    label: 'Age Rating',
    type: 'range',
    max: 22,
    min: 0,
    step: 1,
    icon: UserRound,
    unitLabel: 'years',
  },
  {
    key: 'runTime',
    label: 'Runtime',
    type: 'range',
    max: 600, // 10 hours
    min: 0,
    step: 1,
    icon: Clock,
    unitLabel: 'min',
  },
];

// export data constants
export { GENRE_MOVIE_TV, LANGUAGES, TAGS, GAME_GENRES, GAME_PLATFORMS };
