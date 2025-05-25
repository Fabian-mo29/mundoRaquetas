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
  const query =
    "INSERT INTO ProductosPorCarrito (CarritoId, ProductoId, Cantidad) VALUES (?, ?, ?)";
  sql.query(
    connectionString,
    query,
    [cartId, product.Id, product.Cantidad],
    (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    }
  );
}

function getCartByUserId(userId, callback) {
  getActiveCart(userId, (err, cartId) => {
    if (err) return callback(err, null);

    const query =
      "SELECT p.Name, p.Description, p.Price, p.Discount, p.Category " +
      "FROM ProductosPorCarrito ppc " +
      "JOIN Productos p ON ppc.ProductoId = p.Id " +
      "WHERE ppc.CarritoId = ?";

    sql.query(connectionString, query, [cartId], (err2, result) => {
      if (err2) return callback(err2, null);
      return callback(null, result);
    });
  });
}

module.exports = {
  getCartByUserId,
  addToCart,
};
