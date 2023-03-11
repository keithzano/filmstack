import { Container, Typography, Box } from "@mui/material";
import { useQueries } from "react-query";

import { originalImage } from "../api/apiConfig";
import {
  getDiscoverMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../api/apiCalls";
import { MovieSwiper } from "../components/MovieSwiper";
import { SearchMovies } from "../components/SearchMovies";

export const Home = () => {
  const [
    { data: movies, isLoading, isError },
    { data: popularMovies },
    { data: topRatedMovies },
  ] = useQueries([
    {
      queryKey: ["discoverMovies"],
      queryFn: getDiscoverMovies,
    },
    {
      queryKey: ["popularMovies"],
      queryFn: getPopularMovies,
    },
    {
      queryKey: "topRatedMovies",
      queryFn: getTopRatedMovies,
    },
  ]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: `url(${originalImage(movies[0]?.backdrop_path)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "60vh",
          margin: "16px auto",
          borderRadius: "8px",
        }}
      >
        <SearchMovies />
      </Box>

      <Box>
        <Typography variant="h6" my={2}>
          Top Rated Movies
        </Typography>
        <MovieSwiper movies={topRatedMovies} />
      </Box>

      <Box>
        <Typography variant="h6" my={2}>
          Popular Movies
        </Typography>
        <MovieSwiper movies={popularMovies} />
      </Box>

      <Box>
        <Typography variant="h6" my={2}>
          Discover Movies
        </Typography>
        <MovieSwiper movies={movies} />
      </Box>
    </Container>
  );
};
