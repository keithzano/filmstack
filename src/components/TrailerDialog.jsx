import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import YouTube from "react-youtube";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TrailerDialog = ({
  open,
  handleClose,
  trailerVideoId,
  closeTrailer,
}) => {
  return (
    <Box>
      <Dialog
        open={open}
        maxWidth="xl"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <YouTube videoId={trailerVideoId} onEnd={closeTrailer} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      ;
    </Box>
  );
};
