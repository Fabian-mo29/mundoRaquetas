const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/", auth.verifyToken, cartController.getUserCart);
router.post("/", auth.verifyToken, cartController.addToCart);
router.post("/wishlist", auth.verifyToken, cartController.addToWishlist);
router.get("/wishlist", auth.verifyToken, cartController.getWishlist);
router.delete("/:idProduct", auth.verifyToken, cartController.removeFromCart);
router.get("/total", auth.verifyToken, cartController.getTotalPrice);

module.exports = router;
