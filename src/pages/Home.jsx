import { Container, Grid, Box } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { MovieCard } from "../components/MovieCard";



import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export const Home = () => {

  const base_url = "https://api.themoviedb.org/3/";
  const image_url = 'https://image.tmdb.org/t/p/original/'
  const getDiscoverMovies = async () => {
    const { data: { results } } = await axios.get(`${base_url}discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en-US",
        append_to_response: "videos",
      },
    });
    return results;
  };
  
  const { data: movies, isLoading, isError } = useQuery("discoverMovies", getDiscoverMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  console.log(movies)

  const renderMovies = () => (
    movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))
  );
  
const bg_image = `${image_url}${movies[0].backdrop_path}`;

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: `url(${bg_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          margin: "16px auto"
        }}
      >

      </Box>
      <Grid container spacing={2}>
        {renderMovies()}
      </Grid>
    </Container>
  );
};


