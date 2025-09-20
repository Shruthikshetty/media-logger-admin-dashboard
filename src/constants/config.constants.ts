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

// movie and Tv genres
export const GENRE_MOVIE_TV = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Historical',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
  'Superhero',
  'Family',
  'Musical',
  'Biography',
  'Sport',
  'Noir',
  'Reality',
  'Talk Show',
  'Game Show',
  'News',
  'Cooking',
  'Kids',
  'Indie',
  'Strategy',
  'Puzzle',
  'Simulation',
  'Fighting',
  'Racing',
  'Survival',
  'Sandbox',
  'Science Fiction',
];

export const MEDIA_STATUS = ['released', 'upcoming'];

//languages available
export const LANGUAGES = [
  'English',
  'Hindi',
  'Spanish',
  'Mandarin',
  'Arabic',
  'Bengali',
  'Portuguese',
  'Russian',
  'Japanese',
  'Punjabi',
  'German',
  'Javanese',
  'French',
  'Telugu',
  'Vietnamese',
  'Marathi',
  'Korean',
  'Tamil',
  'Turkish',
  'Polish',
  'Thai',
  'Urdu',
  'Greek',
  'Malayalam',
  'Romanian',
  'Swedish',
  'Hungarian',
  'Italian',
  'Dutch',
  'Czech',
  'Finnish',
  'Norwegian',
  'Danish',
  'Bulgarian',
  'Lithuanian',
  'Hebrew',
  'Croatian',
  'Slovak',
  'Slovenian',
  'Estonian',
  'Latvian',
  'Maltese',
];

//movie , Tv show tags
export const TAGS = [
  'Based on true Story',
  'Cult Classic',
  'Binge-worthy',
  'Award-winning',
  'Coming of Age',
  'Post-Apocalyptic',
  'Dystopian',
  'Feel-Good',
  'Dark',
  'Slow Burn',
  'Fast-paced',
  'Character-Driven',
  'Plot Twist',
  'Underrated',
  'Critically Acclaimed',
  'Soundtrack Heavy',
  'Visual Masterpiece',
  'Mind-Bending',
  'Satirical',
  'Non-linear Story',
  'Multi-language',
  'Psychological',
  'Time Travel',
  'Violent',
  'Family Friendly',
  'Adult',
  'Romantic',
  'Political',
  'Fantasy World',
  'Supernatural',
  'Historical Fiction',
  'Episodic',
  'Serialized',
  'Minimalist',
  'Dialogue-heavy',
  'Shounen',
  'Sequel',
  'Demon',
  'Surveillance',
  'Cybersecurity',
  'Attack',
  'Privacy',
  'Government',
  'Cop',
  'Teacher',
  'Trance',
  'Witchcraft',
  'Multiple storylines',
  'Spell',
  'Aggressive',
  'Antagonistic',
  'Exorcism',
  'Haunted house',
  'Religion',
  'Wedding',
  'Spirit',
  'Ghost',
  'Martial arts',
  'Kung fu',
  'Detective',
  'Kidnapping',
  'Heist',
  'Cars',
  'Orphan',
  'Thief',
  'Revenge',
  'Dark comedy',
  'Assassin',
  'Reboot',
  'Friendship',
  'Politics',
  'History',
  'Suspense',
  'Supervillain',
  'Super power',
  'Comeback',
  'Exhilarated',
  'Motorsport',
  'Terrorist plot',
  'Infiltration',
  'Spy',
  'Artificial intelligence',
  'Female protagonist',
  'K-pop',
  'Fandom',
  '3d animation',
  'Save the world',
  'Remake',
  'Battle',
  'Warrior',
  'Cult',
  'Gloomy',
];

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
