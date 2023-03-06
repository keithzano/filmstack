import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "../components/MovieCard";

export const MovieSwiper = ({ movies }) => {
  return (
    <Swiper
      spaceBetween={16}
      freeMode={true}
      breakpoints={{
        1024: {
          slidesPerView: 6.5,
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
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
