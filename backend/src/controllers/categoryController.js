const Category = require("../models/categoryModel");

const getProductsByCategory = (req, res) => {
  Category.getProductsByCategory(req.params.category, (err, products) => {
    if (err) {
      console.error("Error fetching products by category:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.status(200).json(products);
  });
};

module.exports = {
  getProductsByCategory,
};
