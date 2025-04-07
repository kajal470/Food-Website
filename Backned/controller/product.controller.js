const Product = require("../model/product.Model.js")
const uploadOnCloudinary = require("../utils/cloudinary.js");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ message: "All products fetched", data: allProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const file = req.file;
  

    if (!file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const imageUrl = await uploadOnCloudinary(file);

    const newProduct = new Product({
      name,
      price,
      category,
      image: imageUrl || "",
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", data: newProduct });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductById
};
