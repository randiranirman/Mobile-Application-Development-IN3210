import axios from"axios";


const TMDB_API_KEY = "1de59687e7091e634f8a8a9185ebffe8"

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});


export const getTrendingMovies   =  async (  ) => {
    
    try {
        const response = await tmdbApi.get(`/trending/movie/day?${"language=en-US"}`);

            console.log(response.data);

    return response.data;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;


    }
    
}

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', { params: { page } });
  console.log( response.data)
;  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/top_rated', { params: { page } });
  console.log("top rated movies are fetched")

  console.log( response.data);
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export default tmdbApi;