import * as React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "react-select";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export default function ItemCard(prop) {
  const navigate = useNavigate();

  return (
    <>
      <Card>
        {/* <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Heading {prop.card}
          </Typography>
          <Typography>Price:</Typography>
          <Typography>Vendor:</Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid>
              <TextField
                required
                size="small"
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Grid sx={{ paddingTop: 2 }}>
        <Typography>Addons</Typography>

        <Select isMulti options={prop.options} />
        <Button variant="contained">Buy</Button>
      </Grid>
    </>
  );
}
