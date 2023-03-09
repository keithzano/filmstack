import { Grid, Paper, Typography } from "@mui/material";
import { customWidthImage } from "../api/apiConfig";

export const SimilarMoviesCard = ({ similarMovies, handleMovieClick }) => {
  return (
    <Grid item xs={12} md={2}>
      <Grid container spacing={2} mt={0}>
        <Typography variant="h5" p={2}>
          Similar Movies
        </Typography>
        {similarMovies?.map((similarMovie, index) => (
          <Grid
            item
            xs={6}
            onClick={() => handleMovieClick(similarMovie)}
            key={index}
          >
            <Paper
              elevation={5}
              component="img"
              sx={{
                width: "100%",
              }}
              src={customWidthImage(similarMovie?.poster_path, 300)}
              alt={similarMovie?.title}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
