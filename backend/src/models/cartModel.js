const { sql, connectionString } = require("../db");

function getCartByUserId(userId, callback) {
  const cartId = getActiveCart(userId);
  const query =
    "SELECT p.Name, p.Description, p.Price, p.Discount, p.Category\n" +
    "FROM ProductosPorCarrito ppc JOIN Productos p on ppc.ProductoId\n" +
    "=p.Id WHERE ppc.CarritoId = ?";
  sql.query(connectionString, query, [cartId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

async function getActiveCart(userId) {
  const cartId =
    "SELECT TOP 1 Id FROM Carrito Where UsuarioId = ? AND Estado = Pendiente";
  return new Promise((resolve, reject) => {
    sql.query(connectionString, cartId, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching active cart:", err);
        return reject(err);
      }
      if (result.length > 0) {
        resolve(result[0].Id);
      } else {
        resolve(null);
      }
    });
  });
}

function addToCart(product) {
  let cartId = getActiveCart(userId);
  if (!cartId) {
    cartId = createCart(userId, (err, result) => {
      if (err) {
        return callback(err, null);
      }
    });
  }
  const query =
    "INSERT INTO ProductosPorCarrito(CarritoId, ProductoId, Cantidad)\n" +
    "VALUES (?, ?, ?)";
  sql.query(
    connectionString,
    query,
    [cartId, product.Id, product.Cantidad],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    }
  );
}

function createCart(userId, callback) {
  const query = "INSERT INTO Carrito(UserId) VALUESN" + "(?)";
  sql.query(connectionString, query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

module.exports = {
  getCartByUserId,
  addToCart,
};
