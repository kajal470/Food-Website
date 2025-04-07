const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String, // You could use Number if you're doing calculations
    required: true,
  }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
