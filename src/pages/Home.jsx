import { Container, Grid, Box } from "@mui/material";
import { useQuery } from "react-query";
import { MovieCard } from "../components/MovieCard";

import { originalImage } from "../api/apiConfig";
import { getDiscoverMovies } from "../api/apiCalls";
import { Swiper, SwiperSlide } from "swiper/react";

export const Home = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery("discoverMovies", getDiscoverMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching movies</div>;

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: `url(${originalImage(movies[0].backdrop_path)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "60vh",
          margin: "16px auto",
        }}
      ></Box>
      <Swiper
        spaceBetween={16}
        freeMode={true}
        breakpoints={{
          1024: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 5,
          },
          480: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
