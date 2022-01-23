const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Create Schema

const BuyerSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,

    // validate: {
        // check if contact is a valid phone number
        // validator: function(V){
        //     return /[0-9]{10}/.test(V);;
        // },
        // message: '{VALUE} is not a valid phone number.'
    // },
    // required: true

  },
  age: {
    type: Number,
    // min: [0, 'Enter valid age'],        
    required: true,

  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  batch: {
    type: String,
    // enum: {
    //     values: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5'],
    //     message: '{VALUE} is not supported'
    //   },
    // required: true
  },
  wallet: {
    type: Number,
    default: 0,
  },
}
);


module.exports = Buyer = mongoose.model("buyers", BuyerSchema);