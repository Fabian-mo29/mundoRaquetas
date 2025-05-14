const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);

module.exports = router;
