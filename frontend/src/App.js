import './App.css';
import * as React from 'react';

// importing components from react-router package
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
  
// import Login component
import Login from "./components/auth/login";
// import Register component
import Register from "./components/auth/register";
//import Details component
import Details from "./components/auth/details";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Register/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/details" element={<Details/>} /> */}

      </Routes>
    </Router>
    </>
  );
}

export default App;
