const rawData = require("../../data/validCard.json");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");

function parseData() {
  // Incialmente asi, sino tendriamos que obtener los datos de otra manera
  return rawData;
}

async function parseFile() {
  try {
    const html = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8");
    const $ = cheerio.load(html);
    const result = [];
    $("tr").each((i, row) => {
      const bank = $(row)
        .find('td[data-title="Bank Name"] .table-bank')
        .text()
        .trim();
      const brand = $(row).find('td[data-title="Brand"]').text().trim();
      const bin = $(row).find('td[data-title="BIN"]').text().trim();

      if (bank && brand && bin) {
        result.push({
          bank: bank.toUpperCase(),
          brand: brand.toUpperCase(),
          bin,
        });
      }
    });
    fs.writeFileSync(
      path.join(__dirname, "bins.json"),
      JSON.stringify(result, null, 2)
    );
    console.log("Archivo generado exitosamente.");
  } catch (err) {
    console.error("Error al procesar el archivo:", err);
  }
}

module.exports = {
  parseData,
  parseFile,
};
