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

export default function BuyerDashboard(prop) {
  return (
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
    
  );
}
