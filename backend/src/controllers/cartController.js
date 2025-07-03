const cart = require("../models/cartModel");

function getUserCart(req, res) {
  const userId = req.Id;
  cart.getCartByUserId(userId, "Pendiente", (err, cart) => {
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
  cart.addToCart(userId, product, "Pendiente", (err, result) => {
    if (err) {
      console.error("Error inserting product to cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
}

function removeFromCart(req, res) {
  const userId = req.Id;
  const { idProduct } = req.params;
  cart.getActiveCart(userId, "Pendiente", (err, cartId) => {
    if (err) {
      console.error("Error fetching active cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!cartId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.removeProductFromCart(cartId, idProduct, (err2, result) => {
      if (err2) {
        console.error("Error removing product from cart:", err2);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json(result);
    });
  });
}

function getTotalPrice(req, res) {
  const userId = req.Id;
  cart.getActiveCart(userId, "Pendiente", (err, cartId) => {
    if (err) {
      console.error("Error fetching active cart:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!cartId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.getTotalPrice(cartId, (err2, result) => {
      if (err2) {
        console.error("Error calculating total price of the cart:", err2);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json(result);
    });
  });
}

function addToWishlist(req, res) {
  const { product } = req.body;
  const userId = req.Id;

  cart.addToCart(userId, product, "Deseos", (err, result) => {
    if (err) {
      console.error("Error inserting product to wishlist:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
}

function getWishlist(req, res) {
  const userId = req.Id;
  cart.getCartByUserId(userId, "Deseos", (err, cart) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(cart);
  });
}

module.exports = {
  getUserCart,
  addToCart,
  addToWishlist,
  removeFromCart,
  getTotalPrice,
  getWishlist,
};
