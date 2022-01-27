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

  const handleNewItem = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newFoodItem = {
      name: data.get("name"),
      price: data.get("price"),
      rating: 0,
      veg: data.get("radio-buttons-group"),
      addOns: addOns,
      tags: tags,
      vendorID: id,
    };
    axios
      .post("http://localhost:5000/api/food/addFood", newFoodItem)
      .then((res) => {
        setShowAdd(false);
      })
      .catch((err) => {
        setError(err.request);
      });
  };
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
            {showAdd ? (
              <Grid container>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleNewItem}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                      />
                    </Grid>
                    {error.name && <Alert color="error">{error.name}</Alert>}

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        id="price"
                        label="Price"
                        name="price"
                      />
                    </Grid>
                    {error.price && <Alert color="error">{error.price}</Alert>}

                    <Grid item xs={12}>
                      <TextField
                        id="tag"
                        label="Tag"
                        name="tag"
                        value={tag}
                        onChange={(e) => {
                          setTag(e.target.value);
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (tag == null || tag == "") {
                            return setErrorTag("Tag field is empty");
                          } else {
                            tags.push(tag);
                            setTag("");
                          }
                        }}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Tag
                      </Button>
                      {errorTag && <Alert color="error">{errorTag}</Alert>}

                      <Grid>
                        <Typography>
                          {tags.map((tag) => (
                            <li>{tag} </li>
                          ))}
                        </Typography>
                      </Grid>
                    </Grid>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Veg/Non-Veg
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="veg"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="veg"
                          control={<Radio />}
                          label="Veg"
                        />
                        <FormControlLabel
                          value="nonveg"
                          control={<Radio />}
                          label="Non-Veg"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Grid item xs={12}>
                      <FormHelperText>Add Ons</FormHelperText>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="addonName"
                          id="addonName"
                          label="Name"
                          value={addOnName}
                          onChange={(e) => {
                            setAddOnName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="addonPrice"
                          id="addonPrice"
                          label="Price"
                          type="Number"
                          value={addOnPrice}
                          onChange={(e) => {
                            setAddOnPrice(e.target.value);
                          }}
                        />
                      </Grid>
                      <Button
                        onClick={() => {
                          if (addOnName == null || addOnName == "") {
                            return setErrorAddOn("Name field is required");
                          } else if (addOnPrice == null || addOnPrice == "") {
                            return setErrorAddOn("Price field is required");
                          } else if (addOnPrice <= 0)
                            return setErrorAddOn(
                              "Price must be greater than 0"
                            );
                          else if (!addOnPrice.match(["[0-9]+"]))
                            return setErrorAddOn("Invalid Price");
                          else {
                            addOns.push({ name: addOnName, price: addOnPrice });
                            setAddOnPrice(0);
                            setAddOnName("");
                          }
                        }}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Add On
                      </Button>
                      {errorAddOn && <Alert color="error">{errorAddOn}</Alert>}

                      <Grid>
                        <Typography>
                          {addOns.map((addOn) => (
                            <li>
                              {addOn.name} {addOn.price}
                            </li>
                          ))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Item
                  </Button>
                </Box>
              </Grid>
            ) : (
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
                            {card.addOns.map((addOn, index) => (
                              <li key={index}>
                                {addOn.name} {addOn.price}
                              </li>
                            ))}
                          </Typography>
                          <Typography>
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
            )}
          </Grid>

          <Grid item xs={12} sm={4} md={2} sx={{ paddingTop: 2 }}>
            <Grid>
              <Button variant="contained">My Orders</Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                My Profile
              </Button>
              <Button variant="outlined">My Stats</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
}
