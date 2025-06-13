const rawData = require("../../data/validCard.json");
// const fs = require('fs');

function parseData() {
  // Incialmente asi, sino tendriamos que obtener los datos de otra manera
  return rawData;
}

module.exports = {
  parseData,
};
