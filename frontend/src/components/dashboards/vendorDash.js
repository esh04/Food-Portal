import * as React from "react";
import { useParams } from "react-router";
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

const cards = ["hello", "hi", "wassup", "mef", "hef"];
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

let addOns = [];
let tags = [];

export default function BuyerDashboard(prop) {
  let { id } = useParams();
  const [userDetails, setUserDetails] = React.useState({});
  const [addOnPrice, setAddOnPrice] = React.useState();
  const [addOnName, setAddOnName] = React.useState("");
  const [showAdd, setShowAdd] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [error, setError] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .post("/api/users/getUser", { id: id })
      .then((res) => {
        // console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
      .post("/api/users/addFood", newFoodItem)
      .then((res) => {
        navigate("/vendor/" + res._id);
      })
      .catch((err) => {
        setError(JSON.parse(err.request.response));
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
          <Grid xs={12} sm={8} md={10}>
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
                          tags.push(tag);
                          setTag("");
                        }}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Tag
                      </Button>
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
                          addOns.push({ name: addOnName, price: addOnPrice });
                          setAddOnPrice(0);
                          setAddOnName("");
                        }}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Add On
                      </Button>
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
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
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
                            Heading {card}
                          </Typography>

                          <Typography>Price:</Typography>
                          <Typography>Vendor:</Typography>
                        </CardContent>
                        <CardActions>
                          <Grid container>
                            <Button variant="contained">Edit</Button>
                            <Button variant="outlined">Delete</Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </Grid>

          <Grid xs={12} sm={4} md={2} sx={{ paddingTop: 2 }}>
            <Grid>
              <Button variant="contained">My Orders</Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/profile/" + id);
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
