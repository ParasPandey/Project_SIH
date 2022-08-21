import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./../CSS/People.css";
import { Avatar, CardHeader } from "@material-ui/core";
import { Box, CardMedia } from "@mui/material";

const People = ({ data, index }) => {
  return (
    <div
      key={index}
      className={`card_container ${
        index % 2 === 0 ? "left_align" : "right_align"
      }`}
    >
      <Card sx={{ display: "flex", width: "80%" }} className="mb-4 people_card">
        {index % 2 !== 0 ? (
          <>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" className="mb-2">
                  {data.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  align="left"
                >
                  {data.about}
                </Typography>
              </CardContent>
            </Box>
            <Box
              className="p-2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                className="rounded-circle"
                component="img"
                sx={{ width: 150, height: 150 }}
                image={data.pic}
                alt="Live from space album cover"
              />
            </Box>
          </>
        ) : (
          <>
            <Box
              className="p-2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                className="rounded-circle"
                component="img"
                sx={{ width: 150, height: 150 }}
                image={data.pic}
                alt="Live from space album cover"
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" className="mb-2">
                  {data.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  align="left"
                >
                  {data.about}
                </Typography>
              </CardContent>
            </Box>
          </>
        )}
      </Card>
    </div>
  );
};

export default People;
