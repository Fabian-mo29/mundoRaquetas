const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/", auth.verifyToken, cartController.getUserCart);
router.post("/", auth.verifyToken, cartController.addToCart);
router.delete("/:idProduct", auth.verifyToken, cartController.removeFromCart);

module.exports = router;
