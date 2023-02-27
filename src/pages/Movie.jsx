import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

export const Movie = () =>{
    const {state:{movie}} = useLocation()
    const image_url = 'https://image.tmdb.org/t/p/original/'
    const bg_image = `${image_url}${movie.backdrop_path}`;

    console.log(movie)
    
    return(
        <Box
          sx={{
            backgroundImage: `url(${bg_image})`,
            backgroundSize: "cover",
            height: "100vh",
            opacity: "0.5",
            display: "flex",
            alignItems: "center",
            paddingX: "24px",
            
          }}
        >
          <Container 
            maxWidth="xl"
            sx={{
              backdropFilter: "blur(20px) brightness(1.2)",
              borderRadius: "16px",
              '@media (min-width:600px)': {
                paddingLeft: "0",
                paddingBottom: "0",
              }
              

              
              
            }}
            >
              
              <Grid container justifyContent="space-between"> 
                <Grid item xs={12} md={3}>
                  <Paper
                      
                      elevation={5}
                      component="img"
                      sx={{
                          width: "100%"
                      }}
                      src={image_url + movie.poster_path} 
                      alt={movie.title} 
                  />
                </Grid>
                <Grid item xs={12} md={6} p={3} >
                      <Box>
                        <Stack spacing={2}>
                          <Typography variant="h4" component="h2" color="secondary.light">
                            {movie.title}
                          </Typography>
                          <Typography variant="body2" component="p" color="secondary.light">
                            {movie.overview}
                          </Typography>
                        </Stack>
                      </Box>
                </Grid>
              </Grid>

          </Container>


        </Box>
    )
}
