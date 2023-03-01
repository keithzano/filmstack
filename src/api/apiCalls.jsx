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

export const getSimilarMovies = async (movieId) => {
  const {
    data: { results },
  } = await axios.get(`${baseURL}/movie/${movieId}/similar`, {
    params: {
      api_key: api_key,
      language: "en-US",
      page: 1,
      page_size: 4,
    },
  });
  return results.slice(0, 4);
};
