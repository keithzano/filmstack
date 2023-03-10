import axios from "axios";
import { api_key, baseURL } from "./apiConfig";

export const getDiscoverMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/discover/movie`, {
    params: {
      api_key: api_key,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: "en-US",
      page: 1,
    },
  });
  return results;
};

export const getNowPlayingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/movie/now_playing`, {
    params: {
      api_key: api_key,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: "en-US",
      page: 1,
    },
  });
  return results;
};

export const getTopRatedMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/movie/top_rated`, {
    params: {
      api_key: api_key,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: "en-US",
      page: 1,
    },
  });
  return results;
};

export const getUpcomingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/movie/upcoming`, {
    params: {
      api_key: api_key,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: "en-US",
      page: 1,
    },
  });
  return results;
};

export const getPopularMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/movie/popular`, {
    params: {
      api_key: api_key,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: "en-US",
      page: 1,
    },
  });
  return results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${baseURL}/movie/${movieId}`, {
    params: {
      api_key: api_key,
      append_to_response: "videos,recommendations,similar,reviews,credits",
    },
  });
  return data;
};
