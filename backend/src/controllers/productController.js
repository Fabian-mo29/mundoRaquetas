const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
