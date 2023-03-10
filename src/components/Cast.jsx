import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { customWidthImage, w500Image } from "../api/apiConfig";
import SwiperCore, { FreeMode, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const MovieCast = ({ cast }) => {
  const theme = useTheme();
  SwiperCore.use([FreeMode, Scrollbar]);
  return (
    <>
      <Typography variant="h5" color="white" my={3}>
        Top Billed Cast
      </Typography>
      <Swiper
        spaceBetween={16}
        freeMode={true}
        scrollbar={true}
        breakpoints={{
          1024: {
            slidesPerView: 10.5,
          },
          768: {
            slidesPerView: 7.5,
          },
          480: {
            slidesPerView: 5.5,
          },
          0: {
            slidesPerView: 3.5,
          },
        }}
      >
        {cast?.map((actor) => (
          <SwiperSlide>
            <Grid item lg={2} md={4} xs={6}>
              <Box
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
                  src={customWidthImage(actor.profile_path, 200)}
                  alt={actor.name}
                />
              </Box>

              <Box>
                <Box
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography variant="subtitle1" color="white" component="h2">
                    {actor.name}
                  </Typography>
                  <Typography variant="subtitle2" component="h2">
                    {actor.character}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
