import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function OrderBuyer({ userDetails }) {
  const status = {
    0: "Placed",
    1: "Accepted",
    2: "Cooking",
    3: "Ready for Pickup",
    4: "Completed",
    5: "Rejected",
  };
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [error, setErrors] = React.useState({});
  const id = localStorage.getItem("userid");
  React.useEffect(() => {
    axios
      .post("/api/food/getOrders", { id: id, role: "buyer" })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        setErrors(err.response);
      });
  }, [id]);

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/buyer/");
        }}
      >
        Back
      </Button>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Orders
        </Typography>
        {error.display && <Alert color="error">{error.display}</Alert>}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Placed Time</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Food Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Add Ons</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Rating</TableCell>

              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{moment(row.placedTime).format("LT")}</TableCell>
                <TableCell>vendor name</TableCell>
                <TableCell>food item</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  {row.addOns.map((addOn, index) => (
                    <li key="index">{addOn.label}</li>
                  ))}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>rating</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
