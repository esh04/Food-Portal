const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Create Schema

const FoodSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    veg: {
        type: Boolean
    },
    addOns: {
        type: Array
    },
    tags: {
        type: Array
    },
    // image: {
    //     type: String
    // },
}
);


module.exports = Food = mongoose.model("food", FoodSchema);