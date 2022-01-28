import * as React from "react";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";

export default function filters(prop) {
  return (
    <>
      <TextField
        sx={{
          marginBottom: 3,
        }}
        fullWidth
        id="searchItem"
        value={prop.searchItem}
        label="Search Bar"
        onChange={(e) => prop.setSearchItem(e.target.value)}
      />

      <Grid container>
        <Grid item xs={12} sm={8} md={10}>
          <Grid container sx={{ paddingBottom: 5 }}>
            <Grid>
              <FormLabel>Tags</FormLabel>
              <Select isMulti options={prop.options} />
            </Grid>
            <Grid sx={{ paddingLeft: 2 }}>
              <FormLabel>Shop Names</FormLabel>
              <Select isMulti options={prop.options} />
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
                value={prop.maxPrice}
                onChange={(e) => prop.setMaxPrice(e)}
              />
            </Grid>
            <Grid sx={{ paddingLeft: 2 }}>
              <TextField
                required
                name="minPrice"
                label="Min Price"
                type="number"
                id="minPrice"
                value={prop.minPrice}
                onChange={(e) => prop.setMinPrice(e)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
