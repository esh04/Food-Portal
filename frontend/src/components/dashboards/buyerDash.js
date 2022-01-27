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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

const cards = ["hello", "hi", "wassup", "mef", "hef"];
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function BuyerDashboard() {
  let id = localStorage.getItem("userid");
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = React.useState({});
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [searchItem, setSearchItem] = React.useState("");
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    axios
      .post("/api/users/getUser", { id: id })
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
        <TextField
          sx={{
            marginBottom: 3,
          }}
          fullWidth
          id="searchItem"
          value={searchItem}
          label="Search Bar"
          onChange={(e) => setSearchItem(e.target.value)}
        />

        <Grid container>
          <Grid item xs={12} sm={8} md={10}>
            <Grid container sx={{ paddingBottom: 5 }}>
              <Grid>
                <FormLabel>Tags</FormLabel>
                <Select isMulti options={options} />
              </Grid>
              <Grid sx={{ paddingLeft: 2 }}>
                <FormLabel>Shop Names</FormLabel>
                <Select isMulti options={options} />
              </Grid>
              <Grid sx={{ paddingLeft: 2 }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Veg"
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Non Veg"
                />
              </Grid>
              <Grid sx={{ paddingLeft: 2 }}>
                <TextField
                  required
                  name="maxPrice"
                  label="Max Price"
                  type="number"
                  id="maxPrice"
                  onChange={(e) => setMaxPrice(e)}
                />
              </Grid>
              <Grid sx={{ paddingLeft: 2 }}>
                <TextField
                  required
                  name="minPrice"
                  label="Min Price"
                  type="number"
                  id="minPrice"
                  onChange={(e) => setMinPrice(e)}
                />
              </Grid>
            </Grid>
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
                          <ToggleButton
                            value="check"
                            selected={selected}
                            onChange={(e) => {
                              setSelected(!selected);
                              if (selected) {
                                e.target.style.backgroundColor = "red";
                              } else {
                                e.target.style.backgroundColor = "white";
                              }
                            }}
                          />
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

                      <Select isMulti options={options} />
                      <Button variant="contained">Buy</Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
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
            </Grid>
            <Card sx={{ paddingTop: 2 }}>
              <CardContent>
                <Typography variant="h4">Wallet</Typography>
                <Grid>
                  <TextField disabled value="0" name="wallet" />
                </Grid>

                <Grid>
                  <TextField
                    name="wallet"
                    type="number"
                    id="wallet"
                    label="Add Money"
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button variant="contained">Add</Button>
              </CardActions>
            </Card>
            <Grid sx={{ paddingTop: 5 }}>
              <Typography variant="h4">Favourites</Typography>

              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} sx={{ padding: 1 }}>
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

                      <Select isMulti options={options} />
                      <Button variant="contained">Buy</Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
}
