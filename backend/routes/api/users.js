const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInputBuyer = require("../../validation/register-buyer");
const validateRegisterInputVendor = require("../../validation/register-vendor");
const validateLoginInput = require("../../validation/login");

// Load models
const Buyer = require("../../models/Buyer");
const Vendor = require("../../models/Vendor");
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register users
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      if (req.body.role == "vendor") {
        // Form validation
        const { errors, isValid } = validateRegisterInputVendor(req.body);
        // Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newVendor = new Vendor({
          managerName: req.body.managerName,
          shopName: req.body.shopName,
          email: req.body.email,
          contact: req.body.contact,
          openTime: req.body.openTime,
          closeTime: req.body.closeTime,
        });

        newVendor.save().catch((err) => console.log(err));
      } else if (req.body.role == "buyer") {
        // Form validation

        const { errors, isValid } = validateRegisterInputBuyer(req.body);

        if (!isValid) {
          // Check validation
          return res.status(400).json(errors);
        }
        const newBuyer = new Buyer({
          name: req.body.name,
          email: req.body.email,
          batch: req.body.batch,
          contact: req.body.contact,
          age: req.body.age,
        });

        newBuyer.save().catch((err) => console.log(err));
      }

      // if no errors make a new user
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
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
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
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
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
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
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
