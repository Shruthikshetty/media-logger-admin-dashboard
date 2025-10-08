/**
 * This file contains all the endpoints for the app
 */

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

//this contains all the endpoints
export const Endpoints = {
  login: `/api/auth/login`,
  analyticsDashboard: `/api/analytic/dashboard-admin`,
  baseUser: `/api/user`,
  allUsers: `/api/user/all`,
  filterUsers: `/api/user/filter`,
  userRole: `/api/user/role`,
  uploadImage: `/api/upload/image`,
  baseMovie: `/api/movie`,
  filterMovies: `/api/movie/filter`,
  moviesBulk: `/api/movie/bulk`,
  baseGame: `/api/game`,
  filterGames: `/api/game/filter`,
  bulkGamesBase: `/api/game/bulk`,
  baseTvShow: `/api/tv-show`,
  filterTvShows: `/api/tv-show/filter`,
  baseSeason: `/api/tv-show/season`,
  baseEpisode: `/api/tv-show/episode`,
};
