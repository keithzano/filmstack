import { Container, Grid, Box } from "@mui/material";
import { useQuery } from "react-query";
import { MovieCard } from "../components/MovieCard";

import { originalImage } from "../api/apiConfig";
import { getDiscoverMovies } from "../api/apiCalls";

console.log(originalImage("hey"));

export const Home = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery("discoverMovies", getDiscoverMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  console.log(originalImage(movies[0].backdrop_path));

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
