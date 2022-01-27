import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

// Generate Order Data
function createData(
  id,
  placedTime,
  vendorName,
  foodItem,
  quantity,
  addOns,
  status,
  cost,
  rating
) {
  return {
    id,
    placedTime,
    vendorName,
    foodItem,
    quantity,
    addOns,
    status,
    cost,
    rating,
  };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44,
    43,
    43,
    43
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    43,
    43,
    43,
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    43,
    43,
    43,
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    43,
    43,
    43,
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    43,
    43,
    43,
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/vendor/");
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.placedTime}</TableCell>
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>{row.foodItem}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.addOns}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
