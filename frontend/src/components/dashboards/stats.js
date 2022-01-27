import * as React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function Orders() {
  const navigate = useNavigate();
  const rows = ["item1", "item2", "item3", "item4", "item5"];
  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/vendor/");
        }}
      >
        Back
      </Button>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4">
              Top 5 Items
            </Typography>
            {rows.map((row) => (
              <Typography component="h1" variant="h5">
                {row}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4">
              Counts
            </Typography>
            <Typography component="h3" variant="h6">
              Orders Placed:
            </Typography>
            <Typography component="h3" variant="h6">
              Pending Orders:
            </Typography>
            <Typography component="h3" variant="h6">
              Completed Orders:
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
