const { sql, connectionString } = require("../db");

function createNewOrder(
  cartId,
  precioBruto,
  precioNeto,
  paymentInfo,
  callback
) {
  createPaymentInfo(paymentInfo, (err, paymentInfoId) => {
    if (err) {
      return callback(err, null);
    }
    const query =
      "INSERT INTO Ordenes (CarritoId, PrecioBruto, PrecioNeto, InformacionPagoId) " +
      "VALUES (?, ?, ?, ?)";

    sql.query(
      connectionString,
      query,
      [cartId, precioBruto, precioNeto, paymentInfoId],
      (err2, result) => {
        if (err2) {
          console.error("Error creating order:", err2);
          return callback(err2, null);
        }
        return callback(null, result);
      }
    );
  });
}

function createPaymentInfo(paymentInfo, callback) {
  const query =
    "INSERT INTO InformacionPago(Provincia, Canton, InformacionUbicacion, NumeroTarjeta, FechaVencimiento, NumeroSeguridad) " +
    "OUTPUT INSERTED.Id " +
    "VALUES (?, ?, ?, ?, ?, ?)";

  sql.query(
    connectionString,
    query,
    [
      paymentInfo.provincia,
      paymentInfo.canton,
      paymentInfo.infoUbicacion,
      paymentInfo.cardNumber,
      paymentInfo.expiryDate,
      paymentInfo.securityCode,
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const paymentInfoId = result[0]?.Id;
      if (!paymentInfoId) {
        return callback(
          new Error("No se pudo obtener el ID de InformacionPago."),
          null
        );
      }
      return callback(null, paymentInfoId);
    }
  );
}

function getActiveOrders(userId, callback) {
  const query =
    "SELECT o.Id, o.NumeroOrden, o.Fecha, o.PrecioBruto, o.PrecioNeto, COUNT(o.Id) as CantidadProductos FROM ProductosPorCarrito ppc " +
    "JOIN Carrito c on c.Id = ppc.CarritoId JOIN Ordenes o on o.CarritoId = c.Id " +
    "WHERE o.Estado = 'Pendiente' AND c.UserId = ? " +
    "GROUP BY o.Id, o.NumeroOrden, o.Fecha, o.PrecioBruto, o.PrecioNeto;";
  sql.query(connectionString, query, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  createNewOrder,
  getActiveOrders,
};
