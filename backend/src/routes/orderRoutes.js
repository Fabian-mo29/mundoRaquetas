const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.post("/", auth.verifyToken, orderController.createNewOrder);
router.get("/active", auth.verifyToken, orderController.getActiveOrders);

module.exports = router;
