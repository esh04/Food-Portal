import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { FormHelperText, FormLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import AddItem from "../addFood";

let tags = [];
let addOns = [];

export default function BuyerDashboard(prop) {
  let id = localStorage.getItem("userid");
  const [userFood, setUserFood] = React.useState([]);
  const [addOnPrice, setAddOnPrice] = React.useState();
  const [addOnName, setAddOnName] = React.useState("");
  const [showAdd, setShowAdd] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [error, setError] = React.useState({});
  const [errorFood, setErrorFood] = React.useState("");
  const [errorTag, setErrorTag] = React.useState("");
  const [errorUser, setErrorUser] = React.useState("");
  const [errorAddOn, setErrorAddOn] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .post("/api/food/getFood", { id: id })
      .then((res) => {
        setUserFood(res.data);
      })
      .catch((err) => {
        setErrorFood(JSON.parse(err.request.response));
      });
  }, [id, showAdd]);

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
          marginRight: 10,
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Container> */}

        <Grid container>
          <Grid item xs={12} sm={8} md={10}>
            <Grid container>
              <Button
                variant="contained"
                onClick={() => {
                  setShowAdd(!showAdd);
                }}
              >
                Add Item
              </Button>
            </Grid>
            {showAdd && <AddItem showAdd={showAdd} setShowAdd={setShowAdd} />}
            <Container>
              <Grid container spacing={4}>
                {errorUser && <Alert color="error">{errorUser}</Alert>}
                {errorFood && <Alert color="error">{errorFood}</Alert>}

                {userFood.map((card) => (
                  <Grid item key={card._id} xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                        <Typography>Name : {card.name}</Typography>
                        <Typography>Price : {card.price}</Typography>
                        <Typography>Rating : {card.rating}</Typography>
                        <Typography>{card.veg}</Typography>
                        <Typography>
                          {" "}
                          Add Ons:
                          {card.addOns.map((addOn, index) => (
                            <li key={index}>
                              {addOn.name} {addOn.price}
                            </li>
                          ))}
                        </Typography>
                        <Typography>
                          {" "}
                          Tags:
                          {card.tags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                          ))}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Grid container>
                          <Button variant="contained">Edit</Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              axios
                                .post("/api/users/deleteFood", id)
                                .then((res) => {
                                  navigate("/vendor");
                                })
                                .catch((err) => {
                                  setError(JSON.parse(err.request.response));
                                });
                            }}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ paddingTop: 2 }}>
            <Grid>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/order-vendor");
                }}
              >
                My Orders
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                My Profile
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/stats");
                }}
              >
                My Stats
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
}
