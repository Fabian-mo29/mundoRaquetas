const Product = require("../models/productModel");

const getAllProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(products);
  });
};

const getProductById = (req, res) => {
  Product.getProductById(req.params.id, (err, product) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
