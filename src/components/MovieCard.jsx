import { Box, Grid, Paper, Rating, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { w500Image } from "../api/apiConfig";

export const MovieCard = ({ movie }) => {
  const movieURL = `${movie.title.toLowerCase().split(" ").join("-")}`;
  const theme = useTheme();
  return (
    <Grid item lg={2} md={4} xs={6}>
      <Link
        to={`movies/${movieURL}`}
        state={{
          movie: movie,
        }}
      >
        <Paper
          elevation={5}
          component="img"
          sx={{
            width: "100%",
          }}
          src={w500Image(movie.poster_path)}
          alt={movie.title}
        />
      </Link>

      <Box>
        <Link
          to={`movies/${movieURL}`}
          state={{
            movie: movie,
          }}
          style={{ textDecoration: "none", color: theme.palette.text.primary }}
        >
          <Typography variant="subtitle2" component="h2">
            {movie.title}
          </Typography>
        </Link>
        <Rating
          name="movie-rating"
          defaultValue={movie.vote_average / 2}
          precision={0.1}
          size="small"
          readOnly
        />
        <br></br>
        <Typography variant="paragraph">
          {" "}
          {movie.release_date.split("-").splice(0, 1)}{" "}
        </Typography>
      </Box>
    </Grid>
  );
};
