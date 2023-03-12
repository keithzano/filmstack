import { useState } from "react";
import { Container, Typography, Box, TextField } from "@mui/material";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "32px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Find your next movie
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <TextField
            id="search-movies-input"
            label="Search movies"
            variant="outlined"
            size="small"
            fullWidth
            onClick={handleSearchClick}
            sx={{ mr: 1 }}
          />
          <SearchMovies
            isDialogOpen={isDialogOpen}
            handleDialogClose={handleDialogClose}
          />
        </Box>
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
    </Container>
  );
};
