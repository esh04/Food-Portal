const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const BuyerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  batch: {
    type: String,
  },
  wallet: {
    type: Number,
    default: 0,
  },
});

module.exports = Buyer = mongoose.model("buyers", BuyerSchema);
