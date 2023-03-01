import {
  Box,
  Container,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSimilarMovies } from "../api/apiCalls";
import { customWidthImage, originalImage, w500Image } from "../api/apiConfig";

export const Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const {
    state: { movie },
  } = useLocation();
  const {
    data: similarMovies,
    isLoading,
    isError,
    refetch,
  } = useQuery("similarMovies", () =>
    getSimilarMovies(selectedMovie?.id || movie.id)
  );

  console.log(similarMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${originalImage(
            selectedMovie?.backdrop_path || movie?.backdrop_path
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
                src={w500Image(
                  selectedMovie?.poster_path || movie?.poster_path
                )}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={12} md={6} p={3}>
              <Box>
                <Stack spacing={2}>
                  <Typography variant="h3" component="h2" color="#fff">
                    {selectedMovie.title || movie.title}{" "}
                    <span style={{ fontSize: "0.6em" }}>
                      {" "}
                      (
                      {selectedMovie?.release_date?.split("-").splice(0, 1) ||
                        movie.release_date.split("-").splice(0, 1)}
                      )
                    </span>
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Rating
                      name="movie-rating"
                      defaultValue={
                        selectedMovie?.vote_average || movie?.vote_average / 2
                      }
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography>
                      ({selectedMovie?.vote_average || movie?.vote_average})
                    </Typography>
                  </Stack>
                  <Typography variant="h4" component="h3" color="white">
                    Plot summary
                  </Typography>
                  <Typography variant="body2" component="p" color="white">
                    {selectedMovie?.overview || movie?.overview}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid container spacing={2} mt={0}>
                <Typography variant="h4" p={2}>
                  Simila Movies
                </Typography>
                {similarMovies.map((similarMovie, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={5}
                      component="img"
                      sx={{
                        width: "80%",
                      }}
                      src={customWidthImage(similarMovie?.poster_path, 300)}
                      alt={similarMovie?.title}
                      onClick={() => {
                        setSelectedMovie(similarMovie);
                        refetch(selectedMovie?.id);
                      }}
                    />
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
