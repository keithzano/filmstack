import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box, TextField, Grid } from "@mui/material";
import { searchMovies } from "../api/apiCalls";
import { MovieCard } from "./MovieCard";
import { forwardRef, useRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SearchMovies = ({ isDialogOpen, handleDialogClose }) => {
  const [movies, setMovies] = useState([]);

  const inputRef = useRef(null);

  const getSearchedMovies = async (e) => {
    const data = await searchMovies(e.target.value);
    const { results: movies } = data || {};
    setMovies(movies);
  };

  const handleDialogOpen = () => {
    setMovies([]);
    inputRef.current.focus();
  };
  return (
    <Box>
      <Button onClick={handleDialogOpen}>Search Movies</Button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullScreen={true}>
        <DialogTitle>Search Movies</DialogTitle>
        <DialogContent>
          <TextField
            id="search-movies-dialog-input"
            label="Search movies"
            variant="outlined"
            size="small"
            fullWidth
            inputRef={inputRef}
            onChange={getSearchedMovies}
          />
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={getSearchedMovies}>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
