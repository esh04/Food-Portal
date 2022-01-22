import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Link, useNavigate } from "react-router-dom";

// for time
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

export default function Details(prop) {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      console.log({
      role: prop.role,
      contact: data.get('contact'),
      email: prop.email,
      password: prop.password,
      password2: prop.confirmPassword,

      shopName: data.get('shopName'),
      managerName: data.get('managerName'),
      closingTime: closeTime,
      openingTime: openTime,

      name: data.get('name'),
      age: data.get('age'),
      batch: data.get('batch'),


    });
  };

  const role = prop.role;
  const [batch, setBatch] = React.useState('');
  const [closeTime, setCloseTime] = React.useState(null);
  const [openTime, setOpenTime] = React.useState(null);

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

           {(role === 'vendor') ? ( 
           <>    
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="managerName"
                label="Manager Name"
                name="managerName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="shopName"
                label="Shop Name"
                name="shopName"
              />
            </Grid> 
            </>) : (
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
              />
            </Grid> )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="contact"
                label="Contact Number"
                name="contact"
              />
            </Grid>
            {(role == 'buyer') ? (
            <>
            <Grid item xs={12} sm={6}>
             <FormControl fullWidth>
                <InputLabel id="demo-simple-select-required-label">Batch</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  name="batch"
                  value={batch}
                  label="Batch"
                  onChange={handleChange}
                >
                  <MenuItem value={'UG1'}>UG1</MenuItem>
                  <MenuItem value={'UG2'}>UG2</MenuItem>
                  <MenuItem value={'UG3'}>UG3</MenuItem>
                  <MenuItem value={'UG4'}>UG4</MenuItem>
                  <MenuItem value={'UG5'}>UG5</MenuItem>

                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              <Grid/>
            </Grid>
          <Grid item xs={12} sm={6}>
                <TextField
                name="age"
                required
                fullWidth
                id="age"
                label="Age"
                />
            </Grid>
          </> ) : ( 
          <>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Open Time"
                    name="openingTime"
                    value={openTime}
                    onChange={(newOpenTime) => {
                    setOpenTime(newOpenTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
          </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Close Time"
                    value={closeTime}
                    name="closingTime"
                    onChange={(newCloseTime) => {
                    setCloseTime(newCloseTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </Grid>
            </>)}
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
     </Container>
  );
}