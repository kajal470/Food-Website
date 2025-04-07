const express = require("express");
const router = express.Router();

// Controllers
const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} = require("../controller/product.controller.js");

// Middlewares
const uploadSingleImage = require("../middleware/upload.js");

// Routes
router.post("/", uploadSingleImage, addProduct);    // Add a new product
router.get("/", getAllProducts);                    // Get all products
router.get("/:id", getProductById);                 // Get single product by ID
router.delete("/:id", deleteProduct);               // Delete a product

module.exports = router;
