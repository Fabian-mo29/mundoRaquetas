process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const order = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const CryptoJS = require("crypto-js");
const { sql, connectionString } = require("../db");

const PAYMENT_API_URL = "https://localhost:5000/api";

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

function isPaymentInfoValid(paymentInfo) {
  return fetch(`${PAYMENT_API_URL}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CardNumber: paymentInfo.cardNumber,
      ExpirationDate: paymentInfo.expiryDate,
      Cvv: paymentInfo.securityCode,
      Currency: paymentInfo.moneda || "Colones",
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

async function createNewOrder(req, res) {
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

  let binValidation;
  try {
    binValidation = await isPaymentInfoValid(req.body.paymentInfo);
  } catch (error) {
    console.error("Error validating payment info:", error);
    return res
      .status(500)
      .json({ error: "Error: Could not validate payment information" });
  }

  if (!binValidation.valid) {
    return res.status(400).json({
      error: `Error: Invalid payment information ${binValidation.message}`,
    });
  }

  const hashed = hashPaymentInfo(req.body.paymentInfo);
  const paymentInfo = hashed.paymentInfo;
  if (!paymentInfo) {
    return res
      .status(500)
      .json({ error: "Error: Unable to hash payment information" });
  }

  cartModel.getActiveCart(req.Id, "Pendiente", (err, cartId) => {
    if (err) {
      return res.status(500).json({ error: "Error: Unable to retrieve cart" });
    }

    cartModel.getTotalPrice(cartId, (err2, precioBruto) => {
      if (err2) {
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
        (err3, orderId) => {
          if (err3) {
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
      cardNumber: paymentInfo.cardNumber,
      expiryDate: paymentInfo.expiryDate,
      securityCode: paymentInfo.securityCode,
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

function getSavedPaymentMethods(req, res) {
  const userId = req.Id;
  const query = `
    SELECT 
    ip.Id, 
    ip.NumeroTarjeta, 
    ip.FechaVencimiento, 
    ip.NombreTitular, 
    ip.Alias,
    ip.Provincia,
    ip.Canton,
    ip.InformacionUbicacion,
    ip.FechaVencimiento AS FechaVencimientoFormateada
    FROM InformacionPago ip
    JOIN TarjetasGuardadas tg ON tg.InformacionPagoId = ip.Id
    WHERE tg.UserId = ? AND tg.Activa = 1
  `;

  sql.query(connectionString, query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching saved payment methods:", err);
      return res
        .status(500)
        .json({ error: "Error al obtener las tarjetas guardadas" });
    }

    // Enmascarar los números de tarjeta para mostrar solo los últimos 4 dígitos
    const maskedResults = results.map((card) => ({
      ...card,
      MaskedNumber: `**** **** **** ${card.NumeroTarjeta.slice(-4)}`,
      FechaVencimiento: card.FechaVencimiento.includes("/")
        ? card.FechaVencimiento
        : `${card.FechaVencimiento.slice(0, 2)}/${card.FechaVencimiento.slice(
            2
          )}`,
    }));

    res.status(200).json(maskedResults);
  });
}

function savePaymentMethod(req, res) {
  const userId = req.Id;
  const { paymentInfo, saveForFuture, alias } = req.body;

  if (!paymentInfo || saveForFuture === undefined) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const validation = isValidOrderInfo(paymentInfo);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const hashedInfo = hashPaymentInfo(paymentInfo);

  // Primero creamos la información de pago
  const query = `
    INSERT INTO InformacionPago 
    (Provincia, Canton, InformacionUbicacion, NumeroTarjeta, FechaVencimiento, NumeroSeguridad, NombreTitular, Alias)
    OUTPUT INSERTED.Id
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    hashedInfo.paymentInfo.provincia,
    hashedInfo.paymentInfo.canton,
    hashedInfo.paymentInfo.infoUbicacion,
    hashedInfo.paymentInfo.cardNumber,
    hashedInfo.paymentInfo.expiryDate,
    hashedInfo.paymentInfo.securityCode,
    paymentInfo.cardHolder || "Titular no especificado",
    alias || "Mi tarjeta",
  ];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error saving payment info:", err);
      return res
        .status(500)
        .json({ error: "Error al guardar la información de pago" });
    }

    const paymentInfoId = result[0].Id;

    if (saveForFuture) {
      // Guardar la tarjeta para futuros pagos
      const saveQuery = `
        INSERT INTO TarjetasGuardadas (UserId, InformacionPagoId, Activa)
        VALUES (?, ?, 1)
      `;

      sql.query(connectionString, saveQuery, [userId, paymentInfoId], (err) => {
        if (err) {
          console.error("Error saving card for future:", err);
          return res
            .status(500)
            .json({ error: "Error al guardar la tarjeta para futuros pagos" });
        }

        // Solo después de guardar la tarjeta, creamos la orden
        createNewOrder(req, res);
      });
    } else {
      // Si no se guarda para futuro, solo creamos la orden
      createNewOrder(req, res);
    }
  });
}

function deleteSavedPaymentMethod(req, res) {
  const userId = req.Id;
  const { cardId } = req.params;

  const query = `
    DELETE FROM TarjetasGuardadas 
    WHERE UserId = ? AND InformacionPagoId = ?
  `;

  sql.query(connectionString, query, [userId, cardId], (err, result) => {
    if (err) {
      console.error("Error deleting payment method:", err);
      return res
        .status(500)
        .json({ error: "Error al eliminar la tarjeta guardada" });
    }

    if (result.rowsAffected === 0) {
      return res
        .status(404)
        .json({ error: "Tarjeta no encontrada o no pertenece al usuario" });
    }

    res.status(200).json({ message: "Tarjeta eliminada correctamente" });
  });
}

module.exports = {
  createNewOrder,
  getAllUserOrders,
  getActiveOrders,
  getOrderProducts,
  getSavedPaymentMethods,
  savePaymentMethod,
  deleteSavedPaymentMethod,
};
