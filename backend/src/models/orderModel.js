const { sql, connectionString } = require("../db");

function createNewOrder(userId, precioBruto, precioNeto, callback) {
  const query =
    "INSERT INTO Ordenes (CarritoId, PrecioBruto, PrecioNeto)" +
    "VALUES (?, ?, ?)";
  sql.query(
    connectionString,
    query,
    [userId, precioBruto, precioNeto],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.insertId);
    }
  );
}

module.exports = {
  createNewOrder,
};
