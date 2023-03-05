import { Box, Grid, Paper, Rating, Typography, useTheme } from "@mui/material";
import { w500Image } from "../api/apiConfig";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClick = (movieURL) => {
    navigate(`/movies/${movieURL}`, { replace: true });
  };
  const movieURL = `${movie.id}/${movie.title
    .toLowerCase()
    .split(" ")
    .join("-")}`;
  const theme = useTheme();
  return (
    <Grid item lg={2} md={4} xs={6}>
      <Box
        onClick={() => handleClick(movieURL)}
        style={{
          cursor: "pointer",
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
      </Box>

      <Box>
        <Box
          onClick={() => handleClick(movieURL)}
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="subtitle2" component="h2">
            {movie.title}
          </Typography>
        </Box>
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
