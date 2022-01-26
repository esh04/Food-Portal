import "./App.css";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

// importing components from react-router package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login component
import Login from "./components/auth/login";
// import Register component
import Register from "./components/auth/register";
// import Vendor dashboard
import VendorDashboard from "./components/dashboards/vendorDash";
// import Buyer dashboard
import BuyerDashboard from "./components/dashboards/buyerDash";
// import Profile dashboard
import Profile from "./components/dashboards/profileDash";

function App() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Food Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendor/:id" element={<VendorDashboard />} />
          <Route path="/buyer/:id" element={<BuyerDashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
