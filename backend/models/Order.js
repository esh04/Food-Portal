const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrderSchema = new Schema({
  quantity: {
    type: Number,
  },
  foodId: {
    type: String,
  },
  vendorID: {
    type: String,
  },
  addOns: {
    type: Array,
  },
  status: {
    type: Number,
    // 0 placed
    // 1 accepted
    // 2 cooking
    // 3 ready to pickup
    // 4 completed
    // 5 rejected
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
