const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrderSchema = new Schema({
  quantity: {
    type: Number,
  },
  foodId: {
    type: Number,
  },
  buyerId: {
    type: String,
  },
  addOns: {
    type: Array,
  },
  status: {
    type: String,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
