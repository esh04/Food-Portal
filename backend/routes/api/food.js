const express = require("express");
const router = express.Router();

// Load input validation
const validateFoodItem = require("../../validation/foodItem");

// Load models
const Food = require("../../models/Food");
const Vendor = require("../../models/Vendor");
const Buyer = require("../../models/Buyer");

const { ObjectId } = require("mongodb");

router.post("/addFood", (req, res) => {
  Food.findOne({ name: req.body.name, vendorID: req.body.vendorID }).then(
    (food) => {
      console.log(food);

      if (food) {
        return res.status(400).json({ food: "Item already exists" });
      } else {
        const { errors, isValid } = validateFoodItem(req.body);
        // Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newFood = new Food({
          name: req.body.name,
          price: req.body.price,
          rating: req.body.rating,
          veg: req.body.veg,
          addOns: req.body.addOns,
          tags: req.body.tags,
          vendorID: req.body.vendorID,
        });

        newFood
          .save()
          .then((food) => res.json(food))
          .catch((err) => console.log(err));
      }
    }
  );
});

router.post("/editFood", (req, res) => {
  Food.findOne({ _id: req.body.id }).then((food) => {
    if (!food) {
      return res.status(400).json({ food: "Item doesn't exists" });
    } else {
      const { errors, isValid } = validateFoodItem(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      food.name = req.body.name;
      food.price = req.body.price;
      food.rating = req.body.rating;
      food.veg = req.body.veg;
      food.addOns = req.body.addOns;
      food.tags = req.body.tags;
      food
        .save()
        .then((food) => res.json(food))
        .catch((err) => res.status(400).json(err));
    }
  });
});

router.post("/deleteFood"),
  (req, res) => {
    Food.deleteOne({ _id: req.body._id }, function (err) {
      if (err) return console.log(err);
      return res.json({ success: true });
    });
  };

router.post("/getFood", (req, res) => {
  Food.find({ vendorID: req.body.id }).then((food) => {
    if (!food) {
      // if vendor has no items return empty json
      return "No food items found";
    } else {
      return res.json(food);
    }
  });
});

module.exports = router;
