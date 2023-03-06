import { Paper } from "@mui/material";
import { customWidthImage } from "../api/apiConfig";

export const SimilarMoviesCard = ({ similarMovie }) => {
  return (
    <Paper
      elevation={5}
      component="img"
      sx={{
        width: "80%",
      }}
      src={customWidthImage(similarMovie?.poster_path, 300)}
      alt={similarMovie?.title}
    />
  );
};
