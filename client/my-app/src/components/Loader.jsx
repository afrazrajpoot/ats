import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loader1({ h, w }) {
  return (
    <React.Fragment>
      <svg width={100} height={100}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
    </React.Fragment>
  );
}

export default function Loader({ h, w }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <Loader1 h={h} w={w} />
    </Box>
  );
}
