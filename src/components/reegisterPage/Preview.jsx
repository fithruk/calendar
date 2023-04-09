import React from "react";
import { Box, Typography } from "@mui/material";
import img from "../../assets/calendar_screen.png";
const Preview = () => {
  return (
    <Box
      sx={{
        width: "70vw",
        height: "70vw",
        margin: "50px auto",
        maxHeight: "100vh",
      }}
    >
      <Typography
        component="h1"
        textAlign={"center"}
        sx={{ margin: "50px auto" }}
      >
        Preview
      </Typography>
      <Box>
        <img
          src={img}
          alt="img"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>
      <Typography component={"p"}>
        Web copy of the Google calendar, there is validation of created events
        by duration, conflicts of events by time, cancellation of an event after
        it has begun.
      </Typography>
    </Box>
  );
};

export default Preview;
