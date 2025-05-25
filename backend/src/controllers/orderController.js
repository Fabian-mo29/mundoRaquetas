const order = require("../models/orderModel");
const cartModel = require("../models/cartModel");

function createNewOrder(req, res) {
  cartModel.getActiveCart(req.userId, (err, cartId) => {
    if (err) {
      return res.status(500).json({ error: "Error: Unable to retrieve cart" });
    }
    cartModel.getTotalPrice(cartId, (err, precioBruto) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error: Unable to retrieve cart price" });
      }
      if (precioBruto === 0) {
        return res
          .status(400)
          .json({ error: "Error: Cart is empty, cannot create order" });
      }
      const IVA = 0.13;
      const TRANSPORTE = 5;
      // Se calcula el precio neto con el precio bruto, IVA y transporte
      const precioNeto = precioBruto + precioBruto * IVA + TRANSPORTE;
      order.createNewOrder(cartId, precioBruto, precioNeto, (err, orderId) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error: Unable to create order" });
        }
        return res
          .status(200)
          .json({ message: "Order created successfully", orderId });
      });
    });
  });
}

module.exports = {
  createNewOrder,
};
