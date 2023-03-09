import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/apiCalls";
import { originalImage } from "../api/apiConfig";
import { MovieDetails } from "../components/MovieDetails";
import { MovieSwiper } from "../components/MovieSwiper";

import { SimilarMoviesCard } from "../components/SimilarMoviesCard";

export const Movie = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState();
  const [ratingValue, setRatingValue] = useState();

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useQuery(["movieDetails", movieId], () => getMovieDetails(movieId), {
    onSuccess: (movieDetails) => {
      setSelectedMovie(movieDetails);
      setRatingValue(movieDetails?.vote_average / 2);
    },
  });
  const similarMovies = movieDetails?.similar?.results?.slice(0, 4) ?? [];
  const { recommendations: { results: recommendedMovies } = {} } =
    movieDetails || {};

  const handleMovieClick = async (similarMovie) => {
    const { id, title, poster_path, vote_average, overview, backdrop_path } =
      similarMovie;
    setSelectedMovie({
      id,
      title,
      poster_path,
      vote_average,
      overview,
      backdrop_path,
    });

    const updatedMovieDetails = await getMovieDetails(id);
    setSelectedMovie((prev) => ({ ...prev, ...updatedMovieDetails }));
    setRatingValue(selectedMovie?.vote_average / 2);

    const movieURL = `/movies/${id}/${title
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    navigate(movieURL, { replace: true });
  };

  if (isError) return <div>Error fetching movies</div>;
  console.log(selectedMovie);

  return (
    <>
      <Box
        style={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${originalImage(
              selectedMovie?.backdrop_path
            )})`,
            backgroundSize: "cover",
            opacity: "0.1",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingX: "24px",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              backdropFilter: "blur(20px) brightness(1)",
              borderRadius: "16px",
              "@media (min-width:600px)": {
                paddingLeft: "0",
                paddingBottom: "0",
                marginY: "32px",
              },
            }}
          >
            <Grid container justifyContent="space-between">
              <MovieDetails
                selectedMovie={selectedMovie}
                ratingValue={ratingValue}
              />

              <SimilarMoviesCard
                similarMovies={similarMovies}
                handleMovieClick={handleMovieClick}
              />
            </Grid>
          </Container>
        </Box>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          "@media (min-width:1440px)": {
            paddingLeft: "0",
            paddingBottom: "0",
            marginY: "32px",
          },
        }}
      >
        <Typography variant="h4" color="white" my={2}>
          Recommended Movies
        </Typography>
        <MovieSwiper movies={recommendedMovies} />
      </Container>
    </>
  );
};
