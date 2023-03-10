import { PlayCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { w500Image } from "../api/apiConfig";
import { useState } from "react";
import { TrailerDialog } from "./TrailerDialog";

export const MovieDetails = ({ selectedMovie, ratingValue }) => {
  const [open, setOpen] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const playTrailer = () => {
    const trailer = selectedMovie?.videos?.results.find(
      (vid) =>
        vid.name.includes("Official Trailer") ||
        vid.name.includes("Trailer") ||
        vid.name.includes("trailer") ||
        vid.name.includes("Official") ||
        vid.name.includes("official")
    );
    if (trailer) {
      setTrailerVideoId(trailer.key);
    }
    setOpen(true);
  };

  const closeTrailer = () => {
    setTrailerVideoId(null);
  };

  return (
    <>
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
      <Grid item xs={12} md={6} p={0}>
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
                value={selectedMovie?.vote_average / 2}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography>
                ({selectedMovie?.vote_average.toFixed(1)})
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              {selectedMovie?.genres?.map((genre) => (
                <Button variant="outlined" key={genre.id} color="secondary">
                  {genre.name}
                </Button>
              ))}

              {selectedMovie?.videos?.results &&
                !!selectedMovie?.videos?.results.length && (
                  <Button
                    onClick={() => playTrailer()}
                    color="secondary"
                    endIcon={<PlayCircle />}
                  >
                    Play Trailer
                  </Button>
                )}
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
      {trailerVideoId && (
        <TrailerDialog
          open={open}
          handleClose={handleClose}
          trailerVideoId={trailerVideoId}
          closeTrailer={closeTrailer}
        />
      )}
    </>
  );
};
