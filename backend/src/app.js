const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();
const apiRoutes = require("./routes/apiRoutes");

const allowedOrigins = ["https://localhost:8080", "http://localhost:8080"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", apiRoutes);

const { sql, connectionString } = require('./db');

sql.open(connectionString, (err, conn) => {
  if (err) return console.error("❌ Error al conectar:", err);
  console.log("✅ Conectado a la base de datos.");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const httpsOptions = {
  key: fs.readFileSync(__dirname + '/../certs/localhost-key.pem'),
  cert: fs.readFileSync(__dirname + '/../certs/localhost.pem')
};

const PORT = 3000;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});