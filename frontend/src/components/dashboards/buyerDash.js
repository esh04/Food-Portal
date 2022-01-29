import * as React from "react";
import Fuse from "fuse.js";
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

export default function BuyerDashboard() {
  let id = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = React.useState({});
  const [foodItems, setFoodItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState({ tags: [], shopNames: [] });
  const [filter, setFilter] = React.useState({
    search: "",
    veg: ["veg", "nonveg"],
    tags: [],
    shopNames: [],
    max: 999,
    min: 0,
    choice: "price",
    asc: "1",
  });

  React.useEffect(() => {
    axios
      .post("/api/users/getUser", { id: id })
      .then((res) => {
        setUserDetails(res.data.details);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/food/displayFood")
      .then((res) => {
        let tempTags = [];
        setFoodItems(res.data);
        res.data.forEach((foodItem, index) => {
          let tempArray = foodItem.tags.filter(
            (item) => !tempTags.find((tag) => tag == item)
          );
          tempTags.push(...tempArray);
        });
        setOptions({ tags: tempTags, shopNames: [] });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const showFoodItems = () => {
    const fuse = new Fuse(foodItems, { keys: ["name"] });
    const results = fuse.search(filter.search);
    const characterResults = filter.search
      ? results.map((result) => result.item)
      : foodItems;

    return characterResults
      .sort(
        (item1, item2) =>
          (item1[filter.choice] - item2[filter.choice]) * parseInt(filter.asc)
      )
      .filter(
        (item) =>
          (!filter.max || item.price <= filter.max) &&
          item.price >= filter.min &&
          filter.veg.includes(item.veg) &&
          (filter.tags.length === 0 ||
            filter.tags.some((r) => item.tags.includes(r)))
      )
      .map((card) => (
        <Grid item key={card._id} xs={12} sm={6} md={3}>
          <ItemCard card={card} />
        </Grid>
      ));
  };

  return (
    <>
      {loading ? (
        <Typography>Loading Data</Typography>
      ) : (
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
                filter={filter}
                setFilter={setFilter}
                options={options}
              />
              <Container>
                <Grid container spacing={4}>
                  {showFoodItems()}
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

              {userDetails.wallet && (
                <Wallet
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              )}
              <Grid sx={{ paddingTop: 5 }}>
                <Typography variant="h4">Favourites</Typography>
                <Grid container spacing={4}>
                  {/* {cards.map((card) => (
                  <Grid item key={card} sx={{ padding: 1 }}>
                    <ItemCard card={card} options={options} />
                  </Grid>
                ))} */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
