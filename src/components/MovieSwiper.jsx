import SwiperCore, { FreeMode, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "../components/MovieCard";

export const MovieSwiper = ({ movies }) => {
  SwiperCore.use([FreeMode, Scrollbar]);
  return (
    <Swiper
      spaceBetween={16}
      freeMode={true}
      scrollbar={true}
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
