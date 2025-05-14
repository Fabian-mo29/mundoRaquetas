const express = require("express");
const cors = require("cors");
const product = require("../src/models/productModel");

const app = express();
const apiRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
