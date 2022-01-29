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
import Alert from "@mui/material/Alert";
import moment from "moment";

export default function ItemCard({ card, userDetails }) {
  const id = localStorage.getItem("userid");
  const navigate = useNavigate();
  // const [time, setTime] = React.useState(Date.now());
  //
  // React.useEffect(() => {
  // setTime(Date.now());
  // }, [Date.now()]);
  const [addOns, setAddOns] = React.useState(
    card.addOns.map((addOn) => {
      return { value: addOn.price, label: addOn.name };
    })
  );
  const [quantity, setQuantity] = React.useState(0);
  const [error, setError] = React.useState({});
  const buyItem = () => {
    if (quantity > 0) {
      const totalPrice =
        card.price +
        addOns.reduce((acc, addOn) => {
          return acc + parseInt(addOn.value);
        }, 0);

      const newOrder = {
        quantity: quantity,
        foodId: card._id,
        vendorID: card.vendorID,
        addOns: addOns,
        status: 0,
        price: totalPrice,
        email: userDetails.email,
        buyerID: id,
      };
      axios
        .post("/api/food/placeOrder", newOrder)
        .then((res) => {
          setError({ success: "Order Placed Successfully" });
        })
        .catch((err) => {
          setError(err.response);
        });
    } else setError({ quantity: "Invalid Quantity" });
  };
  return (
    <>
      {error.quantity && <Alert color="error">{error.quantity}</Alert>}
      {error.wallet && <Alert color="error">{error.wallet}</Alert>}
      {error.success && <Alert color="success">{error.success}</Alert>}

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
          <Typography>Shop Name: {card.vendorShopName}</Typography>
          <Typography>
            Open Time: {moment(card.vendorOpenTime).format("LT")}
          </Typography>
          <Typography>
            Close Time: {moment(card.vendorCloseTime).format("LT")}
          </Typography>
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
        {/* {moment(card.vendorOpenTime) */}
        {/* .format("LT") */}
        {/* .isBefore(moment(time).format("LT")) ? ( */}
        {2 > 1 ? (
          <Button variant="contained" onClick={() => buyItem()}>
            Buy
          </Button>
        ) : (
          <Button variant="contained" disabled onClick={() => buyItem()}>
            Buy
          </Button>
        )}
      </Grid>
    </>
  );
}
