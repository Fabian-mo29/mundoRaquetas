const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/", auth.verifyToken, cartController.getUserCart);
router.post("/:product", auth.verifyToken, cartController.addToCart);

module.exports = router;
