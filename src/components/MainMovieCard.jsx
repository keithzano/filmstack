import {
  Box,
  Container,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/apiCalls";
import { originalImage, w500Image } from "../api/apiConfig";

import { SimilarMoviesCard } from "../components/SimilarMoviesCard";

export const Movie = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState();

  const {
    data: movieDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery("movieDetails", () => getMovieDetails(movieId), {
    onSuccess: (data) => {
      setSelectedMovie(data);
    },
  });

  useEffect(() => {
    if (movieDetails) {
      setSelectedMovie(movieDetails);
    }
    console.log("I just mounted");
  }, [movieDetails]);

  const { similar: { results: similarMovies } = {} } = movieDetails || {};

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) return <div>Error fetching movies</div>;

  const handleMovieClick = async (similarMovie) => {
    const { id, title } = similarMovie;
    const updatedMovieDetails = await getMovieDetails(id);
    setSelectedMovie({ ...selectedMovie, id, title });
    setSelectedMovie((prev) => ({ ...prev, ...updatedMovieDetails }));
    const movieURL = `/movies/${id}/${title
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    navigate(movieURL, { replace: true });
  };
  console.log(selectedMovie);
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${originalImage(
            selectedMovie?.backdrop_path
          )})`,
          backgroundSize: "cover",
          height: "100vh",
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
          alignItems: "center",
          paddingX: "24px",
          minHeight: "90vh",
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
            },
          }}
        >
          <Grid container>
            <Grid item xs={6} md={3}>
              <Paper
                elevation={5}
                component="img"
                sx={{
                  width: "100%",
                }}
                src={w500Image(selectedMovie?.poster_path)}
                alt={selectedMovie?.title}
              />
            </Grid>
            <Grid item xs={12} md={6} p={3}>
              <Box>
                <Stack spacing={2}>
                  <Typography variant="h3" component="h2" color="#fff">
                    {selectedMovie?.title}{" "}
                    <span style={{ fontSize: "0.6em" }}>
                      {" "}
                      ({selectedMovie?.release_date?.split("-").splice(0, 1)})
                    </span>
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Rating
                      name="movie-rating"
                      defaultValue={selectedMovie?.vote_average / 2}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography>({selectedMovie?.vote_average})</Typography>
                  </Stack>
                  <Typography variant="h4" component="h3" color="white">
                    Plot summary
                  </Typography>
                  <Typography variant="body2" component="p" color="white">
                    {selectedMovie?.overview}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid container spacing={2} mt={0}>
                <Typography variant="h4" p={2}>
                  Similar Movies
                </Typography>
                {similarMovies?.map((similarMovie, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    onClick={() => handleMovieClick(similarMovie)}
                    key={index}
                  >
                    <SimilarMoviesCard similarMovie={similarMovie} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
