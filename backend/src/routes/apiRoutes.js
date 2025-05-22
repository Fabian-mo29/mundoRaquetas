const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
