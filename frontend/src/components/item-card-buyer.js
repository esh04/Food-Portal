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

export default function ItemCard({ card }) {
  const navigate = useNavigate();
  const [addOns, setAddOns] = React.useState(
    card.addOns.map((addOn) => {
      return { value: addOn.name, label: addOn.name };
    })
  );

  const buyItem = () => {};
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
            {card.name}
          </Typography>
          <Typography>Price: Rs {card.price}</Typography>
          <Typography>Vendor: {card.vendorName}</Typography>
          <Typography>
            {card.veg === "veg" ? "Vegeterian" : "Non-Vegeterian"}
          </Typography>
          {card.tags?.length > 0 && (
            <Typography>
              <br />
              <b>Tags:</b>
            </Typography>
          )}
          {card.tags?.length > 0 &&
            card.tags.map((tag, index) => (
              <Typography key={index}>{tag}</Typography>
            ))}
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
        {card.addOns?.length > 0 && (
          <>
            <Typography>Addons</Typography>
            <Select isMulti options={addOns} />
          </>
        )}
        <Button variant="contained" onClick={() => buyItem()}>
          Buy
        </Button>
      </Grid>
    </>
  );
}
