import React from "react";
import { style } from "@mui/system";
import { Button, Card, CardContent, Typography } from "@mui/material";

const TriangleImage = style("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = style("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achivement = () => {
  return (
    <Card
      className=""
      sx={{ position: "relative", bgcolor: "#242B2E", color: "white" }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          swiftKart.com
        </Typography>
        <Typography variant="body2">Congratulations</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          420.8K
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        {/* <TriangleImage src=""></TriangleImage> */}
        {/* <TriangleImage src="https://www.transparentpng.com/thumb/trophy/wvL2KJ-flowering-golden-medal-image.png" /> */}
      </CardContent>
    </Card>
  );
};

export default Achivement;
