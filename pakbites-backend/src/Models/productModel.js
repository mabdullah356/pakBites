const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  items:{type:Array,required:false},
  totalItems:{type:String,required:false},
}, {
  timestamps: true
});


const product=mongoose.model("Product", productSchema);

module.exports = product;