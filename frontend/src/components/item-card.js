import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditItem from "./editFood";

export default function BuyerDashboard(prop) {
  let id = localStorage.getItem("userid");
  const [showEdit, setShowEdit] = React.useState(false);
  const [error, setError] = React.useState({});

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {prop.card.name}
        </Typography>
        <Typography>Name : {prop.card.name}</Typography>
        <Typography>Price : {prop.card.price}</Typography>
        <Typography>Rating : {prop.card.rating}</Typography>
        <Typography>{prop.card.veg}</Typography>
        <Typography>
          Add Ons:
          {prop.card.addOns.map((addOn, index) => (
            <li key={index}>
              {addOn.name} {addOn.price}
            </li>
          ))}
        </Typography>
        <Typography>
          Tags:
          {prop.card.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Button variant="contained" onClick={(e) => setShowEdit(!showEdit)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              axios
                .post("/api/food/deleteFood", prop.card)
                .then((res) => {
                  console.log("deleted");
                })
                .catch((err) => {
                  console.log(err.request.response);
                });
            }}
          >
            Delete
          </Button>
        </Grid>
      </CardActions>
      {showEdit && (
        <EditItem
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          card={prop.card}
        />
      )}
    </Card>
  );
}
