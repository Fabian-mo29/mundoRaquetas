const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
router.use("/products", productRoutes);
router.use("/users", userRoutes);

module.exports = router;
