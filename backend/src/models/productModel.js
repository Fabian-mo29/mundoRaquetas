const { sql, connectionString } = require("../db");

function getAllProducts(callback) {
  const query = `
      SELECT p.Id, p.Name, p.Description, p.Price, p.Stock, p.Discount, p.Category, i.Name AS ImageName
      FROM Imagen i
      JOIN Productos p ON i.ProductoId = p.Id
      WHERE p.Active = 1;
    `;

  sql.query(connectionString, query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function getProductById(id, callback) {
  const query = `
      SELECT p.Id, p.Name, p.Description, p.Price, p.Stock, p.Discount, p.Category, i.Name AS ImageName
      FROM Imagen i
      JOIN Productos p ON i.ProductoId = p.Id
      WHERE p.Active = 1 and p.Id = ?;
    `;
  sql.query(connectionString, query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result.length > 0 ? result[0] : null);
  });
}

module.exports = {
  getAllProducts,
  getProductById,
};
