const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInputBuyer = require("../../validation/register-buyer");
const validateRegisterInputVendor = require("../../validation/register-vendor");
const validateRegisterInput = require("../../validation/register-user");

const validateLoginInput = require("../../validation/login");

// Load models
const Buyer = require("../../models/Buyer");
const Vendor = require("../../models/Vendor");
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register users
// @access Public

router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } 
    else {
      const newUser = new User({
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
        });
      });

      if(req.body.role == 'vendor'){
        const newVendor = new Vendor({
          managerName: '',
          shopName: '',
          email: req.body.email,
          contact:'',
          password: req.body.password,
          openTime: new Date(),
          closeTime: new Date()
        });

        newVendor
            .save()
            .then(vendor => res.json(vendor))
            .catch(err => console.log(err));

      }
      else if (req.body.role == 'buyer'){
        const newBuyer = new Buyer({
          name: '',
          email: req.body.email,
          batch: '',
          contact: '',
          age: 0,
          password: req.body.password
        });

        newBuyer
            .save()
            .then(buyer => res.json(buyer))
            .catch(err => console.log(err));
      }
    }
  });
});

router.post("/register/buyer", (req, res) => {
    // Form validation
    
    const { errors, isValid } = validateRegisterInputBuyer(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    Buyer.findOne({ email: req.body.email }).then(buyer => {
    buyer.name = req.body.name,
    buyer.contact= req.body.contact,
    buyer.age = req.body.age,
    buyer.batch = req.body.batch;
    
    buyer
      .save()
      .then(buyer => res.json(buyer))
      .catch(err => console.log(err));

  });
});

router.post("/register/vendor", (req, res) => {
  // Form validation
  
  const { errors, isValid } = validateRegisterInputVendor(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  Vendor.findOne({ email: req.body.email }).then(vendor => {
    
    vendor.managerName = req.body.managerName,
    vendor.shopName = req.body.shopName,
    vendor.contact = req.body.contact,
    vendor.openTime = req.body.openTime,
    vendor.closeTime = req.body.closeTime;
     
    vendor
      .save()
      .then(vendor => res.json(vendor))
      .catch(err => console.log(err));

  });
});

// @route POST api/users/login
// @desc Login and return JWT token
// @access Public

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }// Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
         
          // Create JWT Payload
         
          const payload = {
            id: user.email,
          };
          
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });




module.exports = router;