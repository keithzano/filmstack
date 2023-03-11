import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { searchMovies } from "../api/apiCalls";
import { customWidthImage } from "../api/apiConfig";
import { MovieCard } from "./MovieCard";
import { Grid } from "@mui/material";

export const SearchMovies = () => {
  const [movieOptions, setMovieOptions] = useState([]);

  const getSearchedMovies = async (e) => {
    const data = await searchMovies(e.target.value);
    const opt = data.results;
    if (data?.results) {
      setMovieOptions(opt instanceof Array ? opt : [opt]); // ensure that opt is always an array
    } else {
      setMovieOptions([]);
    }
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Search Movies"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
        type: "search",
      }}
    />
  );

  const renderOption = (props, option, { selected }) => (
    <Grid container spacing={2}>
      <Grid item>
        <MovieCard movie={option} />
      </Grid>
    </Grid>
  );

  return (
    <Autocomplete
      options={movieOptions}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      renderInput={renderInput}
      renderOption={renderOption}
      onInputChange={getSearchedMovies}
    />
  );
};
