const order = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const CryptoJS = require("crypto-js");

function isValidOrderInfo(paymentInfo) {
  const {
    cardNumber,
    expiryDate,
    securityCode,
    provincia,
    canton,
    infoUbicacion,
  } = paymentInfo;

  if (
    !cardNumber ||
    !expiryDate ||
    !securityCode ||
    !provincia ||
    !canton ||
    !infoUbicacion
  ) {
    return {
      valid: false,
      message: "Todos los campos de pago son obligatorios.",
    };
  }

  // Validar número de tarjeta: 13 a 19 dígitos
  if (!/^\d{13,19}$/.test(cardNumber)) {
    return { valid: false, message: "Número de tarjeta inválido." };
  }

  // Validar fecha: MM/AA
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    return { valid: false, message: "Formato de fecha inválido. Use MM/AA." };
  }

  // Validar CVV: 3 o 4 dígitos
  if (!/^\d{3,4}$/.test(securityCode)) {
    return { valid: false, message: "Código de seguridad inválido." };
  }

  // Validar provincia y cantón: letras y espacios
  const validText = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,30}$/;
  if (!validText.test(provincia)) {
    return { valid: false, message: "Provincia inválida." };
  }
  if (!validText.test(canton)) {
    return { valid: false, message: "Cantón inválido." };
  }

  // Validar información de ubicación: mínimo 5 caracteres
  if (infoUbicacion.length < 5) {
    return { valid: false, message: "Información de ubicación muy corta." };
  }

  return { valid: true };
}

function createNewOrder(req, res) {
  if (!req.Id) {
    return res.status(400).json({ error: "Error: User ID is required" });
  }
  if (!req.body.paymentInfo) {
    return res
      .status(400)
      .json({ error: "Error: Payment information is required" });
  }

  const validation = isValidOrderInfo(req.body.paymentInfo);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const paymentInfo = hashPaymentInfo(req.body.paymentInfo).paymentInfo;
  if (!paymentInfo) {
    return res
      .status(500)
      .json({ error: "Error: Unable to hash payment information" });
  }

  cartModel.getActiveCart(req.Id, "Pendiente", (err, cartId) => {
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
      const precioNeto = precioBruto + precioBruto * IVA + TRANSPORTE;
      order.createNewOrder(
        cartId,
        precioBruto,
        precioNeto,
        paymentInfo,
        (err, orderId) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error: Unable to create order" });
          }
          return res
            .status(200)
            .json({ message: "Order created successfully", orderId });
        }
      );
    });
  });
}

function getAllUserOrders(req, res) {
  order.getAllUserOrders(req.Id, (err, orders) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error: Unable to retrieve orders" });
    }
    return res.status(200).json(orders);
  });
}

function getActiveOrders(req, res) {
  order.getActiveOrders(req.Id, (err, orders) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error: Unable to retrieve orders" });
    }
    return res.status(200).json(orders);
  });
}

function hashPaymentInfo(paymentInfo) {
  return {
    paymentInfo: {
      cardNumber: CryptoJS.SHA256(paymentInfo.cardNumber).toString(),
      expiryDate: CryptoJS.SHA256(paymentInfo.expiryDate).toString(),
      securityCode: CryptoJS.SHA256(paymentInfo.securityCode).toString(),
      provincia: paymentInfo.provincia,
      canton: paymentInfo.canton,
      infoUbicacion: paymentInfo.infoUbicacion,
    },
  };
}

function getOrderProducts(req, res) {
  cartModel.getCartByOrderId(req.Id, req.params.orderId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error: unable to fetch products from order" });
    }
    res.status(200).json(result);
  });
}

module.exports = {
  createNewOrder,
  getAllUserOrders,
  getActiveOrders,
  getOrderProducts,
};
