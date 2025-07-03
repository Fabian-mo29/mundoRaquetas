const { sql, connectionString } = require("../db");

function createNewOrder(
  cartId,
  precioBruto,
  precioNeto,
  paymentInfo,
  callback
) {
  sql.open(connectionString, (err, conn) => {
    if (err) return callback(err, null);

    conn.beginTransaction((err) => {
      if (err) return callback(err, null);

      // Se obtienen los productos del carrito y el stock de cada producto
      const getProductsAndStockQuery =
        "SELECT ppc.ProductoId, ppc.Cantidad, pr.Stock " +
        "FROM ProductosPorCarrito ppc " +
        "JOIN Productos pr ON pr.Id = ppc.ProductoId " +
        "WHERE ppc.CarritoId = ?";
      conn.query(getProductsAndStockQuery, [cartId], (err3, products) => {
        if (err3) {
          return conn.rollback(() => callback(err3, null));
        }

        // Se revisa que exista stock suficiente para cada producto del carrito
        const outOfStock = products.find((item) => item.Cantidad > item.Stock);
        if (outOfStock) {
          return conn.rollback(() =>
            callback(
              new Error(
                `No hay suficiente stock para el producto seleccionado. Stock disponible: ${outOfStock.Stock}, solicitado: ${outOfStock.Cantidad}`
              ),
              null
            )
          );
        }

        // Se crea la información de pago
        const paymentQuery =
          "INSERT INTO InformacionPago(Provincia, Canton, InformacionUbicacion, NumeroTarjeta, FechaVencimiento, NumeroSeguridad) " +
          "OUTPUT INSERTED.Id VALUES (?, ?, ?, ?, ?, ?)";
        conn.query(
          paymentQuery,
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
              return conn.rollback(() => callback(err, null));
            }
            const paymentInfoId = result[0]?.Id;
            if (!paymentInfoId) {
              return conn.rollback(() =>
                callback(
                  new Error("No se pudo obtener el ID de InformacionPago."),
                  null
                )
              );
            }

            // Se crear una nueva orden con el Id del carrito
            const orderQuery =
              "INSERT INTO Ordenes (CarritoId, PrecioBruto, PrecioNeto, InformacionPagoId) " +
              "VALUES (?, ?, ?, ?)";
            conn.query(
              orderQuery,
              [cartId, precioBruto, precioNeto, paymentInfoId],
              (err2, result2) => {
                if (err2) {
                  return conn.rollback(() => callback(err2, null));
                }

                let pending = products.length;
                if (pending === 0) {
                  return conn.commit((errCommit) => {
                    if (errCommit) return callback(errCommit, null);
                    callback(null, result2);
                  });
                }

                // Se actualiza el stock de los productos que tenía el carrito
                let errorOccurred = false;
                products.forEach((item) => {
                  const updateStockQuery =
                    "UPDATE Productos " +
                    "SET Stock = Stock - ? " +
                    "WHERE Id = ?";
                  conn.query(
                    updateStockQuery,
                    [item.Cantidad, item.ProductoId],
                    (err4) => {
                      if (errorOccurred) return;
                      if (err4) {
                        errorOccurred = true;
                        return conn.rollback(() => callback(err4, null));
                      }
                      pending--;
                      if (pending === 0) {
                        conn.commit((errCommit) => {
                          if (errCommit) return callback(errCommit, null);
                          callback(null, result2);
                        });
                      }
                    }
                  );
                });
              }
            );
          }
        );
      });
    });
  });
}

function getAllUserOrders(userId, callback) {
  const query =
    "SELECT o.Id, o.NumeroOrden, o.Fecha, o.FechaEstimadaLlegada, o.PrecioBruto, o.PrecioNeto, o.Estado, COUNT(o.Id) as CantidadProductos FROM ProductosPorCarrito ppc " +
    "JOIN Carrito c on c.Id = ppc.CarritoId JOIN Ordenes o on o.CarritoId = c.Id " +
    "WHERE c.UserId = ? " +
    "GROUP BY o.Id, o.NumeroOrden, o.Fecha, o.FechaEstimadaLlegada, o.PrecioBruto, o.PrecioNeto, o.Estado;";
  sql.query(connectionString, query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function getActiveOrders(userId, callback) {
  const query =
    "SELECT o.Id, o.NumeroOrden, o.Fecha, o.FechaEstimadaLlegada, o.PrecioBruto, o.PrecioNeto, COUNT(o.Id) as CantidadProductos FROM ProductosPorCarrito ppc " +
    "JOIN Carrito c on c.Id = ppc.CarritoId JOIN Ordenes o on o.CarritoId = c.Id " +
    "WHERE o.Estado = 'Pendiente' AND c.UserId = ? " +
    "GROUP BY o.Id, o.NumeroOrden, o.Fecha, o.FechaEstimadaLlegada, o.PrecioBruto, o.PrecioNeto;";
  sql.query(connectionString, query, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  createNewOrder,
  getAllUserOrders,
  getActiveOrders,
};
