const express = require("express");
const cors = require("cors");
// require("dotenv").config();

const app = express();
// const apiRoutes = require("./routes/apiRoutes");

app.use(cors());
app.use(express.json());

// app.use("/api" ,apiRoutes);

const PORT = 3000; // Cambia el puerto si es necesario
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
