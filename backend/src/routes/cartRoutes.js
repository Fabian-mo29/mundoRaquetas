const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/auth");

// router.get("/", verifyToken, cartController.getUserCart);
// router.post("/:product", verifyToken, cartController.addToCart);

module.exports = router;
