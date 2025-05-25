const cart = require("../models/cartModel");

function getUserCart(req, res) {
  const userId = req.Id;
  cart.getCartByUserId(userId, (err, cart) => {
    if (err) {
      console.error("Error fetching cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(cart);
  });
}

function addToCart(req, res) {
  const { product } = req.body;
  const userId = req.Id;
  cart.addToCart(userId, product, (err, result) => {
    if (err) {
      console.error("Error inserting product to cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
}

module.exports = {
  getUserCart,
  addToCart,
};
