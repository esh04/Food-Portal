const express = require("express");
const router = express.Router();

// Load input validation
const validateFoodItem = require("../../validation/foodItem");

// Load models
const Food = require("../../models/Food");
const Vendor = require("../../models/Vendor");
const Buyer = require("../../models/Buyer");

const { ObjectId } = require("mongodb");
const Order = require("../../models/Order");

router.post("/addFood", (req, res) => {
  Food.findOne({ name: req.body.name, vendorID: req.body.vendorID }).then(
    (food) => {
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
  Food.findOne({ name: req.body.name, vendorID: req.body.vendorID }).then(
    (food) => {
      if (!food) {
        return res.status(400).json({ food: "Item doesn't exists" });
      } else {
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
    }
  );
});

router.post("/deleteFood", (req, res) => {
  Food.deleteOne({ _id: req.body._id }, function (err) {
    if (err) return console.log(err);
    return res.json({ success: true });
  });
});

router.post("/getFood", (req, res) => {
  Food.find({ vendorID: req.body.id }).then((food) => {
    if (!food) {
      return res.status(400).json({ food: "Item doesn't exists" });
    } else {
      return res.json(food);
    }
  });
});

router.post("/getSingleFood", (req, res) => {
  Food.findOne({ _id: req.body.foodId, vendorID: req.body.id }).then((food) => {
    if (!food) {
      return res.status(400).json({ food: "Item doesn't exists" });
    } else {
      return res.json(food);
    }
  });
});

router.get("/displayFood", (req, res) => {
  Food.find().then(async (food) => {
    if (!food) {
      return res.status(400).json({ display: "No items to display" });
    }

    let tempFood = [];

    await Promise.all(
      food.map(async (foodItem, index) => {
        const user = await User.findOne({ _id: ObjectId(foodItem.vendorID) });
        const vendor = await Vendor.findOne({ email: user.email });
        tempFood.push({
          _id: foodItem._id,
          name: foodItem.name,
          price: foodItem.price,
          rating: foodItem.rating,
          veg: foodItem.veg,
          addOns: foodItem.addOns,
          tags: foodItem.tags,
          vendorName: vendor.managerName,
        });
      })
    );

    return res.json(tempFood);
  });
});

router.checkout("/placeOrder", (req, res) => {
  const newOrder = new Order({
    quantity: req.body.quantity,
    foodId: req.body.foodId,
    buyerId: req.body.buyerId,
    addOns: req.body.addOns,
    status: 0,
  });

  newOrder.save().catch((err) => console.log(err));
});

router.checkout("/getOrders", (req, res) => {
  if (req.body.role == "buyer") {
    Order.findAll({ buyerId: req.body.id }).then((order) => {
      if (!order) {
        return res.status(400).json({ display: "No orders to display" });
      }
      return res.json(order);
    });
  }
  // write for vendor
});

router.checkout("/stageChange", (req, res) => {
  req.body.stage = req.body.stage + 1;
  return res.json(req.body);
});

module.exports = router;
