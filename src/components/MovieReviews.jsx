import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { customWidthImage } from "../api/apiConfig";

export const MovieReviews = ({ reviews }) => {
  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
        {reviews?.map((review) => (
          <>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  src={customWidthImage(review.author_details.avatar_path, 200)}
                  alt={review.author_details.name}
                />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography
                  style={{ margin: 0, textAlign: "left" }}
                  variant="h5"
                >
                  {review.author}
                </Typography>
                <Typography>{review.content} </Typography>

                <Typography my={2}>
                  Original review {review.created_at}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </>
        ))}
      </Paper>
    </Container>
  );
};
