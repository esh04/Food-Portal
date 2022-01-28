import * as React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ItemCard from "../item-card-buyer";
import Filters from "../filters";
import Wallet from "../wallet";

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

    // axios
    //   .get("/api/food/displayFood")
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <Grid container>
          <Grid item xs={12} sm={8} md={10}>
            <Filters
              options={options}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              searchItem={searchItem}
              setSearchItem={setSearchItem}
            />
            <Container>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={3}>
                    <ItemCard card={card} options={options} />
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
                  navigate("/order-buyer");
                }}
              >
                My Profile
              </Button>
            </Grid>

            <Wallet />

            <Grid sx={{ paddingTop: 5 }}>
              <Typography variant="h4">Favourites</Typography>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} sx={{ padding: 1 }}>
                    <ItemCard card={card} options={options} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
