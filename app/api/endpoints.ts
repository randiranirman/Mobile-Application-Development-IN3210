export const ENDPOINTS = {
  TRENDING_MOVIES: '/trending/movie',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED: '/movie/top_rated',
  MOVIE_DETAILS: '/movie',
  SEARCH: '/search/movie',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
};

export const getImageUrl = (path: string, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};