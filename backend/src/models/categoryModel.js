const { sql, connectionString } = require("../db");

function getProductsByCategory(category, callback) {
  let query = `
      SELECT p.Id, p.Name, p.Description, p.Price, p.Stock, p.Discount, p.Category, i.Name AS ImageName
      FROM Imagen i
      JOIN Productos p ON i.ProductoId = p.Id
      WHERE p.Active = 1
  `;

  let params = [];
  // Se hacen los filtros, si es por Ofertas o si es por cualquiera de las otras categorías
  if ((category === "Ofertas") || (category === "ofertas")) {
    query += " AND p.Discount > 0";
  } else {
    query += " AND p.Category = ?";
    params.push(category);
  }

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

module.exports = {
  getProductsByCategory,
};
