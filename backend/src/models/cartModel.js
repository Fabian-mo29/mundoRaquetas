const { sql, connectionString } = require("../db");

function getActiveCart(userId, callback) {
  const query =
    "SELECT TOP 1 Id FROM Carrito WHERE UserId = ? AND Estado = 'Pendiente'";
  sql.query(connectionString, query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length > 0) {
      return callback(null, result[0].Id);
    } else {
      return callback(err, null);
    }
  });
}

function createCart(userId, callback) {
  const query = "INSERT INTO Carrito(UserId, Estado) VALUES (?, 'Pendiente')";
  sql.query(connectionString, query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    const selectQuery =
      "SELECT TOP 1 Id FROM Carrito WHERE UserId = ? AND Estado = 'Pendiente' ORDER BY Id DESC";
    sql.query(connectionString, selectQuery, [userId], (err2, result2) => {
      if (err2) {
        return callback(err2, null);
      }
      return callback(null, result2[0].Id);
    });
  });
}

function addToCart(userId, product, callback) {
  getActiveCart(userId, (err, cartId) => {
    if (err) return callback(err, null);

    if (cartId) {
      insertProduct(cartId, product, callback);
    } else {
      createCart(userId, (err2, newCartId) => {
        if (err2) return callback(err2, null);
        insertProduct(newCartId, product, callback);
      });
    }
  });
}

function insertProduct(cartId, product, callback) {
  // Se verifica si el producto ya está agregado en el carrito
  const checkQuery =
    "SELECT Cantidad FROM ProductosPorCarrito WHERE CarritoId = ? AND ProductoId = ?";
  sql.query(
    connectionString,
    checkQuery,
    [cartId, product.Id],
    (err, result) => {
      if (err) return callback(err, null);

      if (result.length > 0) {
        // Si el producto ya está en el carrito, se suma la cantidad
        const newCantidad = result[0].Cantidad + product.Cantidad;
        const updateQuery =
          "UPDATE ProductosPorCarrito SET Cantidad = ? WHERE CarritoId = ? AND ProductoId = ?";
        sql.query(
          connectionString,
          updateQuery,
          [newCantidad, cartId, product.Id],
          (err2, result2) => {
            if (err2) return callback(err2, null);
            return callback(null, result2);
          }
        );
      } else {
        // Si no existe el producto, hace un insert normal
        const insertQuery =
          "INSERT INTO ProductosPorCarrito (CarritoId, ProductoId, Cantidad) VALUES (?, ?, ?)";
        sql.query(
          connectionString,
          insertQuery,
          [cartId, product.Id, product.Cantidad],
          (err3, result3) => {
            if (err3) return callback(err3, null);
            return callback(null, result3);
          }
        );
      }
    }
  );
}

function getCartByUserId(userId, callback) {
  getActiveCart(userId, (err, cartId) => {
    if (err) return callback(err, null);

    const query =
      "SELECT p.Id, p.Name, p.Description, p.Price, p.Discount, p.Category, i.Name AS ImageName, ppc.Cantidad " +
      "FROM ProductosPorCarrito ppc " +
      "JOIN Productos p ON ppc.ProductoId = p.Id " +
      "JOIN Imagen i on i.ProductoId = p.Id " +
      "WHERE ppc.CarritoId = ?";

    sql.query(connectionString, query, [cartId], (err2, result) => {
      if (err2) return callback(err2, null);
      return callback(null, result);
    });
  });
}

function getTotalPrice(cartId, callback) {
  const query =
    "SELECT SUM(p.Price * ppc.Cantidad) AS Total FROM ProductosPorCarrito ppc JOIN Productos p " +
    "on p.Id = ppc.ProductoId WHERE ppc.CarritoId = ?;";
  sql.query(connectionString, query, [cartId], (err, result) => {
    if (err) return callback(err, null);
    return callback(null, result[0].Total);
  });
}

function removeProductFromCart(cartId, productId, callback) {
  const query =
    "DELETE FROM ProductosPorCarrito WHERE CarritoId = ? AND ProductoId = ?";
  sql.query(connectionString, query, [cartId, productId], (err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
}

module.exports = {
  getCartByUserId,
  getActiveCart,
  addToCart,
  getTotalPrice,
  removeProductFromCart,
};
