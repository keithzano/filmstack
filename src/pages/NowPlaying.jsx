import { Container, Grid, Box } from "@mui/material";
import { useQuery } from "react-query";
import { MovieCard } from "../components/MovieCard";

import { originalImage } from "../api/apiConfig";
import { getNowPlayingMovies } from "../api/apiCalls";

export const NowPlaying = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery("discoverMovies", getNowPlayingMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: `url(${originalImage(movies[0].backdrop_path)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "60vh",
          margin: "16px auto",
        }}
      ></Box>
      <Grid container spacing={2}>
        {renderMovies()}
      </Grid>
    </Container>
  );
};
