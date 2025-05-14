const fs = require("fs");
const path = require("path");

const getAllProducts = () => {
  try {
    const filePath = path.join(__dirname, "../../Inventory/inventory.json");
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading inventory.json:", err);
    return [];
  }
};

const getProductById = (id) => {
  const products = getAllProducts();
  return products.find((product) => product.id === parseInt(id));
};

module.exports = {
  getAllProducts,
  getProductById,
};
