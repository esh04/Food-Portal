import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function Checkout() {
  // const [password, setPassword] = React.useState("blah");
  const [tags, setTags] = React.useState([]);
  const [addOns, setAddOns] = React.useState([]);
  const [veg, setVeg] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [name, setName] = React.useState("");

  let id = localStorage.getItem("userid");

  const navigate = useNavigate();

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Item Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormHelperText>Email</FormHelperText>

              <TextField
                disabled
                fullWidth
                id="email"
                value={email}
                name="email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Manager Name</FormHelperText>

              <TextField
                required
                fullWidth
                id="managerName"
                value={managerName}
                name="managerName"
                variant="standard"
                onChange={(e) => {
                  setManagerName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Shop Name</FormHelperText>

              <TextField
                required
                fullWidth
                value={shopName}
                id="shopName"
                name="shopName"
                variant="standard"
                onChange={(e) => {
                  setShopName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Name</FormHelperText>

              <TextField
                required
                fullWidth
                id="name"
                value={name}
                name="name"
                variant="standard"
                autoComplete="name"
                onChange={(e) => {
                  name(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Contact</FormHelperText>

              <TextField
                required
                fullWidth
                id="contact"
                value={contact}
                variant="standard"
                name="contact"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-required-label">
                  Batch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  name="batch"
                  value={batch}
                  label="Batch"
                  onChange={(e) => {
                    setBatch(e.target.value);
                  }}
                >
                  <MenuItem value={"UG1"}>UG1</MenuItem>
                  <MenuItem value={"UG2"}>UG2</MenuItem>
                  <MenuItem value={"UG3"}>UG3</MenuItem>
                  <MenuItem value={"UG4"}>UG4</MenuItem>
                  <MenuItem value={"UG5"}>UG5</MenuItem>
                </Select>
              </FormControl>
              <Grid />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormHelperText>Age</FormHelperText>

              <TextField
                name="age"
                variant="standard"
                value={age}
                required
                fullWidth
                id="age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Button
          variant="contained"
          onClick={() => {
            if (role == "buyer") navigate("/buyer");
            else navigate("/vendor");
          }}
        >
          Back
        </Button>
      </Container>
    </>
  );
}
