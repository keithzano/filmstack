import { Box, Grid, Paper, Rating, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"

export const MovieCard = ({movie}) => {
    const image_url = 'https://image.tmdb.org/t/p/w500/'
    const movie_url = `${movie.title.toLowerCase().split(" ").join("-")}`;
    const theme = useTheme();
    return(
        <Grid item lg={2} md={4} xs={6}>
            <Link 
                to={`movies/${movie_url}` }
                state={{
                    movie:movie
                }}
            >
                <Paper
                    
                    elevation={5}
                    component="img"
                    sx={{
                        width: "100%"
                    }}
                    src={image_url + movie.poster_path} 
                    alt={movie.title} 
                />
            </Link>
                
            <Box>
                <Link
                    to={`movies/${movie_url}`}
                    state={{
                        movie: movie
                    }}
                    style={{ textDecoration: "none", color: theme.palette.text.primary }}
                >
                    <Typography variant="subtitle2" component="h2">
                        {movie.title}
                    </Typography>
                </Link>
                <Rating name="movie-rating" defaultValue={movie.vote_average/2} precision={0.1} size="small" readOnly/>
                <br></br>
                <Typography variant="paragraph"> {movie.release_date.split("-").splice(0,1)} </Typography>
            </Box>
        </Grid>    
    )
}