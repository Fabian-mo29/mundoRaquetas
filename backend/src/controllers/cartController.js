const cart = require("../models/cartModel");

function getUserCart(req, res) {
  const userId = req.params.userId;
  cart.getUserCart(userId, (err, cart) => {
    if (err) {
      console.error("Error fetching cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(cart);
  });
}

module.exports = {
  getUserCart,
};
